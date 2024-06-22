export interface PaypalToken {
  access_token: string;
  expires_in: number;
}

export interface PaypalOrderItem {
  name: string;
  description: string;
  quantity: string;
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

//the schema must be like this to ge no errors
export interface PaypalIntent {
  intent: string;
  purchase_units: [
    {
      items: PaypalOrderItem[];
      amount: {
        currency_code: string;
        value: string;
        breakdown: {
          item_total: {
            currency_code: string;
            value: string;
          };
        };
      };
    }
  ];
  application_context: {
    return_url: string;
    cancel_url: string;
    user_action?: string;
  };
}

//schema to get pay link
export interface PaypalPayLinks {
  links: [
    {
      href: string;
      rel: string;
    }
  ];
}

//
export interface PaypalChckoutResult {
  status: string;
  payment_source: {
    paypal: {
      email_address: string;
      name: {
        given_name: string;
        surname: string;
      };
    };
  };
  purchase_units: [
    {
      shipping: {
        address: {
          address_line_1: string;
          admin_area_1: string;
          admin_area_2: string;
          postal_code: string;
          country_code: string;
        };
      };
      payments: {
        captures: [
          {
            seller_receivable_breakdown: {
              gross_amount: {
                currency_code: string;
                value: string;
              };
              net_amount: {
                currency_code: string;
                value: string;
              };
            };
          }
        ];
      };
    }
  ];
}
