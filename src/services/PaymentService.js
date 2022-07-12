const axios = require("axios");
require("dotenv").config();
const { ACCESS_TOKEN, CORS_URL } = process.env;

class PaymentService {
  async createPayment(req) {
    // let total = 0
    const items = req.body.product.map((i) => {
      // total = total + (i.price * i.quantity);
      return {
        title: i.name,
        description: i.description,
        picture_url: i.image[0],
        category_id: "cat123",
        currency_id: "USD",
        quantity: i.quantity,
        unit_price: parseFloat(i.price),
      };
    });

    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: "test_user_14959901@testuser.com",
      items: items,
      back_urls: {
        success: `${CORS_URL}/products`,
        failure: `${CORS_URL}/products`,
        pending: `${CORS_URL}/products`,
      },
      auto_return: "approved",
      payment_methods: {
        installments: 1,
      },
    };
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }
}

module.exports = PaymentService;
