const { Router } = require('express');
const EstatePolice = require('../models/EstatePolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { objectAddress, objectArea } = req.body;

    const conclusionDate = new Date().toISOString().substr(0, 10);
    const expirationDate = conclusionDate.replace(new Date().getFullYear(), new Date().getFullYear() + 1);

    let policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    let existing = await EstatePolice.findOne({ policeID });

    while (existing) {
      policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
      existing = await EstatePolice.findOne({ policeID });
    }

    const estatePolice = new EstatePolice({
      userID: req.user.userId, policeID, conclusionDate, expirationDate,
      objectAddress, objectArea
    });

    await estatePolice.save();

    res.status(201).json({ estatePolice });
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
