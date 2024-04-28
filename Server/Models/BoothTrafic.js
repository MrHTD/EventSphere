const mongoose = require('mongoose');

const boothTrafficSchema = new mongoose.Schema({
    boothId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true },
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee', required: true },
    timestamp: { type: Date, default: Date.now },
    // Add more fields as needed
}, { timestamps: true });

const BoothTraffic = mongoose.model('BoothTraffic', boothTrafficSchema);

module.exports = BoothTraffic;