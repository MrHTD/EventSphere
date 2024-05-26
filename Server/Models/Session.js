const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Session collection
const SessionSchema = new Schema({
    title: { type: Schema.Types.ObjectId, ref: 'expos', required: true },
    description: { type: String },
    speaker: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    topic: { type: String },
    location: { type: String },
}, { timestamps: true });

// Create a Mongoose model based on the schema
const SessionModel = mongoose.model("sessions", SessionSchema);

module.exports = SessionModel;