const express = require('express');
const router = express.Router();

router.get('/chartjs', (_req, res) => {
    res.render('page', { title: 'charts/chartjs.ejs', pageContent: 'charts/chartjs.ejs' });
  });

  router.get('/forms', (_req, res) => {
    res.render('page', { title: 'forms/basic_elements.ejs', pageContent: 'forms/basic_elements.ejs' });
  });

  router.get('/icons', (_req, res) => {
    res.render('page', { title: 'icons/mdi.ejs', pageContent: 'icons/mdi.ejs' });
  });

  // router.get('/blank', (_req, res) => {
  //   res.render('page', { title: 'samples/blank-page.ejs', pageContent: 'samples/blank-page.ejs' });
  // });
  
  router.get('/404', (_req, res) => {
    res.render('page', { title: 'samples/error-404.ejs', pageContent: 'samples/error-404.ejs' });
  });
  
  router.get('/eroor-500', (_req, res) => {
    res.render('page', { title: 'samples/error-500.ejs', pageContent: 'samples/error-500.ejs' });
  });
  
  router.get('/login', (_req, res) => {
    // res.render('page',{title: 'samples/login.ejs', pageContent: 'samples/login.ejs' });
    res.render('samples/login.ejs')
  });
  
  router.get('/register', (_req, res) => {
    // res.render('page',{title: 'samples/register.ejs', pageContent: 'samples/register.ejs' });
    res.render('samples/register.ejs')
  });

  router.get('/tables', (_req, res) => {
    res.render('page', { title: 'tables/basic-table.ejs', pageContent: 'tables/basic-table.ejs' });
  });

  router.get('/buttons', (_req, res) => {
    res.render('page', { title: 'ui-features/buttons.ejs', pageContent: 'ui-features/buttons.ejs' });
  });
  
  router.get('/dropdowns', (_req, res) => {
    res.render('page', { title: 'ui-features/dropdowns.ejs', pageContent: 'ui-features/dropdowns.ejs' });
  });
  
  router.get('/typography', (_req, res) => {
    res.render('page', { title: 'ui-features/typography.ejs', pageContent: 'ui-features/typography.ejs' });
  });

  router.get('/typography', (_req, res) => {
    res.render('page', { title: 'ui-features/typography.ejs', pageContent: 'ui-features/typography.ejs' });
  });

  router.get('/dashboard', (_req, res) => {
    res.render('page', {pageContent: 'dashboard/dashboard.ejs'});
  });

module.exports = router;