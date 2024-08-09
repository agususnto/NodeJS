const express = require('express');
const router = express.Router();
const productCTR = require('../controller/product');

router.get('/createPrdct', productCTR.getCreateProduct);
router.post('/createProduct', productCTR.postCreateProduct); 
router.get('/readprdct/:id', productCTR.getReadProduct);
router.get('/updateprdct/:id', productCTR.getUpdateProduct);
router.post('/updateProduct/:id', productCTR.postUpdateProduct);
router.get('/deletePrdct/:id', productCTR.deleteProduct);

router.post('/cariProduct', productCTR.searcproduct);

router.get('/product', (_req, res) => {
  res.render('page', { pageContent: 'product/main_product.ejs' });
});

module.exports = router;
