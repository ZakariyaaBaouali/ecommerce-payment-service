import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  STRIPE_SECRET_KEY,
  PAYPAL_CLIENT_ID,
  PAYPAL_SECRET_ID,
  PAYPAL_BASE_URL,
  MONGODB_URI,
} = process.env;
