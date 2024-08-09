const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chandra' }],
});

module.exports = mongoose.model('You', productSchema);