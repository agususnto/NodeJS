const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
const sessionMiddleware = require('./middlewares/session');
const checkAuthMiddleware = require('./middlewares/checkAuth');
const localsMiddleware = require('./middlewares/locals');

// Routes
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const transferRoutes = require('./routes/transfer_product'); 
const customerRoutes = require('./routes/customer');

// const dashboard = require('./routes/dashboard');
// const logoutHandler = require('./controllers/logout');

// Database
const dbConfig = require('./config/database');
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Timeout 10 detik
  socketTimeoutMS: 45000, // Timeout soket 45 detik
  family: 4 // Gunakan IPv4
}).then(() => {
  console.log('Terhubung ke MongoDB');
}).catch((error) => {
  console.error('Kesalahan koneksi MongoDB:', error);
});

// View engine ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Menggunakan middleware untuk session dan locals
app.use(sessionMiddleware);
app.use(localsMiddleware);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Menggunakan rute
app.use(mainRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use(transferRoutes);
app.use(customerRoutes);
// app.use(dashboard);
// app.use(logoutHandler);

// Rute untuk halaman utama yang memerlukan otentikasi
app.get('/', checkAuthMiddleware, (req, res) => {
  res.render('home');
});

// Rute untuk logout
// app.post('/logout', logoutHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
