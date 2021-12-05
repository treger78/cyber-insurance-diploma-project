const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userID: { type: Types.ObjectId, ref: 'User' },
  policeID: { type: Number, required: true },
  conclusionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  registerSign: { type: String, required: true },
  VIN: { type: String, required: true },
  vehicleCategory: { type: String, required: true },
  marka: { type: String, required: true },
  model: { type: String, required: true },
  enginePower: { type: Number, required: true },
  releaseDate: { type: Date, required: true }
});

module.exports = model('VehiclePolice', schema);
