const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  bookingTime: String,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'done', 'cancelled'], default: 'pending' },
  queueNumber: Number,
  notifyLine: Boolean,
  notifyEmail: Boolean,
});

module.exports = mongoose.model('Booking', bookingSchema);