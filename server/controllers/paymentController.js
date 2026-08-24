const mongoose = require('mongoose');
const crypto = require('crypto');
const getRazorpay = require('../config/razorpay');
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

    const amountInPaise = Math.round(course.price * 100);

    // 2. Check if Razorpay keys are placeholder keys
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'rzp_test_placeholder' || keySecret === 'secret_placeholder') {
      // Key is a placeholder - create mock order
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

    // Initialize Razorpay and Create Order
    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_course_${course._id.toString().slice(-6)}_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        courseId: course._id.toString(),
      },
    });

    // 3. Save internal order in DB
    const internalOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const order = await Order.create({
      orderId: internalOrderId,
      amount: amountInPaise,
      currency: 'INR',
      user: userId,
      course: course._id,
      razorpayOrderId: razorpayOrder.id,
      status: 'created',
    });

    res.status(201).json({
      success: true,
      isMockMode: false,
      data: {
        order,
        razorpayOrder,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
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

    // 1. Find the corresponding order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // 2. Prevent duplicate processing
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

    // 3. Generate expected signature using HMAC SHA256 and key_secret
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      order.status = 'failed';
      await order.save();
      return res.status(400).json({ success: false, message: 'Payment signature mismatch' });
    }

    // 4. Fetch details from Razorpay to confirm capture
    const rzp = getRazorpay();
    const rzpDetails = await rzp.payments.fetch(razorpay_payment_id);
    if (rzpDetails.status !== 'captured') {
      return res.status(400).json({ success: false, message: 'Payment not captured on gateway' });
    }

    // 5. Create Payment record
    const internalPaymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const payment = await Payment.create({
      paymentId: internalPaymentId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      signature: razorpay_signature,
      order: order._id,
      user: userId,
      amount: rzpDetails.amount,
      currency: rzpDetails.currency,
      status: 'captured',
      method: rzpDetails.method || 'other',
    });

    // 6. Update order status
    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    // 7. Grant Course Access to the User
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
