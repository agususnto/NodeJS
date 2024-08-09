const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Fungsi untuk menghash kata sandi sebelum disimpan
loginSchema.pre('save', async function (next) {
  const login = this;

  if (login.isModified('password')) {
    login.password = await bcrypt.hash(login.password, 10);
  }

  next();
});

const Login = mongoose.model('Login', loginSchema);
module.exports = Login;
