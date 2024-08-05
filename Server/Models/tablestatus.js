const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableStatusSchema = new Schema({
  restaurantId: {
    type: String,
    required: true,
    description: "Unique identifier for the restaurant"
  },
  restaurantName: {
    type: String,
    required: true,
    description: "Name of the restaurant"
  },
  date: {
    type: Date,
    required: true,
    description: "Date of the reservation"
  },
  time: {
    type: String,
    required: true,
    description: "Time of the reservation"
  },
  tableId: {
    type: String,
    required: true,
    description: "Identifier for the table"
  },
  status: {
    type: Boolean,
    default: false,
    description: "Reservation status, default is false"
  }
});

const TableStatus = mongoose.model('TableStatus', tableStatusSchema);

module.exports = TableStatus;
