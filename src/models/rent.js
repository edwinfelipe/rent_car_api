const mongoose = require('mongoose');
const { Schema } = mongoose;

const RentSchema = new Schema({
    startDate: { type: Date, default: Date.now, required: true },
    endDate: { type: Date, required: true },
    rentValue: { type: Number, required: true },
    vehicleId: { type: String },
    vehicle: { type: { licencePlate: String, description: String } },
    companyProfit: { type: Number }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

RentSchema.virtual('isActive').get(function () {
    const now = new Date();
    return this.endDate.getTime() - now.getTime() > 0;
});

RentSchema.virtual('daysToRent').get(function () {
    const dateInTime = this.endDate.getTime() - this.startDate.getTime();
    const dateInDays = dateInTime / (1000 * 3600 * 24);

    return dateInDays;
});



RentSchema.query.fromDate = function (from, to) {
    return this.where({ startDate: { $gte: new Date(from), $lte: new Date(to) } })
}
const rent = mongoose.model('Rent', RentSchema);

module.exports = rent;