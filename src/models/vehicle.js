const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
    licencePlate: { type: String, required: true },
    description: { type: String, },
    rentedUntil: { type: Date },
    price: { type: Number, required: true },
});

VehicleSchema.virtual('isRented').get(function () {
    return (this.rentedUntil && this.rentedUntil.getTime() - Date.now() > 0)
});

const vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = vehicle;