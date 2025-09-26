/**
 * License routes
 */

const express = require('express');
const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Please log in to access this page');
    return res.redirect('/auth/login');
  }
  next();
};

// My Licenses page
router.get('/', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock license data - in production, this would come from the database
  const licenses = [
    {
      id: 'lic_1234567890',
      key: 'LC-ABC123-DEF456-GHI789',
      applicationName: 'Advanced Analytics Pro',
      status: 'active',
      plan: 'monthly',
      price: 99,
      currency: 'USD',
      expiresAt: new Date('2024-02-15'),
      createdAt: new Date('2024-01-15'),
      features: ['Real-time analytics', 'Custom dashboards', 'API access'],
      usage: {
        totalValidations: 1250,
        lastValidated: new Date('2024-01-20'),
        maxValidations: -1, // Unlimited
      },
    },
    {
      id: 'lic_0987654321',
      key: 'LC-XYZ789-UVW456-RST123',
      applicationName: 'Data Insights Suite',
      status: 'active',
      plan: 'yearly',
      price: 999,
      currency: 'USD',
      expiresAt: new Date('2025-01-14'),
      createdAt: new Date('2024-01-14'),
      features: ['AI insights', 'Data visualization', 'Machine learning'],
      usage: {
        totalValidations: 850,
        lastValidated: new Date('2024-01-19'),
        maxValidations: -1, // Unlimited
      },
    },
    {
      id: 'lic_1122334455',
      key: 'LC-MNO123-PQR456-STU789',
      applicationName: 'Business Intelligence Tool',
      status: 'expired',
      plan: 'monthly',
      price: 79,
      currency: 'USD',
      expiresAt: new Date('2024-01-10'),
      createdAt: new Date('2023-12-10'),
      features: ['Reports', 'Dashboards', 'Data integration'],
      usage: {
        totalValidations: 420,
        lastValidated: new Date('2024-01-08'),
        maxValidations: -1, // Unlimited
      },
    },
  ];

  res.render('licenses/index', {
    title: 'My Licenses - LicenseChain',
    user,
    licenses,
  });
});

// License details
router.get('/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const user = req.session.user;

  // Mock license details - in production, this would query the database
  const license = {
    id,
    key: 'LC-ABC123-DEF456-GHI789',
    applicationName: 'Advanced Analytics Pro',
    status: 'active',
    plan: 'monthly',
    price: 99,
    currency: 'USD',
    expiresAt: new Date('2024-02-15'),
    createdAt: new Date('2024-01-15'),
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
    usage: {
      totalValidations: 1250,
      lastValidated: new Date('2024-01-20'),
      maxValidations: -1, // Unlimited
    },
    support: {
      email: 'support@licensechain.app',
      phone: '+1-555-0123',
      documentation: 'https://docs.licensechain.app',
    },
  };

  res.render('licenses/details', {
    title: `License Details - ${license.applicationName}`,
    user,
    license,
  });
});

// Renew license
router.post('/:id/renew', requireAuth, (req, res) => {
  const { id } = req.params;
  const { plan } = req.body;
  
  // Mock license renewal - in production, this would process payment and update license
  req.flash('success', 'License renewed successfully!');
  res.redirect(`/licenses/${id}`);
});

// Download license
router.get('/:id/download', requireAuth, (req, res) => {
  const { id } = req.params;
  
  // Mock license download - in production, this would generate and serve license file
  const licenseData = {
    key: 'LC-ABC123-DEF456-GHI789',
    application: 'Advanced Analytics Pro',
    expires: '2024-02-15',
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="license.json"');
  res.json(licenseData);
});

// Validate license
router.post('/:id/validate', requireAuth, (req, res) => {
  const { id } = req.params;
  const { hardwareId } = req.body;
  
  // Mock license validation - in production, this would validate against the API
  const validation = {
    valid: true,
    message: 'License is valid and active',
    expiresAt: '2024-02-15',
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
  };
  
  res.json(validation);
});

module.exports = router;
