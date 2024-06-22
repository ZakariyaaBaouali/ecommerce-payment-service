import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { PaymentRouter } from "./routes";
import { PaymentRepo } from "./db";

//🚀🚀
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
//export db to all the app comps
export const paymentDB = new PaymentRepo();

//routes
app.use("/api/pay", PaymentRouter);

//🚀🚀
app.listen(PORT, () => console.log(`server running on port ${PORT} 🚀🚀`));

//
declare global {
  namespace Express {
    interface Request {
      paypal_token: string;
    }
  }
}
