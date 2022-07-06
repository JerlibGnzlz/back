const { Order, OrderItem, User } = require("../db");

class PaymentController {
    constructor(subscriptionService){
        this.subscriptionService = subscriptionService;
    }

    async getPaymentLink(req,res){
        try{
            const payment = await this.subscriptionService.createPayment(req);
            // let date = new Date()
            // date = `${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`
            // let user = await User.findOne({where:{email: req.body.user}})
            // let order = await Order.create({state:"pending", total:payment[1], userId:user.id, date:date})
            // await req.body.product.map(async p => {
            //         await OrderItem.create({orderId: order.id, productId: p.id, quantity: p.quantity})
            // })
            return res.json(payment);
        } catch (err){
            console.log(err);

            return res.status(500).json({error: true, msg: "Failed to create payment"})
        }
    }
}

module.exports = PaymentController;