const express = require("express");
const { authUser } = require("../authentication/authUser");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", authUser, async (req, res) => {
  try {
    const { name, email } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: 10000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        Name: name,
        Email: email,
      },
    });
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();

    res.send({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    const isWebhookValid = validateWebhookSignature(
      req.body,
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    console.log(paymentDetails);
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    await user.save();

    res.status(200).json({ msg: "Webhook signature is valid" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = paymentRouter;
