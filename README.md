# LicenseChain Customer Panel

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-3.1+-green.svg)](https://ejs.co/)

Official Customer Panel for LicenseChain - Web interface for license management and customer support.

## 🚀 Features

- **🔐 User Authentication** - Secure login and registration system
- **📜 License Management** - View, validate, and manage licenses
- **👤 Profile Management** - Update user profile and settings
- **📊 Analytics Dashboard** - View usage statistics and analytics
- **🎫 Support System** - Create and manage support tickets
- **🔔 Notifications** - Real-time notifications and alerts
- **📱 Responsive Design** - Mobile-friendly interface
- **🛠️ Easy Integration** - Simple setup and configuration

## 📦 Installation

### Method 1: npm (Recommended)

```bash
# Clone the repository
git clone https://github.com/LicenseChain/LicenseChain-Customer-Panel.git
cd LicenseChain-Customer-Panel

# Install dependencies
npm install

# Start the application
npm start
```

### Method 2: Docker

```bash
# Build the Docker image
docker build -t licensechain-customer-panel .

# Run the container
docker run -p 3000:3000 licensechain-customer-panel
```

### Method 3: Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/LicenseChain/LicenseChain-Customer-Panel/releases)
2. Extract to your project directory
3. Install dependencies: `npm install`
4. Configure environment variables
5. Start the application: `npm start`

## 🚀 Quick Start

### Basic Setup

```bash
# Clone the repository
git clone https://github.com/LicenseChain/LicenseChain-Customer-Panel.git
cd LicenseChain-Customer-Panel

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Start the application
npm start
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# LicenseChain API
LICENSECHAIN_API_KEY=your-api-key
LICENSECHAIN_APP_NAME=your-app-name
LICENSECHAIN_APP_VERSION=1.0.0
LICENSECHAIN_BASE_URL=https://api.licensechain.com

# Database Configuration
DATABASE_URL=your-database-url

# Session Configuration
SESSION_SECRET=your-session-secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
JWT_SECRET=your-jwt-secret
BCRYPT_ROUNDS=12
```

## 📚 API Reference

### Routes

#### Authentication Routes

```javascript
// Register a new user
POST /auth/register
{
  "username": "string",
  "email": "string",
  "password": "string"
}

// Login user
POST /auth/login
{
  "username": "string",
  "password": "string"
}

// Logout user
POST /auth/logout

// Get current user
GET /auth/me
```

#### License Routes

```javascript
// Get user's licenses
GET /licenses

// Validate a license
POST /licenses/validate
{
  "licenseKey": "string"
}

// Get license details
GET /licenses/:id

// Update license
PUT /licenses/:id
{
  "status": "string",
  "features": ["string"]
}
```

#### Profile Routes

```javascript
// Get user profile
GET /profile

// Update user profile
PUT /profile
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string"
}

// Change password
PUT /profile/password
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

#### Support Routes

```javascript
// Get support tickets
GET /support/tickets

// Create support ticket
POST /support/tickets
{
  "subject": "string",
  "description": "string",
  "priority": "string"
}

// Get ticket details
GET /support/tickets/:id

// Update ticket
PUT /support/tickets/:id
{
  "status": "string",
  "response": "string"
}
```

#### Analytics Routes

```javascript
// Get usage analytics
GET /analytics/usage

// Get license analytics
GET /analytics/licenses

// Get performance metrics
GET /analytics/performance
```

## 🔧 Configuration

### Application Settings

Configure the application through environment variables or a configuration file:

```javascript
// config/index.js
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  licensechain: {
    apiKey: process.env.LICENSECHAIN_API_KEY,
    appName: process.env.LICENSECHAIN_APP_NAME,
    version: process.env.LICENSECHAIN_APP_VERSION,
    baseUrl: process.env.LICENSECHAIN_BASE_URL
  },
  database: {
    url: process.env.DATABASE_URL
  },
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};
```

### Database Configuration

The application supports multiple database types:

```javascript
// PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/licensechain

// MySQL
DATABASE_URL=mysql://username:password@localhost:3306/licensechain

// SQLite
DATABASE_URL=sqlite://./database.sqlite
```

### Email Configuration

Configure SMTP settings for email notifications:

```javascript
// config/email.js
module.exports = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
```

## 🛡️ Security Features

### Authentication

- Secure password hashing with bcrypt
- JWT token-based authentication
- Session management with secure cookies
- Password strength validation

### Authorization

- Role-based access control
- Route-level permissions
- API endpoint protection
- CSRF protection

### Data Protection

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Secure headers

## 📊 Analytics and Monitoring

### Usage Analytics

```javascript
// Track user actions
app.use((req, res, next) => {
  analytics.track('page_view', {
    page: req.path,
    user: req.user?.id,
    timestamp: new Date()
  });
  next();
});
```

### Performance Monitoring

```javascript
// Monitor response times
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.record('response_time', duration);
  });
  next();
});
```

### Error Tracking

```javascript
// Track errors
app.use((err, req, res, next) => {
  errorTracker.captureException(err, {
    user: req.user?.id,
    url: req.url,
    method: req.method
  });
  next(err);
});
```

## 🔄 Error Handling

### Custom Error Types

```javascript
// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}
```

### Error Middleware

```javascript
// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString()
    }
  });
});
```

## 🧪 Testing

### Unit Tests

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Integration Tests

```bash
# Test with real database
npm run test:integration
```

### End-to-End Tests

```bash
# Test complete user flows
npm run test:e2e
```

## 📝 Examples

See the `examples/` directory for complete examples:

- `basic-setup.js` - Basic application setup
- `custom-theme.js` - Custom theme configuration
- `api-integration.js` - API integration examples
- `deployment.js` - Deployment configuration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Clone the repository
2. Install Node.js 16 or later
3. Install dependencies: `npm install`
4. Set up environment variables
5. Start development server: `npm run dev`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [https://docs.licensechain.com/customer-panel](https://docs.licensechain.com/customer-panel)
- **Issues**: [GitHub Issues](https://github.com/LicenseChain/LicenseChain-Customer-Panel/issues)
- **Discord**: [LicenseChain Discord](https://discord.gg/licensechain)
- **Email**: support@licensechain.com

## 🔗 Related Projects

- [LicenseChain JavaScript SDK](https://github.com/LicenseChain/LicenseChain-JavaScript-SDK)
- [LicenseChain Node.js SDK](https://github.com/LicenseChain/LicenseChain-NodeJS-SDK)
- [LicenseChain Seller API](https://github.com/LicenseChain/LicenseChain-Seller-API)

---

**Made with ❤️ for the LicenseChain community**
