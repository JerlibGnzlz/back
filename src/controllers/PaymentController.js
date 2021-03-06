const { Order, OrderItem, User } = require("../db");

class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      // console.log(req)
      const payment = await this.subscriptionService.createPayment(req);
      console.log(payment);
      let user = await User.findOne({ where: { email: req.body.user } });
      let order = await Order.create({
        state: "pending",
        total: payment[1],
        userId: user.id,
      });
      await req.body.product.map(async (p) => {
        await OrderItem.create({
          orderId: order.id,
          productId: p.id,
          quantity: p.quantity,
        });
      });
      // console.log(order)
      // console.log(await OrderItem.findAll())
      return res.json(payment[0]);
    } catch (err) {
      console.log(err);

      return res.status(500).json({ error: true, msg: err });
    }
  }
}

module.exports = PaymentController;
