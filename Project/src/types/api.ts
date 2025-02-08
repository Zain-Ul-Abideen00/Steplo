export interface PaymentIntent {
  id: string;
  amount: number;
  status: string;
  client_secret: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaymentFormData {
  paymentMethod: string;
  billingDetails: {
    name: string;
    email: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
}
