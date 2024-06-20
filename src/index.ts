import express from "express";
import cors from "cors";
import { PORT } from "./config";

//
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
