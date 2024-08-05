const Restaurant = require('../Models/restaurant');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    console.log("getRestaurant");
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one restaurant
exports.getRestaurantById = async (req, res) => {
    console.log("getonetRestaurant");
        try {
          const restaurant = await Restaurant.findById(req.params.id);
          if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
          }
          res.json(restaurant);
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
      };

// Create a restaurant
exports.createRestaurant = async (req, res) => {
    console.log("posttRestaurant");
    const restaurant = new Restaurant({
        name: req.body.name,
        image: req.body.image,
        rating: req.body.rating,
        location: req.body.location,
        description: req.body.description,
        menu: req.body.menu
    });

    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
    console.log("updateoneRestaurant");
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant == null) {
            return res.status(404).json({ message: 'Cannot find restaurant' });
        }

        if (req.body.name != null) {
            restaurant.name = req.body.name;
        }
        if (req.body.image != null) {
            restaurant.image = req.body.image;
        }
        if (req.body.rating != null) {
            restaurant.rating = req.body.rating;
        }
        if (req.body.location != null) {
            restaurant.location = req.body.location;
        }
        if (req.body.description != null) {
            restaurant.description = req.body.description;
        }
        if (req.body.menu != null) {
            restaurant.menu = req.body.menu;
        }

        const updatedRestaurant = await restaurant.save();
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    console.log("deleteRestaurant");
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant == null) {
            return res.status(404).json({ message: 'Cannot find restaurant' });
        }

        await restaurant.remove();
        res.json({ message: 'Deleted restaurant' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

