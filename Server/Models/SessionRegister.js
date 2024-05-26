const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for expo registration
const SessionRegisterSchema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String },
    Phone: { type: String },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'sessions', required: true },
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
    timestamps: true
});
// Create a Mongoose model based on the schema
const SessionRegisterModel = mongoose.model("sessionregister", SessionRegisterSchema);

// Export the model
module.exports = SessionRegisterModel;