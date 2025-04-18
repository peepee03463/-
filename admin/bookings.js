router.post('/done/:q', async (req, res) => {
  const q = req.params.q;
  await Booking.updateOne({ queueNumber: q }, { status: 'done' });
  res.sendStatus(200);
});