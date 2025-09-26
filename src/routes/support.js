/**
 * Support routes
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

// Support home
router.get('/', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock support data - in production, this would come from the database
  const supportData = {
    user,
    tickets: [
      {
        id: 'TICKET-001',
        subject: 'License validation issue',
        status: 'open',
        priority: 'high',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
        messages: [
          {
            id: 1,
            sender: 'user',
            message: 'I am having trouble validating my license key.',
            timestamp: new Date('2024-01-20'),
          },
          {
            id: 2,
            sender: 'support',
            message: 'Thank you for contacting us. We are looking into this issue.',
            timestamp: new Date('2024-01-20'),
          },
        ],
      },
      {
        id: 'TICKET-002',
        subject: 'Feature request: Custom dashboards',
        status: 'closed',
        priority: 'medium',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-18'),
        messages: [
          {
            id: 1,
            sender: 'user',
            message: 'It would be great to have custom dashboard templates.',
            timestamp: new Date('2024-01-15'),
          },
          {
            id: 2,
            sender: 'support',
            message: 'Thank you for your suggestion. We have added this to our roadmap.',
            timestamp: new Date('2024-01-18'),
          },
        ],
      },
    ],
    faqs: [
      {
        id: 1,
        question: 'How do I validate a license key?',
        answer: 'You can validate a license key using our API or SDK. Check the documentation for examples.',
        category: 'Getting Started',
      },
      {
        id: 2,
        question: 'What happens when my license expires?',
        answer: 'When your license expires, you will need to renew it to continue using the service.',
        category: 'Billing',
      },
      {
        id: 3,
        question: 'Can I transfer my license to another user?',
        answer: 'Yes, you can transfer your license through the dashboard or by contacting support.',
        category: 'Account Management',
      },
      {
        id: 4,
        question: 'How do I enable two-factor authentication?',
        answer: 'Go to your profile settings and enable two-factor authentication in the security section.',
        category: 'Security',
      },
    ],
    categories: ['Getting Started', 'Billing', 'Account Management', 'Security', 'Technical', 'API'],
  };

  res.render('support/index', {
    title: 'Support - LicenseChain',
    user,
    ...supportData,
  });
});

// Create ticket
router.get('/new', requireAuth, (req, res) => {
  const user = req.session.user;
  
  res.render('support/new-ticket', {
    title: 'New Support Ticket - LicenseChain',
    user,
  });
});

// Create ticket POST
router.post('/new', requireAuth, (req, res) => {
  try {
    const { subject, category, priority, message } = req.body;
    const user = req.session.user;

    // Mock ticket creation - in production, this would save to the database
    const ticket = {
      id: `TICKET-${Date.now()}`,
      subject,
      category,
      priority,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: 1,
          sender: 'user',
          message,
          timestamp: new Date(),
        },
      ],
    };

    req.flash('success', 'Support ticket created successfully!');
    res.redirect('/support');
  } catch (error) {
    console.error('Ticket creation error:', error);
    req.flash('error', 'An error occurred while creating your ticket');
    res.redirect('/support/new');
  }
});

// View ticket
router.get('/ticket/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const user = req.session.user;

  // Mock ticket data - in production, this would query the database
  const ticket = {
    id,
    subject: 'License validation issue',
    status: 'open',
    priority: 'high',
    category: 'Technical',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    messages: [
      {
        id: 1,
        sender: 'user',
        message: 'I am having trouble validating my license key.',
        timestamp: new Date('2024-01-20'),
      },
      {
        id: 2,
        sender: 'support',
        message: 'Thank you for contacting us. We are looking into this issue.',
        timestamp: new Date('2024-01-20'),
      },
    ],
  };

  res.render('support/ticket', {
    title: `Ticket ${id} - LicenseChain`,
    user,
    ticket,
  });
});

// Reply to ticket
router.post('/ticket/:id/reply', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const user = req.session.user;

    // Mock ticket reply - in production, this would save to the database
    req.flash('success', 'Reply sent successfully!');
    res.redirect(`/support/ticket/${id}`);
  } catch (error) {
    console.error('Ticket reply error:', error);
    req.flash('error', 'An error occurred while sending your reply');
    res.redirect(`/support/ticket/${id}`);
  }
});

// Close ticket
router.post('/ticket/:id/close', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const user = req.session.user;

    // Mock ticket close - in production, this would update the database
    req.flash('success', 'Ticket closed successfully!');
    res.redirect('/support');
  } catch (error) {
    console.error('Ticket close error:', error);
    req.flash('error', 'An error occurred while closing the ticket');
    res.redirect(`/support/ticket/${id}`);
  }
});

// Knowledge base
router.get('/knowledge-base', (req, res) => {
  const user = req.session.user;
  
  // Mock knowledge base data - in production, this would come from the database
  const knowledgeBase = {
    user,
    articles: [
      {
        id: 1,
        title: 'Getting Started with LicenseChain',
        content: 'This guide will help you get started with LicenseChain...',
        category: 'Getting Started',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        views: 1250,
        helpful: 95,
      },
      {
        id: 2,
        title: 'API Integration Guide',
        content: 'Learn how to integrate LicenseChain into your application...',
        category: 'Technical',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        views: 890,
        helpful: 87,
      },
      {
        id: 3,
        title: 'Billing and Payments',
        content: 'Everything you need to know about billing and payments...',
        category: 'Billing',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
        views: 650,
        helpful: 92,
      },
    ],
    categories: ['Getting Started', 'Technical', 'Billing', 'Account Management', 'Security'],
  };

  res.render('support/knowledge-base', {
    title: 'Knowledge Base - LicenseChain',
    user,
    ...knowledgeBase,
  });
});

// View article
router.get('/article/:id', (req, res) => {
  const { id } = req.params;
  const user = req.session.user;

  // Mock article data - in production, this would query the database
  const article = {
    id,
    title: 'Getting Started with LicenseChain',
    content: `
      <h2>Introduction</h2>
      <p>Welcome to LicenseChain! This guide will help you get started with our license management platform.</p>
      
      <h2>Creating Your First License</h2>
      <p>To create your first license, follow these steps:</p>
      <ol>
        <li>Log in to your dashboard</li>
        <li>Navigate to the Licenses section</li>
        <li>Click "Create New License"</li>
        <li>Fill in the required information</li>
        <li>Click "Create License"</li>
      </ol>
      
      <h2>Validating Licenses</h2>
      <p>You can validate licenses using our API or SDK. Here's an example:</p>
      <pre><code>const client = new LicenseChainClient('your-api-key');
const result = await client.validateLicense('license-key');
console.log(result);</code></pre>
      
      <h2>Need Help?</h2>
      <p>If you need help, please contact our support team or check our documentation.</p>
    `,
    category: 'Getting Started',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    views: 1250,
    helpful: 95,
    relatedArticles: [
      {
        id: 2,
        title: 'API Integration Guide',
        category: 'Technical',
      },
      {
        id: 3,
        title: 'Billing and Payments',
        category: 'Billing',
      },
    ],
  };

  res.render('support/article', {
    title: `${article.title} - LicenseChain`,
    user,
    article,
  });
});

module.exports = router;
