const Reservation = require('../Models/reservation');

exports.createReservation = async (req, res) => {
    console.log(req.body);
    
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
};

exports.getReservations = async (req, res) => {
    console.log("getreservation");
    
  const { date, time } = req.query;
  try {
    const reservations = await Reservation.find({ date, time });
    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
};
