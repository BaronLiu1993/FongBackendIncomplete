const listingService = require('../services/service');

const createListing = (req, res) => {
  listingService.createListing(req.body, (err, listing) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(listing);
  });
};

const completeListing = (req, res) => {
  const { id } = req.params;
  listingService.completeListing(id, (err, listing) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(listing);
  });
};

const acceptListing = (req, res) => {
  const { id } = req.params;
  listingService.acceptListing(id, (err, listing) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(listing);
  });
};

const getAllListings = (req, res) => {
  listingService.getAllListings((err, listings) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(listings);
  });
};

module.exports = {
  createListing,
  completeListing,
  acceptListing,
  getAllListings
};

//controller for the listing