const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

const exhibitormessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  recieverId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  timestamp: { type: Date, default: Date.now }
});

const ExhibitorMessage = mongoose.model('ExhibitorMessage', exhibitormessageSchema);

module.exports = { Message, ExhibitorMessage };
