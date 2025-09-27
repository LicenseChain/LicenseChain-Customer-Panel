const axios = require('axios');

class UserService {
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

    async createUser(email, name, metadata = {}) {
        try {
            const response = await this.client.post('/users', {
                email,
                name,
                metadata
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async getUser(userId) {
        try {
            const response = await this.client.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUser(userId, updates) {
        try {
            const response = await this.client.put(`/users/${userId}`, updates);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async deleteUser(userId) {
        try {
            await this.client.delete(`/users/${userId}`);
            return { success: true };
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async listUsers(page = 1, limit = 10) {
        try {
            const response = await this.client.get('/users', {
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

    async getUserStats() {
        try {
            const response = await this.client.get('/users/stats');
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

module.exports = UserService;
