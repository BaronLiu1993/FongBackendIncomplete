const express = require('express');
const router = express.Router();
const { verifyToken, isModerator, isAdmin } = require('../middleware/authJWT');
const controller = require('../controllers/controller');

router.get('/', controller.getAllListings);
router.post('/:id/accept', [verifyToken, isModerator], controller.acceptListing);
router.post('/:id/complete', [verifyToken, isModerator], controller.completeListing);
router.post('/', [verifyToken, isAdmin], controller.createListing);

module.exports = router;

//route for the listing service
