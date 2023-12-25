import express from "express";
import connectdb from "./config/connectdb.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connectcloudinary } from "./config/connectCloudinary.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
connectdb();
connectcloudinary();
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("app is running in port", port);
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Eerver Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
