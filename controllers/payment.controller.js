const paymentService = require('../services/payment.service');

const handlePayment = (req, res) => {
    const { id } = req.params;
    const { paymentMethodId } = req.body;

    paymentService.handlePayment(id, paymentMethodId, (err, confirmedPaymentIntent) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(confirmedPaymentIntent);
    });
};

module.exports = {
    handlePayment,
};

//Handles payment services
