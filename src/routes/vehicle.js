const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
router.get('/vehicles', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
});

router.get('/vehicle/:id', async (req, res) => {
    let vehicle;
    try {
        vehicle = await Vehicle.findById(req.params.id);
        res.json(vehicle);
    } catch (err) {
        if (!vehicle) {
            res.status(404).json({
                "error": "The vehicle that you are looking for does not exist"
            });
        }
    }
});

router.put('/vehicle/:id', async (req, res) => {
    const id = req.params.id;
    let vehicle;
    const { description, licencePlate, price } = req.body;
    try {
        if (!description && !licencePlate && !price) {
            res.status(400).json({ "error": "you need to update at least a field" });
        }
        vehicle = await Vehicle.findByIdAndUpdate(id, req.body);
        res.json(vehicle);

    } catch (err) {
        if (!vehicle) {
            res.status(404).json({ "error": "the vehicle that you are trying to update does not exist" });
        }
    }

});


router.post('/vehicle', async (req, res) => {
    const { licencePlate, description, price } = req.body;
    const newVehicle = new Vehicle({ licencePlate, description, price });
    const errors = [];
    if (!licencePlate) {
        errors.push('The licence plate field is required');
    }
    if (!description) {
        errors.push('The description field is required');
    }
    if (!price) {
        errors.push('The price field is required');
    }
    try {

        if (errors.length > 0) {
            res.status(400).json({
                "error": "required fields can not be empty"
            });

        }
        await newVehicle.save();
        res.json(newVehicle);
    } catch (err) {

    }

});

module.exports = router;