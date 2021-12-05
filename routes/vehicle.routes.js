const { Router } = require('express');
const VehiclePolice = require('../models/VehiclePolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/', auth, async (req, res) => {
  try {
    const { registerSign, VIN, vehicleCategory, marka, model, enginePower, releaseDate } = req.body;

    const conclusionDate = new Date().toISOString().substr(0, 10);
    const expirationDate = conclusionDate.replace(new Date().getFullYear(), new Date().getFullYear() + 1);

    let policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    let existing = await VehiclePolice.findOne({ policeID });

    while (existing) {
      policeID = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
      existing = await VehiclePolice.findOne({ policeID });
    }

    const vehiclePolice = new VehiclePolice({
      userID: req.user.userId, policeID, conclusionDate, expirationDate,
      registerSign, VIN, vehicleCategory, marka, model, enginePower, releaseDate
    });

    await vehiclePolice.save();

    res.status(201).json({ vehiclePolice });
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

/*
router.get('/', auth, async (req, res) => {
  try {
    const vehiclePolices = await VehiclePolice.find({ userID: req.user.userId });

    res.json(vehiclePolices);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const vehiclePolice = await VehiclePolice.findById(req.params.id);

    res.json(vehiclePolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});
*/

module.exports = router;
