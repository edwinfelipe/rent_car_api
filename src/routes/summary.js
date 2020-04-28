const express = require('express');
const router = express.Router();
const Rent = require('../models/rent');
const Vehicle = require('../models/vehicle');
router.get('/summary', async (req, res) => {
    const { from, to } = req.query;
    let rents;
    if (from && to) {
        rents = await Rent.find().fromDate(from, to);
    } else {
        rents = await Rent.find();
    }

    let cashfromRents = 0.0;
    let companyProfit = 0.0;
    let vehiclesProfit = 0.0;
    let rentedVehicles = {

    };

    for (let rent of rents) {
        cashfromRents += rent.rentValue;
        companyProfit += rent.rentValue * rent.companyProfit;
        vehiclesProfit += rent.rentValue * (1.0 - rent.companyProfit);

        if (!Object.keys(rentedVehicles).includes(rent.vehicleId)) {
            const companyProfit = rent.rentValue * rent.companyProfit;
            rentedVehicles[rent.vehicleId] = {
                rents: 1,
                rentValue: Number.parseFloat(rent.rentValue.toFixed(2)),
                companyProfit: Number.parseFloat(companyProfit.toFixed(2)),
                vehiclesProfit: Number.parseFloat((rent.rentValue - companyProfit).toFixed(2)),
            };
        } else {
            rentedVehicles[rent.vehicleId].rents += 1;
            rentedVehicles[rent.vehicleId].rentValue += Number.parseFloat(rent.rentValue.toFixed(2));
        }
    }

    res.json({
        cashfromRents: Number.parseFloat(cashfromRents.toFixed(2)),
        companyProfit: Number.parseFloat(companyProfit.toFixed(2)),
        vehiclesProfit: Number.parseFloat(vehiclesProfit.toFixed(2)),
        rentsByVehicles: rentedVehicles
    });


});

module.exports = router;