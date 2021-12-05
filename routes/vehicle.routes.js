const { Router } = require('express');
const VehiclePolice = require('../models/VehiclePolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/vehicle', auth, async (req, res) => {
  try {
    const { form } = req.body;

    const vehiclePolice = new VehiclePolice({
      form//, to, from, owner: req.user.userId
    });

    await vehiclePolice.save();

    res.status(201).json({ vehiclePolice });
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/vehicle', auth, async (req, res) => {
  try {
    const vehiclePolice = await VehiclePolice.find({ userID: req.user.userId });

    res.json(vehiclePolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
