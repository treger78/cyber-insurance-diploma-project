const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/signup
router.post(
  '/signup',
  [
    check('secondName', 'Введите корректную фамилию!').isLength({ min: 2 }).isString(),
    check('firstName', 'Введите корректное имя!').isLength({ min: 2 }).isString(),
    check('birthDate', 'Введите дату рождения в качестве разделителей используйте точки!')
      .isLength({ min: 10 }).isLength({ max: 10 }),
    check('mobilePhone', 'Введите корректный номер мобильного телефона в формате 8900...!')
      .isLength({ min: 11 }).isLength({ max: 11 }),
    check('email', 'Некорректный email!').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов!').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данный при регистрации!',
        });
      }

      const { secondName, firstName, patronymic, birthDate, mobilePhone, email, password } = req.body;
      const candidate = await User.findOne({ email }); // email: email

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10); //10 - salt
      const user = new User({ secondName, firstName, patronymic, birthDate, mobilePhone, email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан, авторизуйтесь!' });
    } catch(e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
    }
});

// /api/auth/signin
router.post(
  '/signin',
  [
    check('email', 'Введите корректный email!').normalizeEmail().isEmail(),
    check('password', 'Введите пароль!').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данный при входе в систему!',
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден!' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверны email или пароль, попробуйте снова!' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '30d' }
      );

      res.json({ token, userId: user.id });
    } catch(e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
    }
});

module.exports = router;
