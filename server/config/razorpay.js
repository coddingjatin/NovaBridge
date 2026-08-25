const Razorpay = require('razorpay');

let instance = null;

const getRazorpay = () => {
  if (instance) return instance;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId === 'rzp_test_placeholder') {
    throw new Error('Razorpay keys are not configured in environment variables or are placeholders.');
  }

  instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return instance;
};

module.exports = getRazorpay;
