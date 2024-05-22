const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class Paymob {
    constructor(apiKey, region, iframeId) {
        this.apiKey = apiKey;
        this.baseUrl = `https://${region}.paymob.com/api`;
        this.iframeId = iframeId;
    }

    async getToken() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/tokens`, {
                api_key: this.apiKey
            });
            return response.data.token;
        } catch (error) {
            console.error('Error retrieving token:', error);
            throw error;
        }
    }

    async processPayment(authToken, billingData, amountCents, currency, integrationId) {
        try {
            const merchantOrderId = uuidv4();
            const orderResponse = await axios.post(`${this.baseUrl}/ecommerce/orders`, {
                auth_token: authToken,
                delivery_needed: 'false',
                amount_cents: amountCents,
                currency: currency,
                merchant_order_id: merchantOrderId,
                items: [],
            });

            if (orderResponse.data && orderResponse.data.id) {
                const paymentRequestResponse = await axios.post(`${this.baseUrl}/acceptance/payment_keys`, {
                    auth_token: authToken,
                    amount_cents: amountCents,
                    expiration: 3600,
                    order_id: orderResponse.data.id,
                    billing_data: billingData,
                    currency: currency,
                    integration_id: integrationId
                });

                return {
                    url: `${this.baseUrl}/acceptance/iframes/${this.iframeId}?payment_token=${paymentRequestResponse.data.token}`,
                    payment_token: paymentRequestResponse.data.token
                };
            } else {
                throw new Error('Failed to create order');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            throw error;
        }
    }

    async getTransactionDetails(token, transactionId) {
        try {
            const response = await axios.get(`${this.baseUrl}/acceptance/transactions/${transactionId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error retrieving transaction details:', error);
            throw error;
        }
    }
}

module.exports = Paymob;
