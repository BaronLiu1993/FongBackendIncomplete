const { Listing } = require('../models'); 

const createListing = (data, callback) => {
  const { title, description, priceInCents, quantity } = data;

  Listing.create({
    title,
    description,
    priceInCents,
    quantity,
    status: 'pending',
    isComplete: false,
    accepted: false,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
  })
  .then(listing => callback(null, listing))
  .catch(err => callback({ message: err.message }));
};

const completeListing = (id, callback) => {
  Listing.findByPk(id)
    .then(listing => {
      if (!listing || listing.status !== 'pending' || new Date() > listing.expiresAt) {
        return callback({ message: 'Listing not found, not pending, or has expired' });
      }
      
      listing.isComplete = true;
      return listing.save()
        .then(() => callback(null, listing));
    })
    .catch(err => callback({ message: err.message }));
};

const acceptListing = (id, callback) => {
  Listing.findByPk(id)
    .then(listing => {
      if (!listing || new Date() > listing.expiresAt) {
        return callback({ message: 'Listing not found or expired' });
      }

      listing.accepted = true;
      return listing.save()
        .then(() => callback(null, listing));
    })
    .catch(err => callback({ message: err.message }));
};

// Get All Listings function with callback
const getAllListings = (callback) => {
  Listing.findAll()
    .then(listings => callback(null, listings))
    .catch(err => callback({ message: err.message }));
};

module.exports = {
  createListing,
  completeListing,
  acceptListing,
  getAllListings,
};

//listing logic is stored here 