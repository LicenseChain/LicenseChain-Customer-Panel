const axios = require('axios');

class LicenseService {
    constructor(apiKey, baseUrl = 'https://api.licensechain.app') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'X-API-Version': '1.0',
                'X-Platform': 'customer-panel'
            },
            timeout: 30000
        });
    }

    async createLicense(userId, productId, metadata = {}) {
        try {
            const response = await this.client.post('/licenses', {
                user_id: userId,
                product_id: productId,
                metadata
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getLicense(licenseId) {
        try {
            const response = await this.client.get(`/licenses/${licenseId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateLicense(licenseId, updates) {
        try {
            const response = await this.client.put(`/licenses/${licenseId}`, updates);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async revokeLicense(licenseId) {
        try {
            await this.client.delete(`/licenses/${licenseId}`);
            return { success: true };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async validateLicense(licenseKey) {
        try {
            const response = await this.client.post('/licenses/validate', {
                license_key: licenseKey
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async listUserLicenses(userId, page = 1, limit = 10) {
        try {
            const response = await this.client.get('/licenses', {
                params: {
                    user_id: userId,
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getLicenseStats() {
        try {
            const response = await this.client.get('/licenses/stats');
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            const { status, data } = error.response;
            return {
                status,
                message: data.error || data.message || 'An error occurred',
                details: data
            };
        } else if (error.request) {
            return {
                status: 0,
                message: 'Network error - unable to reach the server',
                details: error.message
            };
        } else {
            return {
                status: 0,
                message: 'An unexpected error occurred',
                details: error.message
            };
        }
    }
}

module.exports = LicenseService;
