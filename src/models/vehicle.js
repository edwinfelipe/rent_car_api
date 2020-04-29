const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
    licencePlate: { type: String, required: true },
    description: { type: String, },
    rentProfit: { type: Number, default: 0.15 },
    rentedUntil: { type: Date },
    price: { type: Number, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

VehicleSchema.virtual('isRented').get(function () {
    if (this.rentedUntil && this.rentedUntil > Date.now()) {
        return true;
    } else {
        return false;
    }
});

const vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = vehicle;