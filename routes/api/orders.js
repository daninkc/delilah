const router = require('express').Router();
const { Order} = require('../../db_queries');
const { productOrderModel } = require('../../db_queries')
const middlewares = require('../middlewares');

router.get('/', async (req, res) => {
    const orders = await Order.findAll({
    include: productOrderModel,
    as: 'product_order'
}    ).then(orders => {
        if (orders.length === 0) {
            res.status(404).json('No orders in the database')
        }
        res.status(200).json(orders);
    })
})

router.post('/', async (req, res) => {
    const order = await Order.create(req.body);
    res.status(200).json(order);
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
