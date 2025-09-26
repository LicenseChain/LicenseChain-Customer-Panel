/**
 * Profile routes
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Please log in to access this page');
    return res.redirect('/auth/login');
  }
  next();
};

// Profile page
router.get('/', requireAuth, (req, res) => {
  const user = req.session.user;
  
  // Mock user profile data - in production, this would come from the database
  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company,
    avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name),
    phone: '+1-555-0123',
    address: '123 Main St, City, State 12345',
    website: 'https://example.com',
    bio: 'Software developer and data enthusiast',
    preferences: {
      notifications: true,
      marketing: false,
      security: true,
    },
    security: {
      twoFactorEnabled: false,
      lastLogin: new Date('2024-01-20'),
      loginHistory: [
        {
          date: new Date('2024-01-20'),
          ip: '192.168.1.1',
          location: 'San Francisco, CA',
          device: 'Chrome on Windows',
        },
        {
          date: new Date('2024-01-19'),
          ip: '192.168.1.2',
          location: 'San Francisco, CA',
          device: 'Safari on iPhone',
        },
      ],
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  };

  res.render('profile/index', {
    title: 'Profile - LicenseChain',
    user,
    profile,
  });
});

// Update profile
router.put('/', requireAuth, async (req, res) => {
  try {
    const { name, company, phone, address, website, bio } = req.body;
    const user = req.session.user;

    // Mock profile update - in production, this would update the database
    req.session.user = {
      ...user,
      name: name || user.name,
      company: company || user.company,
    };

    req.flash('success', 'Profile updated successfully!');
    res.redirect('/profile');
  } catch (error) {
    console.error('Profile update error:', error);
    req.flash('error', 'An error occurred while updating your profile');
    res.redirect('/profile');
  }
});

// Change password
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (newPassword !== confirmPassword) {
      req.flash('error', 'New passwords do not match');
      return res.redirect('/profile');
    }

    if (newPassword.length < 8) {
      req.flash('error', 'New password must be at least 8 characters long');
      return res.redirect('/profile');
    }

    // Mock password change - in production, this would verify current password and update
    req.flash('success', 'Password changed successfully!');
    res.redirect('/profile');
  } catch (error) {
    console.error('Password change error:', error);
    req.flash('error', 'An error occurred while changing your password');
    res.redirect('/profile');
  }
});

// Update preferences
router.post('/preferences', requireAuth, (req, res) => {
  try {
    const { notifications, marketing, security } = req.body;
    
    // Mock preferences update - in production, this would update the database
    req.flash('success', 'Preferences updated successfully!');
    res.redirect('/profile');
  } catch (error) {
    console.error('Preferences update error:', error);
    req.flash('error', 'An error occurred while updating your preferences');
    res.redirect('/profile');
  }
});

// Enable two-factor authentication
router.post('/2fa/enable', requireAuth, (req, res) => {
  try {
    // Mock 2FA setup - in production, this would generate QR code and secret
    const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/LicenseChain:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=LicenseChain';
    
    req.flash('success', 'Two-factor authentication enabled successfully!');
    res.redirect('/profile');
  } catch (error) {
    console.error('2FA enable error:', error);
    req.flash('error', 'An error occurred while enabling two-factor authentication');
    res.redirect('/profile');
  }
});

// Disable two-factor authentication
router.post('/2fa/disable', requireAuth, (req, res) => {
  try {
    // Mock 2FA disable - in production, this would disable 2FA
    req.flash('success', 'Two-factor authentication disabled successfully!');
    res.redirect('/profile');
  } catch (error) {
    console.error('2FA disable error:', error);
    req.flash('error', 'An error occurred while disabling two-factor authentication');
    res.redirect('/profile');
  }
});

// Delete account
router.delete('/', requireAuth, async (req, res) => {
  try {
    const { confirmEmail } = req.body;
    const user = req.session.user;

    if (confirmEmail !== user.email) {
      req.flash('error', 'Email confirmation does not match');
      return res.redirect('/profile');
    }

    // Mock account deletion - in production, this would delete the account
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      req.flash('success', 'Account deleted successfully');
      res.redirect('/');
    });
  } catch (error) {
    console.error('Account deletion error:', error);
    req.flash('error', 'An error occurred while deleting your account');
    res.redirect('/profile');
  }
});

module.exports = router;
