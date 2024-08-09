const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  position: String,
  office: String,
  age: Number,
  startDate: Date,
  salary: Number,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'You' }],
});

module.exports = mongoose.model('Chandra', userSchema);