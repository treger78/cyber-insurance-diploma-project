const { Router } = require('express');
const TripPolice = require('../models/TripPolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { tripCountry, startDateOfTrip, numberOfDays } = req.body;

    const day = 86400000;

    const conclusionDate = new Date(startDateOfTrip);
    const expirationDate = new Date(conclusionDate.getTime() + (day * numberOfDays));

    let policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    let existing = await TripPolice.findOne({ policeID });

    while (existing) {
      policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
      existing = await TripPolice.findOne({ policeID });
    }

    const tripPolice = new TripPolice({
      userID: req.user.userId, policeID, conclusionDate, expirationDate,
      tripCountry, startDateOfTrip, numberOfDays
    });

    await tripPolice.save();

    res.status(201).json({ tripPolice });
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
