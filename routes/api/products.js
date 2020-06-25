const router = require('express').Router();
const { Product } = require('../../db_queries');
const middlewares = require('../middlewares');


router.get('/', 
middlewares.checkToken,
async (req, res) => {
    const products = await Product.findAll();
    if (products.length === 0) {
        res.status(404).json('No products in the database')
    }
    res.status(200).json(products);
});

router.post('/',
middlewares.checkToken,
middlewares.checkAdminStatus,
async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

router.get('/:productID',
middlewares.checkToken,
 async (req, res) => {
    const productById = await Product.findAll({
        where: {
            id: req.params.productID
        }
    });
    res.status(200).json(productById)
});

router.put('/:productID',
middlewares.checkToken,
middlewares.checkAdminStatus,
 async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productID }
    });
    res.status(200).json({ success: 'Product was modified' });
});

router.delete('/:productID',
middlewares.checkToken,
middlewares.checkAdminStatus,
async (req, res) => {
    await Product.destroy({
        where: { id: req.params.productID }
    });
    res.status(200).json({ success: 'Product was deleted' });
});

module.exports = router;

