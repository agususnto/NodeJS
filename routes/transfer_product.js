const express = require('express');
const router = express.Router();
const transferCTR = require('../controller/transfer_product');

router.get('/createTransfr', transferCTR.getCreateTransfer);
router.post('/createTransfer', transferCTR.postCreateTransfer); 
router.get('/readtransfer/:id', transferCTR.getReadTransfer);
router.get('/updatetransfer/:id', transferCTR.getUpdateTransfer);
router.post('/updateTransfer/:id', transferCTR.postUpdateTransfer);
router.get('/deletetransfer/:id', transferCTR.deleteTransfer);

router.post('/cariTransfer', transferCTR.searchtransfer);

router.get('/transfer', (_req, res) => {
  res.render('page', { pageContent: 'transfer_product/main_transfer.ejs' });
});

module.exports = router;
