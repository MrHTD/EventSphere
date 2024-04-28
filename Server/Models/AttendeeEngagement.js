const mongoose = require('mongoose');

const attendeeEngagementSchema = new mongoose.Schema({
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee', required: true },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    timeSpent: { type: Number, default: 0 },
    interactions: [{ type: String }],
    // Add more fields as needed
}, { timestamps: true });

const AttendeeEngagement = mongoose.model('AttendeeEngagement', attendeeEngagementSchema);

module.exports = AttendeeEngagement;
