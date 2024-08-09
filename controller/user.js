const User = require('../models/user'); 
const Product = require('../models/product');

// Rute untuk pemrosesan server-side DataTables
exports.searchUser = async (req, res) => {
  try {
    const draw = req.body.draw;
    const start = req.body.start;
    const length = req.body.length;
    const searchValue = req.body.search.value;

    const filter = {
      $or: [
        { name: { $regex: searchValue, $options: 'i' } },
        { position: { $regex: searchValue, $options: 'i' } },
        { office: { $regex: searchValue, $options: 'i' } },
      ]
    };

    const totalRecords = await User.countDocuments(filter);

    const users = await User.find(filter)
      .skip(parseInt(start))
      .limit(parseInt(length));

    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords,
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kesalahan Server Internal');
  }
};

exports.getCreateUser = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('user/create_user.ejs', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postCreateUser = async (req, res) => {
  try {
    const { name, position, office, age, startDate, salary, productIds } = req.body;

    const newUser = new User({
      name,
      position,
      office,
      age,
      startDate,
      salary,
    });

    await newUser.save();

    if (productIds && productIds.length > 0) {
      const products = await Product.find({ _id: { $in: productIds } });
      newUser.products = products;
      await newUser.save();
    }

    res.redirect('/user');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getReadUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('products');
    console.log(user.products);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    res.render('user/read_user.ejs', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUpdateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const products = await Product.find();
    res.render('user/update_user.ejs', { user, products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postUpdateUser = async (req, res) => {
  try {
    const { name, position, office, age, startDate, salary, productIds } = req.body;

    const updatedUser = {
      name,
      position,
      office,
      age,
      startDate,
      salary,
    };

    if (productIds && productIds.length > 0) {
      const products = await Product.find({ _id: { $in: productIds } });
      updatedUser.products = products;
    }

    await User.findByIdAndUpdate(req.params.id, updatedUser);
    res.redirect('/user');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.redirect('/user');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};