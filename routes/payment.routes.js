const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post('/post-payment', paymentController.handlePayment);

module.exports = router;

//route for payment service with stripe API