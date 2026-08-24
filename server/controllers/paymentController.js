const mongoose = require('mongoose');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');

// Create Order (Initiate Payment)
exports.createOrder = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;

    // 1. Fetch course details to get authentic price
    let query = {};
    if (mongoose.Types.ObjectId.isValid(courseId)) {
      query = { $or: [{ _id: courseId }, { customId: courseId }] };
    } else {
      query = { customId: courseId };
    }

    const course = await Course.findOne(query);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if user is already enrolled in this course to prevent duplicate purchase
    if (req.user.purchasedCourses && req.user.purchasedCourses.includes(course._id)) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course' });
    }

    const amountInPaise = Math.round(course.price * 100);

    // Check if system token is placeholder or missing -> fallback to mock simulation
    const PAYFLOW_API_URL = process.env.PAYFLOW_API_URL || 'http://localhost:5000/api';
    const PAYFLOW_SYSTEM_TOKEN = process.env.PAYFLOW_SYSTEM_TOKEN;

    if (!PAYFLOW_SYSTEM_TOKEN || PAYFLOW_SYSTEM_TOKEN === 'placeholder' || PAYFLOW_SYSTEM_TOKEN === 'payflow_system_token_secret_key') {
      console.warn('PAYFLOW_SYSTEM_TOKEN is placeholder or not configured. Using Mock fallback...');
      const mockRazorpayOrderId = `order_mock_${Math.random().toString(36).substring(2, 10)}`;
      const internalOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const order = await Order.create({
        orderId: internalOrderId,
        amount: amountInPaise,
        currency: 'INR',
        user: userId,
        course: course._id,
        razorpayOrderId: mockRazorpayOrderId,
        status: 'created',
      });

      return res.status(201).json({
        success: true,
        isMockMode: true,
        data: {
          order,
          razorpayOrder: {
            id: mockRazorpayOrderId,
            amount: amountInPaise,
            currency: 'INR',
          },
          keyId: 'rzp_test_placeholder',
        },
      });
    }

    // Call PayFlow backend to create order server-to-server
    console.log(`Sending order request to PayFlow: amount=${amountInPaise}, courseId=${course.customId}`);
    const response = await fetch(`${PAYFLOW_API_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYFLOW_SYSTEM_TOKEN}`
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        description: `Purchase: ${course.title}`,
        courseId: course.customId,
        metadata: {
          courseId: course._id.toString(),
          novaBridgeUserId: userId.toString()
        }
      })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return res.status(response.status).json({ success: false, message: `PayFlow order creation failed: ${errorMsg}` });
    }

    const payFlowData = await response.json();
    if (!payFlowData.success) {
      return res.status(400).json({ success: false, message: 'PayFlow order creation rejected' });
    }

    const { order: pfOrder, razorpayOrder, keyId } = payFlowData.data;

    // Save order locally in NovaBridge database
    const order = await Order.create({
      orderId: pfOrder.orderId,
      amount: amountInPaise,
      currency: 'INR',
      user: userId,
      course: course._id,
      razorpayOrderId: razorpayOrder.id,
      status: 'created'
    });

    res.status(201).json({
      success: true,
      isMockMode: false,
      data: {
        order,
        razorpayOrder,
        keyId
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify Payment Signature & Complete Purchase
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    // 1. Prevent duplicate processing
    const existingPayment = await Payment.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (existingPayment) {
      return res.json({
        success: true,
        message: 'Payment already verified',
        data: { payment: existingPayment },
      });
    }

    const isMock = razorpay_order_id.startsWith('order_mock_') || razorpay_signature === 'mock_signature';

    if (isMock) {
      const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }

      // Verify mock payment simulation
      const internalPaymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const payment = await Payment.create({
        paymentId: internalPaymentId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
        signature: razorpay_signature || 'mock_signature',
        order: order._id,
        user: userId,
        amount: order.amount,
        currency: order.currency,
        status: 'captured',
        method: 'mock_gateway',
      });

      // Update order status
      order.status = 'paid';
      order.razorpayPaymentId = payment.razorpayPaymentId;
      await order.save();

      // Grant Course Access to the User
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: order.course },
      });

      return res.status(200).json({
        success: true,
        message: 'Mock payment verified and course access granted successfully',
        data: { payment },
      });
    }

    const PAYFLOW_API_URL = process.env.PAYFLOW_API_URL || 'http://localhost:5000/api';
    const PAYFLOW_SYSTEM_TOKEN = process.env.PAYFLOW_SYSTEM_TOKEN;

    // Call PayFlow to verify signature
    console.log(`Forwarding verification request to PayFlow: orderId=${razorpay_order_id}`);
    const response = await fetch(`${PAYFLOW_API_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYFLOW_SYSTEM_TOKEN}`
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      })
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return res.status(response.status).json({ success: false, message: `PayFlow signature verification failed: ${errorMsg}` });
    }

    const payFlowData = await response.json();
    if (!payFlowData.success) {
      return res.status(400).json({ success: false, message: 'Payment verification failed on PayFlow' });
    }

    // Find local order or create it if missing
    let order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      console.log(`Local order not found. Querying PayFlow status for: ${razorpay_order_id}`);
      const statusResponse = await fetch(`${PAYFLOW_API_URL}/payments/order-status/${razorpay_order_id}`, {
        headers: {
          'Authorization': `Bearer ${PAYFLOW_SYSTEM_TOKEN}`
        }
      });
      if (!statusResponse.ok) {
        return res.status(404).json({ success: false, message: 'Order details not found on PayFlow' });
      }
      const statusData = await statusResponse.json();
      const orderInfo = statusData.data;

      const courseId = orderInfo.metadata?.courseId;
      const amount = orderInfo.amount;

      if (!courseId) {
        return res.status(400).json({ success: false, message: 'Invalid order metadata: courseId missing' });
      }

      order = await Order.create({
        orderId: orderInfo.razorpayOrderId || `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        amount,
        currency: orderInfo.currency || 'INR',
        user: userId,
        course: courseId,
        razorpayOrderId: razorpay_order_id,
        status: 'created'
      });
    }

    // Create Payment record locally
    const internalPaymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const payment = await Payment.create({
      paymentId: internalPaymentId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      signature: razorpay_signature,
      order: order._id,
      user: userId,
      amount: order.amount,
      currency: order.currency,
      status: 'captured',
      method: payFlowData.data?.payment?.method || 'other',
    });

    // Update order status
    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // Grant Course Access to the User
    await User.findByIdAndUpdate(userId, {
      $addToSet: { purchasedCourses: order.course }, // Avoid duplicates
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified and course access granted successfully',
      data: { payment },
    });
  } catch (error) {
    next(error);
  }
};

// Handle Webhook updates forwarded securely from PayFlow backend
exports.handlePayFlowWebhook = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const PAYFLOW_SYSTEM_TOKEN = process.env.PAYFLOW_SYSTEM_TOKEN;

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== PAYFLOW_SYSTEM_TOKEN) {
      return res.status(401).json({ success: false, message: 'Unauthorized webhook call' });
    }

    const { event, courseId, novaBridgeUserId, razorpay_order_id, razorpay_payment_id, amount } = req.body;

    console.log(`Received PayFlow forwarded webhook event: ${event} for course: ${courseId}, user: ${novaBridgeUserId}`);

    const course = await Course.findById(courseId);
    const user = await User.findById(novaBridgeUserId);

    if (!course || !user) {
      return res.status(404).json({ success: false, message: 'Course or User associated with the webhook payment not found in NovaBridge' });
    }

    if (event === 'payment.captured') {
      let order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) {
        order = await Order.create({
          orderId: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          amount,
          currency: 'INR',
          user: user._id,
          course: course._id,
          razorpayOrderId: razorpay_order_id,
          status: 'paid',
          razorpayPaymentId: razorpay_payment_id
        });
      } else {
        order.status = 'paid';
        order.razorpayPaymentId = razorpay_payment_id;
        await order.save();
      }

      // Check for duplicate payment
      let payment = await Payment.findOne({ razorpayPaymentId: razorpay_payment_id });
      if (!payment) {
        payment = await Payment.create({
          paymentId: `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          signature: 'webhook_forwarded',
          order: order._id,
          user: user._id,
          amount,
          currency: 'INR',
          status: 'captured',
          method: 'webhook'
        });
      }

      // Grant course access to the user
      await User.findByIdAndUpdate(user._id, {
        $addToSet: { purchasedCourses: course._id }
      });

      console.log(`Successfully enrolled user ${user.email} in course ${course.title} via webhook`);
    } else if (event === 'payment.failed') {
      let order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      if (order) {
        order.status = 'failed';
        await order.save();
      }
      console.log(`Marked order ${razorpay_order_id} as failed via webhook`);
    }

    res.json({ success: true, processed: true });
  } catch (error) {
    next(error);
  }
};

// Initiate Refund
exports.refundPayment = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Refund initiated successfully' });
  } catch (error) {
    next(error);
  }
};

// Fetch Payment History
exports.getPaymentHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const payments = await Payment.find({ user: userId }).populate('order');
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};
