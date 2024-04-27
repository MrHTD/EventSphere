const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for booth allocation
const BoothSchema = new Schema({
  boothNumber: { type: Number, required: true },
  floor: { type: Number, required: true },
  description: { type: String },
});

// Create a Mongoose model based on the schema
const BoothModel = mongoose.model("booths", BoothSchema);

// Export the model
module.exports = BoothModel;