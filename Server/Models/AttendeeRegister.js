const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for expo registration
const AttendeeRegisterSchema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String },
    Phone: { type: String },
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: 'expos', required: true },
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
}, {
    timestamps: true
});
// Create a Mongoose model based on the schema
const AttendeeRegisterModel = mongoose.model("attendeeRegister", AttendeeRegisterSchema);

// Export the model
module.exports = AttendeeRegisterModel;