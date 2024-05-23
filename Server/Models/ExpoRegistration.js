const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for expo registration
const ExpoRegistrationSchema = new Schema({
  companyName: { type: String, required: true },   // Company name, required
  companyWebsite: { type: String },                // Company website
  companyAddress: { type: String },                // Company address
  contactEmail: { type: String, required: true },  // Contact email, required
  contactPhone: { type: String },                  // Contact phone number
  productsServices: { type: String },           // Array of products/services offered
  requiredDocuments: { type: String, required: true }, // Array of required documents, required
  approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: 'expos', required: true },
  exhibitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

// Create a Mongoose model based on the schema
const ExpoRegistrationModel = mongoose.model("expoRegistration", ExpoRegistrationSchema);

// Export the model
module.exports = ExpoRegistrationModel;