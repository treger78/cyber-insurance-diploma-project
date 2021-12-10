const { Router } = require('express');
const User = require('../models/User');
const VehiclePolice = require('../models/VehiclePolice');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    res.json(user);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/vehiclePolice', auth, async (req, res) => {
  try {
    const vehiclePolices = await VehiclePolice.find({ userID: req.user.userId });

    res.json(vehiclePolices);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
