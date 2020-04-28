const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
    licencePlate: { type: String, required: true },
    description: { type: String, },
    rentProfit: { type: Number, default: 0.15 },
    rentedUntil: { type: Date },
    price: { type: Number, required: true },
});

VehicleSchema.virtual('isRented').get(function () {
    return (this.rentedUntil && this.rentedUntil > Date.now());
});

const vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = vehicle;