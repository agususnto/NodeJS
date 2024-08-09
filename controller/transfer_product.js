const Transfer = require('../models/transfer_product');

// Rute untuk pemrosesan server-side DataTables
exports.searchtransfer = async (req, res) => {
  try {
    const draw = req.body.draw;
    const start = req.body.start;
    const length = req.body.length;
    const searchValue = req.body.search.value;

    const filter = {
      $or: [
        { id: { $regex: searchValue, $options: 'i' } },
        { refno: { $regex: searchValue, $options: 'i' } },
      ]
    };

    const totalRecords = await Transfer.countDocuments(filter);

    const transfer = await Transfer.find(filter)
      .skip(parseInt(start))
      .limit(parseInt(length));

    res.json({
      draw: draw,
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords,
      data: transfer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Kesalahan Server Internal');
  }
};

exports.getCreateTransfer = async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.render('transfer_product/create_transfer.ejs', { transfers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postCreateTransfer = async (req, res) => {
  try {
    const { id, refno, from, to, note } = req.body;

    const newTransfer = new Transfer({
      id,
      refno,
      from,
      to,
      note,
    });

    // Simpan produk baru, bukan newUser
    await newTransfer.save();

    res.redirect('/transfer');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getReadTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById( req.params.id);
    res.render('transfer_product/read_transfer.ejs', { transfer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getUpdateTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) {
      res.status(404).send('User not found');
      return;
    }
    res.render('transfer_product/update_transfer.ejs', { transfer });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postUpdateTransfer = async (req, res) => {
  try {
    const { id, refno, from, to, note } = req.body;

    const updatedTransfer = {
      id,
      refno,
      from,
      to,
      note,
    };

    console.log('Updated Transfer Product:', updatedTransfer);

    await Transfer.findByIdAndUpdate(req.params.id, updatedTransfer);
    res.redirect('/transfer');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findOneAndDelete({ _id: req.params.id });
    if (!transfer) {
      res.status(404).send('Transfer not found');
      return;
      }
      res.redirect('/transfer');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
  };