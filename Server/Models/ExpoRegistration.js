const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for expo registration
const ExpoRegistrationSchema = new Schema({
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  companyAddress: { type: String },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  productsServices: { type: String },
  requiredDocuments: { type: String, required: true },
  approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  expoId: { type: mongoose.Schema.Types.ObjectId, ref: 'expos', required: true },
  exhibitorId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

// Create a Mongoose model based on the schema
const ExpoRegistrationModel = mongoose.model("expoRegistration", ExpoRegistrationSchema);

// Export the model
module.exports = ExpoRegistrationModel;