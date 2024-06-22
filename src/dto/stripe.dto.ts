//
export interface StripeProductItem {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: [string];
      metadata: {
        id: number;
      };
    };
  };
  quantity: number;
}

//
export interface StripePaymentIntent {
  payment_method: {
    card: {
      brand: string;
      exp_month: number;
      exp_year: number;
      last4: string;
      country: string;
    };
  };
}
