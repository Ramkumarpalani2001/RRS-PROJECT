const TableStatus = require('../Models/tablestatus'); // Adjust the path as needed

// Get reservations by date, time, and restaurant
exports.getTablessts = async (req, res) => {
  try {
    const { date, time, restaurantId } = req.query;

    // Find reservations based on date, time, and restaurantId
    const reservations = await TableStatus.find({ date, time, restaurantId });

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

// Create a new reservation
exports.posttabledetails = async (req, res) => {
  try {
    const { restaurantId, restaurantName, date, time, tableId, status } = req.body;

    // Create a new reservation document
    const reservation = new TableStatus({
      restaurantId,
      restaurantName,
      date,
      time,
      tableId,
      status
    });

    // Save the reservation to the database
    await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

// Update table status
exports.updateTableStatus = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { status } = req.body;

    // Update table status
    const result = await TableStatus.findOneAndUpdate(
      { tableId },
      { status },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
      message: 'Table status updated successfully',
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating table status', error });
  }
};
