const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  refno: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Transfer_Product', transferSchema);