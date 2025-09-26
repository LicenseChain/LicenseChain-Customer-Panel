/**
 * Dashboard routes
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

// Dashboard home
router.get('/', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock dashboard data - in production, this would come from the database
  const dashboardData = {
    user,
    stats: {
      totalLicenses: 3,
      activeLicenses: 2,
      expiredLicenses: 1,
      totalSpent: 297,
      currency: 'USD',
    },
    recentActivity: [
      {
        id: 1,
        type: 'license_created',
        description: 'New license created for Advanced Analytics Pro',
        timestamp: new Date('2024-01-20'),
        status: 'success',
      },
      {
        id: 2,
        type: 'payment_received',
        description: 'Payment of $99.00 received',
        timestamp: new Date('2024-01-19'),
        status: 'success',
      },
      {
        id: 3,
        type: 'license_expired',
        description: 'License for Data Insights Suite expired',
        timestamp: new Date('2024-01-18'),
        status: 'warning',
      },
    ],
    licenses: [
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
      },
    ],
  };

  res.render('dashboard/index', {
    title: 'Dashboard - LicenseChain',
    user,
    ...dashboardData,
  });
});

// License details
router.get('/license/:id', requireAuth, (req, res) => {
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

  res.render('dashboard/license-details', {
    title: `License Details - ${license.applicationName}`,
    user,
    license,
  });
});

// Usage analytics
router.get('/analytics', requireAuth, (req, res) => {
  const user = req.session.user;

  // Mock analytics data - in production, this would come from the database
  const analytics = {
    user,
    period: req.query.period || '30d',
    licenseUsage: [
      { date: '2024-01-01', validations: 45 },
      { date: '2024-01-02', validations: 52 },
      { date: '2024-01-03', validations: 38 },
      { date: '2024-01-04', validations: 61 },
      { date: '2024-01-05', validations: 47 },
      { date: '2024-01-06', validations: 55 },
      { date: '2024-01-07', validations: 42 },
    ],
    topFeatures: [
      { name: 'Real-time Analytics', usage: 85, trend: 'up' },
      { name: 'Custom Dashboards', usage: 72, trend: 'up' },
      { name: 'API Access', usage: 68, trend: 'down' },
      { name: 'Data Export', usage: 45, trend: 'stable' },
    ],
    monthlyStats: {
      totalValidations: 1250,
      averagePerDay: 41.7,
      peakUsage: 61,
      lowUsage: 38,
    },
  };

  res.render('dashboard/analytics', {
    title: 'Usage Analytics - LicenseChain',
    user,
    ...analytics,
  });
});

// Billing history
router.get('/billing', requireAuth, (req, res) => {
  const user = req.session.user;

  // Mock billing data - in production, this would come from the database
  const billing = {
    user,
    invoices: [
      {
        id: 'inv_1234567890',
        date: new Date('2024-01-15'),
        amount: 99.00,
        currency: 'USD',
        status: 'paid',
        description: 'Advanced Analytics Pro - Monthly',
        downloadUrl: '#',
      },
      {
        id: 'inv_0987654321',
        date: new Date('2024-01-14'),
        amount: 999.00,
        currency: 'USD',
        status: 'paid',
        description: 'Data Insights Suite - Yearly',
        downloadUrl: '#',
      },
      {
        id: 'inv_1122334455',
        date: new Date('2023-12-10'),
        amount: 79.00,
        currency: 'USD',
        status: 'paid',
        description: 'Business Intelligence Tool - Monthly',
        downloadUrl: '#',
      },
    ],
    paymentMethods: [
      {
        id: 'pm_1234567890',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
    ],
    nextBilling: {
      date: new Date('2024-02-15'),
      amount: 99.00,
      currency: 'USD',
      description: 'Advanced Analytics Pro - Monthly',
    },
  };

  res.render('dashboard/billing', {
    title: 'Billing - LicenseChain',
    user,
    ...billing,
  });
});

module.exports = router;
