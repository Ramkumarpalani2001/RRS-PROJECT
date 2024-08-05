const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/get', reservationController.getReservations);

module.exports = router;
