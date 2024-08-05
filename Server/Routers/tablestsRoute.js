const express = require('express');
const router = express.Router();
const tableStatusController = require('../Controllers/tablestsController'); // Adjust the path as needed

// POST method to create a new reservation
router.post('/status', tableStatusController.posttabledetails);

// GET method to fetch reservations by date and time
router.get('/status', tableStatusController.getTablessts);

router.patch('/status/:tableId', tableStatusController.updateTableStatus);
module.exports = router;
