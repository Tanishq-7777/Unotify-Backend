const express = require("express");
const { authUser } = require("../authentication/authUser");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { default: webhooks } = require("razorpay/dist/types/webhooks");
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
    webhookSignature = req.get["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    const paymentDetails = req.body.payload.payment.entity;
    console.log(paymentDetails);
    if (req.body.event == "payment.captured") {
    }
    if (req.body.event == "payment.failed") {
    }
    res.status(200).json({ msg: "Webhook signature is valid" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = paymentRouter;
