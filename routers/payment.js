const express = require("express");
const { authUser } = require("../authentication/authUser");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
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
      uesrId: req.user._id,
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

module.exports = paymentRouter;
