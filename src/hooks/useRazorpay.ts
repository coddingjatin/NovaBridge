import { useCallback, useState } from 'react';
import { paymentService } from '../services/paymentService';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Function to dynamically load the Razorpay SDK script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface InitiatePaymentParams {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  userDetails?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onMockFallback?: () => void;
}

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = useCallback(
    async ({ courseId, courseTitle, coursePrice, userDetails, onSuccess, onError, onMockFallback }: InitiatePaymentParams) => {
      setLoading(true);
      try {
        let orderRes;
        try {
          // 1. Create order on the server
          orderRes = await paymentService.createOrder(courseId, coursePrice, courseTitle);
        } catch (serverErr: any) {
          console.warn('Backend server unreachable or error. Falling back to local mock payment...', serverErr);
          if (onMockFallback) {
            onMockFallback();
            return;
          }
          throw serverErr;
        }

        const data = orderRes.data || orderRes;
        const { razorpayOrder, keyId, isMockMode } = data;
        const mockMode = orderRes.isMockMode || isMockMode;

        // If backend is running in Mock Mode (due to placeholder keys)
        if (mockMode) {
          console.log('Backend is in Mock Mode. Verifying order mock-signature...');
          try {
            const verifyRes = await paymentService.verifyPayment({
              razorpay_order_id: razorpayOrder.id,
              razorpay_payment_id: `pay_mock_${Date.now()}`,
              razorpay_signature: 'mock_signature',
            });
            if (onSuccess) onSuccess(verifyRes);
            return;
          } catch (err: any) {
            if (onError) onError(err.message || 'Mock verification failed');
            return;
          }
        }

        // Load Razorpay script for live gateway
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
        }

        // 2. Configure checkout modal options
        const options = {
          key: keyId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'NovaBridge Academy',
          description: `Purchase: ${courseTitle}`,
          order_id: razorpayOrder.id,
          prefill: {
            name: userDetails?.name || '',
            email: userDetails?.email || '',
            contact: userDetails?.phone || '',
          },
          theme: { color: '#7C3AED' }, // Theme matches purple styling
          handler: async (response: any) => {
            // 3. Verify signature on the server
            try {
              const verifyRes = await paymentService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              
              if (onSuccess) onSuccess(verifyRes);
            } catch (err: any) {
              if (onError) onError(err.message || 'Payment verification failed');
            }
          },
          modal: {
            ondismiss: () => {
              if (onError) onError('Payment cancelled by user');
            },
          },
        };

        // Open checkout
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
          if (onError) onError(response.error.description || 'Payment failed');
        });
        rzp.open();
      } catch (err: any) {
        if (onError) onError(err.message || 'Failed to initiate payment');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { initiatePayment, loading };
};
