const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  secondName: { type: String, required: true },
  firstName: { type: String, required: true },
  patronymic: { type: String },
  birthDate: { type: Date, required: true },
  mobilePhone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  polices: [{ type: Types.ObjectId, ref: 'Police' }]
});

module.exports = model('User', schema);
