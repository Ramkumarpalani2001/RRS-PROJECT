const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurantId: String,
  restaurantName: String,
  date: String,
  time: String,
  name: String,
  persons: Number,
  table: String,
});

module.exports = mongoose.model('Reservation', reservationSchema);
