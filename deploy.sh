#!/bin/bash

# LicenseChain Customer Panel Deployment Script
# This script builds and deploys the Customer Panel

set -e

echo "🚀 Starting LicenseChain Customer Panel deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests (if available)
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    echo "🧪 Running tests..."
    npm test
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p public/css
mkdir -p public/js
mkdir -p public/images

# Create basic CSS file if it doesn't exist
if [ ! -f "public/css/style.css" ]; then
    echo "🎨 Creating basic CSS file..."
    cat > public/css/style.css << 'EOF'
/* LicenseChain Customer Panel Styles */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.card {
    transition: transform 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-2px);
}

.status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
}

.status-active {
    background-color: #dcfce7;
    color: #166534;
}

.status-expired {
    background-color: #fef3c7;
    color: #92400e;
}

.status-suspended {
    background-color: #fee2e2;
    color: #991b1b;
}
EOF
fi

# Create basic JavaScript file if it doesn't exist
if [ ! -f "public/js/app.js" ]; then
    echo "⚡ Creating basic JavaScript file..."
    cat > public/js/app.js << 'EOF'
// LicenseChain Customer Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Auto-hide alerts after 5 seconds
    setTimeout(function() {
        var alerts = document.querySelectorAll('.alert');
        alerts.forEach(function(alert) {
            var bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        });
    }, 5000);
});
EOF
fi

# Set permissions
chmod +x src/index.js

echo "✅ Build completed successfully"

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating environment file..."
    cat > .env << 'EOF'
NODE_ENV=production
PORT=3003
SESSION_SECRET=your-secret-key-change-this
CORS_ORIGINS=http://localhost:3000,https://licensechain.app
EOF
    echo "⚠️  Please update the .env file with your actual configuration"
fi

echo "🎉 LicenseChain Customer Panel deployment completed successfully!"
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "To start with PM2:"
echo "  npm install -g pm2"
echo "  pm2 start src/index.js --name customer-panel"
echo ""
echo "Application will be available at: http://localhost:3003"
echo "Health check: http://localhost:3003/health"
