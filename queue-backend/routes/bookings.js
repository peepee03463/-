const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

let currentQueue = 1;

router.post('/bookings', async (req, res) => {
  const lastBooking = await Booking.findOne().sort('-queueNumber');
  const queueNumber = lastBooking ? lastBooking.queueNumber + 1 : 1;

  const booking = new Booking({ ...req.body, queueNumber });
  await booking.save();

  res.json({ queueNumber });
});

router.get('/status', async (req, res) => {
  res.json({ currentQueue });
});

router.get('/history', async (req, res) => {
  const query = req.query.query;
  const bookings = await Booking.find({
    $or: [{ email: query }, { phone: query }]
  }).sort('-date');
  res.json(bookings);
});

router.post('/notify-subscribe', async (req, res) => {
  const { queueNumber, notifyLine, notifyEmail } = req.body;
  await Booking.updateOne({ queueNumber }, { notifyLine, notifyEmail });
  res.sendStatus(200);
});

router.post('/advance-queue', async (req, res) => {
  currentQueue++;
  req.io.emit('queueUpdate', { currentQueue });
  res.json({ currentQueue });
});

module.exports = router;