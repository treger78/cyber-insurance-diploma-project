const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userID: { type: Types.ObjectId, ref: 'User' },
  policeID: { type: Number, required: true },
  insuranceCity: { type: String, required: true },
  conclusionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true }
});

module.exports = model('HealthPolice', schema);
