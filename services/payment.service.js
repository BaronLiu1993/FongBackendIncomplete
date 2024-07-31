const stripe = require('../config/stripe.config');
const Listing = require('../models/model');

const SERVICE_FEE_PERCENT = 0.05; 

const createPaymentIntent = (amount, currency, customerId, applicationFeeAmount, transferDestination, callback) => {
    stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customerId,
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
            destination: transferDestination,
        },
    })
    .then(paymentIntent => callback(null, paymentIntent))
    .catch(error => {
        console.error('Error creating payment intent:', error);
        callback({ message: 'Error creating payment intent', error: error.message });
    });
};

const confirmPaymentIntent = (paymentIntentId, paymentMethodId, callback) => {
    stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
    })
    .then(paymentIntent => callback(null, paymentIntent))
    .catch(error => {
        console.error('Error confirming payment intent:', error);
        callback({ message: 'Error confirming payment intent', error: error.message });
    });
};

const acceptProcessPayment = (id, paymentMethodId, callback) => {
    Listing.findByPk(id)
        .then(listing => {
            if (!listing) {
                return callback({ message: 'Listing not found' });
            }

            if (!listing.isComplete) {
                return callback({ message: 'Listing is not complete' });
            }

            const amount = listing.priceInCents;
            const serviceFee = amount * SERVICE_FEE_PERCENT;
            const taxPercent = 0.15; // Tax percentage
            const tax = amount * taxPercent;
            const netAmount = amount - serviceFee - tax;
            const tip = listing.tip || 0;
            const recipientAmount = netAmount + tip;

            const { senderId, recipientId } = listing;

            createPaymentIntent(amount, 'usd', senderId, serviceFee, recipientId, (err, paymentIntent) => {
                if (err) {
                    return callback(err);
                }

                confirmPaymentIntent(paymentIntent.id, paymentMethodId, (err, confirmedPaymentIntent) => {
                    if (err) {
                        return callback(err);
                    }

                    console.log(`Payment confirmed and ${recipientAmount} sent to recipient ${recipientId}`);
                    callback(null, confirmedPaymentIntent);
                });
            });
        })
        .catch(error => {
            console.error('Error processing payment:', error);
            callback({ message: 'Error processing payment', error: error.message });
        });
};

module.exports = {
    acceptProcessPayment,
};

//Payment service and logic are stored here