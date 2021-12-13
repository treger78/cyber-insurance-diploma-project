const { Router } = require('express');
const User = require('../models/User');
const VehiclePolice = require('../models/VehiclePolice');
const TripPolice = require('../models/TripPolice');
const EstatePolice = require('../models/EstatePolice');
const HealthPolice = require('../models/HealthPolice');
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

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    await user.save();

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

router.get('/vehiclePolice/:id', auth, async (req, res) => {
  try {
    const vehiclePolice = await VehiclePolice.findById(req.params.id);

    res.json(vehiclePolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/tripPolice', auth, async (req, res) => {
  try {
    const tripPolices = await TripPolice.find({ userID: req.user.userId });

    res.json(tripPolices);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/tripPolice/:id', auth, async (req, res) => {
  try {
    const tripPolice = await TripPolice.findById(req.params.id);

    res.json(tripPolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/estatePolice', auth, async (req, res) => {
  try {
    const estatePolices = await EstatePolice.find({ userID: req.user.userId });

    res.json(estatePolices);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/estatePolice/:id', auth, async (req, res) => {
  try {
    const estatePolice = await EstatePolice.findById(req.params.id);

    res.json(estatePolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/healthPolice', auth, async (req, res) => {
  try {
    const healthPolices = await HealthPolice.find({ userID: req.user.userId });

    res.json(healthPolices);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

router.get('/healthPolice/:id', auth, async (req, res) => {
  try {
    const healthPolice = await HealthPolice.findById(req.params.id);

    res.json(healthPolice);
  } catch(e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
  }
});

module.exports = router;
