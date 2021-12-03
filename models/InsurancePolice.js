const { Schema, model } = require('mongoose');

const schema = new Schema({
  userID: { type: Number, required: true },
  policeID: { type: Number, required: true },
  conclusionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true }
});

module.exports = model('InsurancePolice', schema);
