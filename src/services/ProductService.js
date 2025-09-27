const axios = require('axios');

class ProductService {
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

    async createProduct(name, description, price, currency, metadata = {}) {
        try {
            const response = await this.client.post('/products', {
                name,
                description,
                price,
                currency,
                metadata
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getProduct(productId) {
        try {
            const response = await this.client.get(`/products/${productId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateProduct(productId, updates) {
        try {
            const response = await this.client.put(`/products/${productId}`, updates);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async deleteProduct(productId) {
        try {
            await this.client.delete(`/products/${productId}`);
            return { success: true };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async listProducts(page = 1, limit = 10) {
        try {
            const response = await this.client.get('/products', {
                params: {
                    page,
                    limit
                }
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getProductStats() {
        try {
            const response = await this.client.get('/products/stats');
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

module.exports = ProductService;
