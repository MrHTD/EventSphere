const mongoose = require('mongoose');

const sessionPopularitySchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    numberOfAttendees: { type: Number, default: 0 },
    ratings: [{ type: Number }],
    feedback: [{ type: String }],
    // Add more fields as needed
}, { timestamps: true });

const SessionPopularity = mongoose.model('SessionPopularity', sessionPopularitySchema);

module.exports = SessionPopularity;