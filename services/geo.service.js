const geo = require('../models')
const axios = require('axios')
const mapsAPIKEY = '' //remember to create .env file and add to gitignore

//convert the data from the frontend (latitude and longitude) into address and then get address
const getGeolocationById = async (id) => {
    const url = '';
}

const getReverseGeolocationById = async (id) => {

}

//give option to give the specific address
const postLocation = async (location) => {
  
}

const deleteLocation = async () => {

}

const refreshLocation = async () => {

}

//Determine the route to the location from your current location and calculate/compute the route
const routeToLocation = async () => {

}

module.exports = {
  routeToLocation,
  refreshLocation,
  deleteLocation,
  postLocation,
  getReverseGeolocationById,
  getGeolocationById
}

//incomplete