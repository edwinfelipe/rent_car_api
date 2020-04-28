const express = require('express');
const router = express.Router();
const Rent = require('../models/rent');
const Vehicle = require('../models/vehicle');

router.post('/rent/add', async (req, res) => {
    const { startDate, endDate, vehicleId } = req.body;
    const newRent = new Rent({ startDate, endDate, vehicleId });
    let vehicle;
    try {
        vehicle = await Vehicle.findById(vehicleId);
        if (vehicle.isRented) {
            res.status(400).json({ "error": "the vehicle is already rented" });
            return;
        }
        newRent.rentValue = vehicle.price * newRent.daysToRent;
        await Vehicle.findByIdAndUpdate(vehicleId, { rentedUntil: newRent.endDate });
        await newRent.save();

        res.json(newRent);
    } catch (err) {
        if (!vehicle) {
            res.status(404).json({ "error": "the vehicle you are looking for does not exist" });
            return;
        }
        res.json(err);
    }

});

router.get('/rents', async (req, res) => {

    const filters = req.query.filters;
    const startDate = req.query.from;
    const endDate = req.query.to;

    let rents;
    let filteredRents = [];

    if (startDate && endDate) {
        rents = await Rent.find().fromDate(startDate, endDate);
    } else {
        rents = await Rent.find();
    }
    if (filters && filters.includes('actives')) {
        rents.forEach((rent) => {
            if (rent.isActive) {
                filteredRents.push(rent);
            }
        })
        res.json(filteredRents);
        return;
    }

    res.json(rents);
});

router.get('/rent/:id', async (req, res) => {
    let rent;
    try {
        rent = await Rent.findById(req.params.id);
        res.json(rent);
    } catch (err) {
        if (!rent) {
            res.status(404).json({ "error": "The rent that you are looking for does not exist" });
        }
    }
});



module.exports = router;