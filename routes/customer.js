const express = require('express');
const router = express.Router();
const customerCTR = require('../controller/customer');

router.get('/createCustomer', customerCTR.getCreateCustomer);
router.post('/createcustomer', customerCTR.postCreateCustomer); 
router.get('/readcustomer/:id', customerCTR.getReadCustomer);
router.get('/updatecustomer/:id', customerCTR.getUpdateCustomer);
router.post('/updateCustomer/:id', customerCTR.postUpdateCustomer);
router.get('/deleteCustomer/:id', customerCTR.deleteCustomer);

router.post('/cariCustomer', customerCTR.searchcustomer);

router.get('/customer', (_req, res) => {
  res.render('page', { pageContent: 'customer/main_customer' });
});

module.exports = router;
