const express = require('express');
const router = express.Router();
const paymentApi = require('../payment');
const verifyPhone = require('../phoneVerification');

router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, payment_capture } = req.body;

    const options = { amount, currency, payment_capture };

    const { order, msg } = await paymentApi.createOrder(options);

    if (msg === "success") {
      res.json({ order, msg });      
    }

    if (msg === "error") {
      res.json({ msg });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/send-otp", async (req, res) => {
  const response = await verifyPhone.sendOtp(req.body.phoneNo);

  res.json({ response });    
});

router.post("/confirm-otp", async (req, res) => {
  const response = await verifyPhone.confirmOtp(req.body.phoneNo, req.body.otp);

  res.json({ response });
})

module.exports = router;