const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || 
                     req.session?.token || 
                     req.cookies?.token;

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            error: 'Invalid token.' 
        });
    }
};

const optionalAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || 
                     req.session?.token || 
                     req.cookies?.token;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            req.user = decoded;
        }
        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

const adminAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || 
                     req.session?.token || 
                     req.cookies?.token;

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (!decoded.isAdmin) {
            return res.status(403).json({ 
                error: 'Access denied. Admin privileges required.' 
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ 
            error: 'Invalid token.' 
        });
    }
};

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user.id, 
            email: user.email, 
            name: user.name,
            isAdmin: user.isAdmin || false
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
        return null;
    }
};

module.exports = {
    authMiddleware,
    optionalAuth,
    adminAuth,
    generateToken,
    verifyToken
};
