const { Schema, model } = require('mongoose');
const extendSchema = require('../utils/extendSchema');
const InsurancePolice = require('./InsurancePolice');

/*
InsurancePolice includes:
  userID: { type: Types.ObjectId, ref: 'User' },
  policeID: { type: Number, required: true },
  conclusionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true }
... so, VehiclePolice extend all this prop using extendSchema function.
*/

const schema = extendSchema(InsurancePolice, new Schema({
  registerSign: { type: String, required: true },
  VIN: { type: String, required: true },
  vehicleCategory: { type: String, required: true },
  Marka: { type: String, required: true },
  Model: { type: String, required: true },
  enginePower: { type: Number, required: true },
  releaseDate: { type: Date, required: true }
}));

module.exports = model('VehiclePolice', schema);
