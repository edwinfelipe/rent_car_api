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
    let totalCompanyProfit = 0.0;
    let totalVehiclesProfit = 0.0;
    let rentedVehicles = {

    };

    for (let rent of rents) {
        cashfromRents += rent.rentValue;
        totalCompanyProfit += rent.rentValue * rent.companyProfit;
        totalVehiclesProfit += rent.rentValue * (1.0 - rent.companyProfit);

        const companyProfit = rent.rentValue * rent.companyProfit;

        if (!Object.keys(rentedVehicles).includes(rent.vehicleId)) {
            rentedVehicles[rent.vehicleId] = {
                licencePlate: rent.vehicle.licencePlate,
                description: rent.vehicle.description,
                rents: 1,
                rentValue: Number.parseFloat(rent.rentValue.toFixed(2)),
                companyProfit: Number.parseFloat(companyProfit.toFixed(2)),
                vehiclesProfit: Number.parseFloat((rent.rentValue - companyProfit).toFixed(2)),
            };
        } else {
            rentedVehicles[rent.vehicleId].rents += 1;
            rentedVehicles[rent.vehicleId].rentValue += Number.parseFloat(rent.rentValue.toFixed(2));
            rentedVehicles[rent.vehicleId].companyProfit += Number.parseFloat(companyProfit.toFixed(2));
            rentedVehicles[rent.vehicleId].vehiclesProfit += Number.parseFloat((rent.rentValue - companyProfit).toFixed(2));
        }
    }

    res.json({
        cashfromRents: Number.parseFloat(cashfromRents.toFixed(2)),
        companyProfit: Number.parseFloat(totalCompanyProfit.toFixed(2)),
        vehiclesProfit: Number.parseFloat(totalVehiclesProfit.toFixed(2)),
        rentsByVehicles: rentedVehicles
    });


});

module.exports = router;