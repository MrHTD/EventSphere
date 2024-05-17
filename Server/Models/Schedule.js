const mongoose = require('mongoose');

// Define schema for events
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    // Add any other relevant fields
});

// Define schema for time slots
const timeSlotSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

// Define schema for sessions
const sessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true },
    timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'timeslots', required: true },
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'speakers' }],
    topic: { type: String },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'locations', required: true },
});

// Define schema for speakers
const speakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    contactInfo: { type: String },
    // Add any other relevant fields
});

// Define schema for locations
const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
    capacity: { type: Number },
    // Add any other relevant fields
});

// Define models
const EventModel = mongoose.model('events', eventSchema);
const TimeSlotModel = mongoose.model('timeslots', timeSlotSchema);
const SessionModel = mongoose.model('sessions', sessionSchema);
const SpeakerModel = mongoose.model('speakers', speakerSchema);
const LocationModel = mongoose.model('locations', locationSchema);

module.exports = { EventModel, TimeSlotModel, SessionModel, SpeakerModel, LocationModel };
