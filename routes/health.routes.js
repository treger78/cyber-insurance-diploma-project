const { Router } = require('express');
const HealthPolice = require('../models/HealthPolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { insuranceCity, age } = req.body;

    const conclusionDate = new Date().toISOString().substr(0, 10);
    const expirationDate = conclusionDate.replace(new Date().getFullYear(), new Date().getFullYear() + 1);

    let policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    let existing = await HealthPolice.findOne({ policeID });

    while (existing) {
      policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
      existing = await HealthPolice.findOne({ policeID });
    }

    const healthPolice = new HealthPolice({
      userID: req.user.userId, policeID, conclusionDate, expirationDate,
      insuranceCity, age
    });

    await healthPolice.save();

    res.status(201).json({ healthPolice });
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
