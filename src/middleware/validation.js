const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

const validateEmail = () => {
    return body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address');
};

const validatePassword = () => {
    return body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number');
};

const validateName = () => {
    return body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces');
};

const validateLicenseKey = () => {
    return body('licenseKey')
        .isLength({ min: 32, max: 32 })
        .withMessage('License key must be exactly 32 characters long')
        .matches(/^[A-Z0-9]+$/)
        .withMessage('License key can only contain uppercase letters and numbers');
};

const validateUuid = (field) => {
    return body(field)
        .isUUID()
        .withMessage(`${field} must be a valid UUID`);
};

const validateAmount = () => {
    return body('amount')
        .isFloat({ min: 0 })
        .withMessage('Amount must be a positive number');
};

const validateCurrency = () => {
    return body('currency')
        .isIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY'])
        .withMessage('Currency must be one of: USD, EUR, GBP, CAD, AUD, JPY, CHF, CNY');
};

const validatePage = () => {
    return body('page')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Page must be a number between 1 and 100');
};

const validateLimit = () => {
    return body('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be a number between 1 and 50');
};

const validateMetadata = () => {
    return body('metadata')
        .optional()
        .isObject()
        .withMessage('Metadata must be an object');
};

const validateProductName = () => {
    return body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Product name must be between 2 and 100 characters long');
};

const validateProductDescription = () => {
    return body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Product description must be less than 500 characters');
};

const validateProductPrice = () => {
    return body('price')
        .isFloat({ min: 0 })
        .withMessage('Product price must be a positive number');
};

const validateWebhookUrl = () => {
    return body('url')
        .isURL()
        .withMessage('Webhook URL must be a valid URL');
};

const validateWebhookEvents = () => {
    return body('events')
        .isArray({ min: 1 })
        .withMessage('Events must be a non-empty array')
        .custom((events) => {
            const validEvents = [
                'license.created',
                'license.updated',
                'license.revoked',
                'license.expired',
                'user.created',
                'user.updated',
                'user.deleted',
                'product.created',
                'product.updated',
                'product.deleted',
                'payment.completed',
                'payment.failed',
                'payment.refunded'
            ];
            
            for (const event of events) {
                if (!validEvents.includes(event)) {
                    throw new Error(`Invalid event: ${event}`);
                }
            }
            return true;
        });
};

const validateLogin = () => {
    return [
        validateEmail(),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
        handleValidationErrors
    ];
};

const validateRegister = () => {
    return [
        validateEmail(),
        validatePassword(),
        validateName(),
        handleValidationErrors
    ];
};

const validateLicenseCreate = () => {
    return [
        validateUuid('userId'),
        validateUuid('productId'),
        validateMetadata(),
        handleValidationErrors
    ];
};

const validateLicenseUpdate = () => {
    return [
        validateUuid('licenseId'),
        body('status').optional().isIn(['active', 'inactive', 'expired', 'revoked']),
        validateMetadata(),
        handleValidationErrors
    ];
};

const validateProductCreate = () => {
    return [
        validateProductName(),
        validateProductDescription(),
        validateProductPrice(),
        validateCurrency(),
        validateMetadata(),
        handleValidationErrors
    ];
};

const validateProductUpdate = () => {
    return [
        validateUuid('productId'),
        validateProductName().optional(),
        validateProductDescription().optional(),
        validateProductPrice().optional(),
        validateCurrency().optional(),
        validateMetadata().optional(),
        handleValidationErrors
    ];
};

const validateWebhookCreate = () => {
    return [
        validateWebhookUrl(),
        validateWebhookEvents(),
        body('secret').optional().isString(),
        handleValidationErrors
    ];
};

module.exports = {
    handleValidationErrors,
    validateEmail,
    validatePassword,
    validateName,
    validateLicenseKey,
    validateUuid,
    validateAmount,
    validateCurrency,
    validatePage,
    validateLimit,
    validateMetadata,
    validateProductName,
    validateProductDescription,
    validateProductPrice,
    validateWebhookUrl,
    validateWebhookEvents,
    validateLogin,
    validateRegister,
    validateLicenseCreate,
    validateLicenseUpdate,
    validateProductCreate,
    validateProductUpdate,
    validateWebhookCreate
};
