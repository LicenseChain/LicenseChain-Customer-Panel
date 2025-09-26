/**
 * API routes
 */

const express = require('express');
const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Get user profile
router.get('/profile', requireAuth, (req, res) => {
  const user = req.session.user;
  
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      company: user.company,
      role: user.role,
    },
  });
});

// Get user licenses
router.get('/licenses', requireAuth, (req, res) => {
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
      expiresAt: '2024-02-15T00:00:00.000Z',
      createdAt: '2024-01-15T00:00:00.000Z',
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
      expiresAt: '2025-01-14T00:00:00.000Z',
      createdAt: '2024-01-14T00:00:00.000Z',
      features: ['AI insights', 'Data visualization', 'Machine learning'],
    },
  ];

  res.json({
    success: true,
    data: licenses,
  });
});

// Get license details
router.get('/licenses/:id', requireAuth, (req, res) => {
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
    expiresAt: '2024-02-15T00:00:00.000Z',
    createdAt: '2024-01-15T00:00:00.000Z',
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
    usage: {
      totalValidations: 1250,
      lastValidated: '2024-01-20T00:00:00.000Z',
      maxValidations: -1, // Unlimited
    },
  };

  res.json({
    success: true,
    data: license,
  });
});

// Validate license
router.post('/licenses/:id/validate', requireAuth, (req, res) => {
  const { id } = req.params;
  const { hardwareId } = req.body;
  const user = req.session.user;

  // Mock license validation - in production, this would validate against the API
  const validation = {
    valid: true,
    message: 'License is valid and active',
    expiresAt: '2024-02-15T00:00:00.000Z',
    features: ['Real-time analytics', 'Custom dashboards', 'API access'],
    usage: {
      totalValidations: 1251,
      lastValidated: new Date().toISOString(),
      maxValidations: -1,
    },
  };

  res.json({
    success: true,
    data: validation,
  });
});

// Get user statistics
router.get('/stats', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock statistics - in production, this would come from the database
  const stats = {
    totalLicenses: 3,
    activeLicenses: 2,
    expiredLicenses: 1,
    totalSpent: 297,
    currency: 'USD',
    totalValidations: 2100,
    lastActivity: '2024-01-20T00:00:00.000Z',
  };

  res.json({
    success: true,
    data: stats,
  });
});

// Get support tickets
router.get('/tickets', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock tickets - in production, this would come from the database
  const tickets = [
    {
      id: 'TICKET-001',
      subject: 'License validation issue',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-20T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    },
    {
      id: 'TICKET-002',
      subject: 'Feature request: Custom dashboards',
      status: 'closed',
      priority: 'medium',
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: '2024-01-18T00:00:00.000Z',
    },
  ];

  res.json({
    success: true,
    data: tickets,
  });
});

// Create support ticket
router.post('/tickets', requireAuth, (req, res) => {
  const { subject, category, priority, message } = req.body;
  const user = req.session.user;

  // Mock ticket creation - in production, this would save to the database
  const ticket = {
    id: `TICKET-${Date.now()}`,
    subject,
    category,
    priority,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: ticket,
    message: 'Support ticket created successfully',
  });
});

// Get billing history
router.get('/billing', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock billing data - in production, this would come from the database
  const invoices = [
    {
      id: 'inv_1234567890',
      date: '2024-01-15T00:00:00.000Z',
      amount: 99.00,
      currency: 'USD',
      status: 'paid',
      description: 'Advanced Analytics Pro - Monthly',
      downloadUrl: '/api/invoices/inv_1234567890/download',
    },
    {
      id: 'inv_0987654321',
      date: '2024-01-14T00:00:00.000Z',
      amount: 999.00,
      currency: 'USD',
      status: 'paid',
      description: 'Data Insights Suite - Yearly',
      downloadUrl: '/api/invoices/inv_0987654321/download',
    },
  ];

  res.json({
    success: true,
    data: invoices,
  });
});

// Get usage analytics
router.get('/analytics', requireAuth, (req, res) => {
  const user = req.session.user;
  const { period = '30d' } = req.query;
  
  // Mock analytics data - in production, this would come from the database
  const analytics = {
    period,
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

  res.json({
    success: true,
    data: analytics,
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      service: 'LicenseChain Customer Panel API',
    },
  });
});

// Error handler for API routes
router.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
  });
});

module.exports = router;
