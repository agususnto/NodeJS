const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const Product = require('../models/product');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.getCreateProduct = async (req, res) => {
  try {
    const users = await User.find();
    res.render('product/create_product.ejs', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postCreateProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { sku, name, price, stock, category, YouID } = req.body;
      const image = req.file;

      console.log('File yang diunggah:', image);

      if (!image) {
        return res.status(400).send('No file uploaded.');
      }

      const newProduct = new Product({
        sku,
        name,
        price,
        stock,
        category,
        image: {
          data: fs.readFileSync(image.path),
          contentType: image.mimetype,
        }
      });

      await newProduct.save();

      const youIDsArray = YouID ? YouID.split(",") : [];

      if (youIDsArray.length > 0) {
        const users = await User.find({ _id: { $in: youIDsArray } });
        newProduct.users = users;
        await newProduct.save();
      }

      res.redirect('/product');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
];

exports.getReadProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('users');
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.render('product/read_product.ejs', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUpdateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send('User not found');
      return;
    }

    const users = await User.find();
    res.render('product/update_product.ejs', { product, users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postUpdateProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { sku, name, price, stock, category, YouID } = req.body;
      const image = req.file;

      const updatedProduct = {
        sku,
        name,
        price,
        stock,
        category,
      };

      if (YouID) {
        const usersArray = YouID.split(',').map(userId => userId.trim()).filter(Boolean);

        if (usersArray.length > 0) {
          const validUsers = await User.find({ _id: { $in: usersArray } });
          updatedProduct.users = validUsers;
        } else {
          updatedProduct.users = [];
        }
      }

      if (image) {
        updatedProduct.image = {
          data: fs.readFileSync(image.path),
          contentType: image.mimetype,
        };
      }

      await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
      res.redirect('/product');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
];

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.redirect('/product');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.searcproduct = async (req, res) => {
  try {
    const draw = req.body.draw;
    const start = req.body.start;
    const length = req.body.length;
    const searchValue = req.body.search.value;

    const filter = {
      $or: [
        { sku: { $regex: searchValue, $options: 'i' } },
        { name: { $regex: searchValue, $options: 'i' } },
      ]
    };

    const totalRecords = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(parseInt(start))
      .limit(parseInt(length));

    const productData = products.map(product => {
      if (product.image && product.image.data) {
        return {
          ...product.toObject(),
          image: {
            contentType: product.image.contentType,
            data: product.image.data.toString('base64'),
          }
        };
      } else {
        return {
          ...product.toObject(),
          image: null
        };
      }
    });

    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords,
      data: productData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kesalahan Server Internal');
  }
};
