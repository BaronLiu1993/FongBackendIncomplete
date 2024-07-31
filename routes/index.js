const express = require('express');
const authRoutes = require('./auth.routes');
const paymentRoutes = require('./payment.routes');
const routes = require('./route');
const geoRoutes = require('./geo.routes'); 

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


// CORS Middleware
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*"); // Update this to specific origins if needed
    next();
});

// Initialize routes
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/listings', routes);
//app.use('/api/v1/geo', geoRoutes);

module.exports = app;

//output the routes for server.js to use


