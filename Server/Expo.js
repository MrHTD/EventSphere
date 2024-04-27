const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Expo collection
const ExpoSchema = new Schema({
  title: { type: String, required: true },        // Title field, required
  date: { type: Date, required: true },           // Date field, required
  location: { type: String, required: true },     // Location field, required
  description: { type: String },                  // Description field
  theme: { type: String },                        // Theme field
  organizer: { type: String },                    // Organizer field
  contact: {                                      // Contact information
    name: { type: String },
    email: { type: String },
    phone: { type: String }
  },
  status: { type: String, enum: ['upcoming', 'ongoing', 'ended'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create a Mongoose model based on the schema
const ExpoModel = mongoose.model("expos", ExpoSchema);

// Export the model
module.exports = ExpoModel;
