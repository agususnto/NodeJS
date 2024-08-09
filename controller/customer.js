const Product = require('../models/product');
const Customer = require('../models/customer');

// Rute untuk pemrosesan server-side DataTables
exports.searchcustomer = async (req, res) => {
  try {
    const draw = req.body.draw;
    const start = req.body.start;
    const length = req.body.length;
    const searchValue = req.body.search.value;

    const filter = {
      $or: [
        { name: { $regex: searchValue, $options: 'i' } },
        { email: { $regex: searchValue, $options: 'i' } },
      ]
    };

    const totalRecords = await Customer.countDocuments(filter);

    const customer = await Customer.find(filter)
      .skip(parseInt(start))
      .limit(parseInt(length));

    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords,
      data: customer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kesalahan Server Internal');
  }
};

exports.getCreateCustomer = async (req, res) => {
    try {
      const products = await Product.find();
      res.render('customer/create_customer.ejs', { products });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };

exports.postCreateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, ProductID } = req.body;

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      city,
      state,
    });

    // Simpan produk baru, bukan newUser
    await newCustomer.save();

    // Mengonversi YouID menjadi array jika ada
    const productIDsArray = ProductID ? ProductID.split(",") : [];

    if (productIDsArray.length > 0) {
      const products = await Product.find({ _id: { $in: productIDsArray } });
      newCustomer.products = products;
      await newCustomer.save();
    }

    res.redirect('/customer');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getReadCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById( req.params.id ).populate('products');
    console.log(customer.products);
    if (!customer) {
      res.status(404).send('Product not found');
      return;
    }
    res.render('customer/read_customer', { customer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUpdateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).send('User not found');
      return;
    }

    const products = await Product.find();
    res.render('customer/update_customer', { customer, products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postUpdateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, ProductID } = req.body;

    // Ubah nilai YouID menjadi array ID pengguna
    const productsArray = ProductID.split(',');

    // Bersihkan ID yang tidak valid (contoh: jika ada spasi)
    const cleanProductsArray = productsArray.map(productId => productId.trim());

    console.log('Cleaned Products Array:', cleanProductsArray);

    const updatedCustomer = {
      name,
      email,
      phone,
      address,
      city,
      state,
    };

    if (cleanProductsArray.length > 0) {
      const productsData = await Product.find({ _id: { $in: cleanProductsArray } });
      console.log('Selected Products:', productsData);

      // Perbarui properti products pada updatedCustomer
      updatedCustomer.products = productsData;
    }

    console.log('Updated Customer:', updatedCustomer);

    await Customer.findByIdAndUpdate(req.params.id, updatedCustomer);
    res.redirect('/customer');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id });
    if (!customer) {
      res.status(404).send('Product not found');
      return;
    }
    res.redirect('/customer');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
