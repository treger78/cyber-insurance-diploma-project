const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userID: { type: Types.ObjectId, ref: 'User' },
  policeID: { type: Number, required: true },
  conclusionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  objectAddress: { type: String, required: true },
  objectArea: { type: String, required: true }
});

module.exports = model('EstatePolice', schema);
