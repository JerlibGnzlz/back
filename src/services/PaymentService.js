const axios = require("axios");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

class PaymentService {
  async createPayment(req) {
    //MANEJAR EXCEPCIONES CON TRY CATCH PARA VER DETALLE EN CASO DE ERROR
    const items = req.body.product.map((i) => {
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
      auto_return: "approved",
      payer_email: "test_user_14959901@testuser.com",
      items: items,
      back_urls: {
        success: "https://fs-store-pi.vercel.app/products",
        failure: "/failure",
        pending: "/pending",
      },
      payment_methods: {
        installments: 1,
      },
      notification_url: "http://www.your-site.com/ipn",
    };
    //console.log("llegue hasta aca")
    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    console.log(payment.data, "este es el pago!");
    return payment.data;
  }
}

module.exports = PaymentService;
