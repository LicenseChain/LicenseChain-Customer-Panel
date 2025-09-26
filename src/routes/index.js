/**
 * Main routes
 */

const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'LicenseChain Customer Portal',
    user: req.session.user,
  });
});

// Features page
router.get('/features', (req, res) => {
  res.render('features', {
    title: 'Features - LicenseChain',
    user: req.session.user,
  });
});

// Pricing page
router.get('/pricing', (req, res) => {
  res.render('pricing', {
    title: 'Pricing - LicenseChain',
    user: req.session.user,
  });
});

// About page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About - LicenseChain',
    user: req.session.user,
  });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact - LicenseChain',
    user: req.session.user,
  });
});

// Documentation page
router.get('/docs', (req, res) => {
  res.render('docs', {
    title: 'Documentation - LicenseChain',
    user: req.session.user,
  });
});

module.exports = router;
