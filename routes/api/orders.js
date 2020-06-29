const router = require('express').Router();
const { Order, ProductOrder, User, Product } = require('../../db_queries');
const middlewares = require('../middlewares');

router.get('/', async (req, res) => {
    const orders = await Order.findAll({
        include: [
            {
                model: User
            },
           {
               model: Product
           }]
}    ).then(orders => {
        if (orders.length === 0) {
            res.status(404).json('No orders in the database')
        }
        res.status(200).json(orders);
    })
})

router.post('/',
middlewares.checkToken,
async (req, res) => {
    const order_items = req.body.order_items;
    try {
    var order = await Order.create({ 
        userfk: payload.userID,
        description: req.body.description,
        total_price: req.body.total_price,
    }).then((data)=>{
        order_items.forEach((item) =>{
                var item_order = ProductOrder.create({
                    orderfk: data.order_id,
                    productfk: item.productfk,
                    quantity: item.quantity,
                    price: item.price
                })
            })    
    res.status(200).json(data);
    console.log(item.productfk);
});
}
catch {
    res.status(400).json({ error: 'Something went wrong. Please make sure to have your user registered and products for all IDs' })
}
});


router.get('/:orderID',
middlewares.checkToken,
 async (req, res) => {
    const orderById = await Order.findAll({
        where: {
            id: req.params.orderID
        }
    });
    res.status(200).json(orderById)
});

router.put('/:orderID',
middlewares.checkToken,
middlewares.checkAdminStatus,
 async (req, res) => {
    await Order.update(req.body, {
        where: {
            id: req.params.orderID
        }
    });
    res.status(200).json({ success: 'The order was modified correctly!'});
});

router.delete('/:orderID',
middlewares.checkToken,
middlewares.checkAdminStatus,
async (req, res) => {
    await Order.destroy({
        where: { id: req.params.orderID }
    });
    res.status(200).json({ success: 'Order was deleted' });
});

module.exports = router;