require("dotenv").config();
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routers/authRouter");
const connectDb = require("./utils/database");
const cors = require("cors");
const express = require("express");
const captionsRouter = require("./routers/captionRouter");
const getJobs = require("./routers/jobRouter");
const jobRouter = require("./routers/jobRouter");

const paymentRouter = require("./routers/payment");

const app = express();
// const PORT = 9999;

const PORT = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:5173", "https://unotify.tanishqsaxena.xyz"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/", jobRouter);
app.use("/", authRouter);
app.use("/", captionsRouter);
app.use("/payment/webhook", express.raw({ type: "*/*" }));
app.use("/", paymentRouter);

const startServer = async () => {
  try {
    await connectDb();
    console.log("Your Database Connected Successfully");
    app.listen(PORT, () => {
      console.log("Your app Listening on the PORT", PORT);
    });
  } catch (err) {
    console.error("Server start error:", err);
  }
};

startServer();
