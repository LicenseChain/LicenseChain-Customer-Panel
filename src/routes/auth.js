/**
 * Authentication routes
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('auth/login', {
    title: 'Login - LicenseChain',
  });
});

// Login POST
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock user authentication - in production, this would query the database
    const users = [
      {
        id: 'user_123',
        email: 'customer@example.com',
        password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/5.8.2.', // hashed 'password123'
        name: 'John Doe',
        company: 'Acme Corp',
        role: 'customer',
      },
    ];

    const user = users.find(u => u.email === email);
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/auth/login');
    }

    // Set session
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      company: user.company,
      role: user.role,
    };

    req.flash('success', 'Welcome back!');
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'An error occurred during login');
    res.redirect('/auth/login');
  }
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('auth/register', {
    title: 'Register - LicenseChain',
  });
});

// Register POST
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, company } = req.body;

    // Validation
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/auth/register');
    }

    if (password.length < 8) {
      req.flash('error', 'Password must be at least 8 characters long');
      return res.redirect('/auth/register');
    }

    // Mock user creation - in production, this would save to database
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      company,
      role: 'customer',
    };

    // Set session
    req.session.user = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      company: newUser.company,
      role: newUser.role,
    };

    req.flash('success', 'Account created successfully!');
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Registration error:', error);
    req.flash('error', 'An error occurred during registration');
    res.redirect('/auth/register');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Forgot password page
router.get('/forgot-password', (req, res) => {
  res.render('auth/forgot-password', {
    title: 'Forgot Password - LicenseChain',
  });
});

// Forgot password POST
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  
  // Mock password reset - in production, this would send an email
  req.flash('success', 'If an account with that email exists, we have sent a password reset link.');
  res.redirect('/auth/login');
});

// Reset password page
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  res.render('auth/reset-password', {
    title: 'Reset Password - LicenseChain',
    token,
  });
});

// Reset password POST
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect(`/auth/reset-password/${token}`);
    }

    if (password.length < 8) {
      req.flash('error', 'Password must be at least 8 characters long');
      return res.redirect(`/auth/reset-password/${token}`);
    }

    // Mock password reset - in production, this would update the database
    req.flash('success', 'Password reset successfully!');
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Password reset error:', error);
    req.flash('error', 'An error occurred during password reset');
    res.redirect('/auth/login');
  }
});

module.exports = router;
