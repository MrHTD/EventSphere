const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for booth allocation
const BoothSchema = new Schema({
  boothNumber: { type: Number, required: true },
  totalSpaces: { type: Number, required: true }, // Total available spaces in the booth
  reservedSpaces: { type: Number, default: 0 }, // Number of spaces already reserved
});

// Create a Mongoose model based on the schema
const BoothModel = mongoose.model("booths", BoothSchema);

// ExpoBoothAllocation Model
const ExpoBoothAllocationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  expo: { type: Schema.Types.ObjectId, ref: 'expos', required: true },
  booth: { type: Schema.Types.ObjectId, ref: 'booths', required: true },
  status: { type: String, enum: ['assigned', 'available', 'reserved'], default: 'available' },
  spacesReserved: { type: Number, required: true },
});

const ExpoBoothAllocationModel = mongoose.model("boothAllocations", ExpoBoothAllocationSchema);

// Export the model
module.exports = { BoothModel, ExpoBoothAllocationModel };