const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  try {
    const rawSession = localStorage.getItem('novabridge_auth_session');
    if (rawSession) {
      const parsed = JSON.parse(rawSession);
      if (parsed && parsed.token) {
        headers['Authorization'] = `Bearer ${parsed.token}`;
      }
    }
  } catch (error) {
    console.error('Error loading token in paymentService:', error);
  }
  
  return headers;
};

export const paymentService = {
  createOrder: async (courseId: string) => {
    const response = await fetch(`${API_URL}/payments/create-order`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create payment order');
    }

    return response.json();
  },

  verifyPayment: async (payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const response = await fetch(`${API_URL}/payments/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Payment verification failed');
    }

    return response.json();
  },
};
