const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Expo collection
const ExpoSchema = new Schema({
  title: { type: String, required: true },  
  startDate: { type: Date, required: true },     
  endDate: { type: Date, required: true },     
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: String, required: true },  
  description: { type: String },
  theme: { type: String },                       
  organizer: { type: String },                 
  status: { type: String, enum: ['upcoming', 'ongoing', 'ended'], default: 'upcoming' },
},
{ timestamps: true },
);

// Create a Mongoose model based on the schema
const ExpoModel = mongoose.model("expos", ExpoSchema);

// Export the model
module.exports = ExpoModel;