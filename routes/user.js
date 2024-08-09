const express = require('express');
const router = express.Router();
const userCTR = require('../controller/user');

router.get('/create', userCTR.getCreateUser);
router.post('/createUser', userCTR.postCreateUser); 
router.get('/read/:id', userCTR.getReadUser);
router.get('/delete/:id', userCTR.deleteUser);
router.get('/getUpdate/:id', userCTR.getUpdateUser);
router.post('/postUpdate/:id', userCTR.postUpdateUser);
router.post('/cariUser', userCTR.searchUser);

router.get('/user', (_req, res) => {
  res.render('page', { pageContent: 'user/main_user.ejs' });
});

module.exports = router;
