const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for booth allocation
const FloorPlanSchema = new Schema({
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: 'expos', required: true },
  boothNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'booths', required: true },
  description: { type: String },                   // Description of the booth
});

// Create a Mongoose model based on the schema
const FloorPlanModel = mongoose.model("floorplans", FloorPlanSchema);

// Export the model
module.exports = FloorPlanModel;