// models/restaurant.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: String
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  location: String,
  description: String,
  menu: {
    Breakfast: [menuItemSchema],
    Lunch: [menuItemSchema],
    Dinner: [menuItemSchema]
  },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
