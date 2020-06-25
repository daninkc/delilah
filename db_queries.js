const Sequelize = require('sequelize');

const productModel = require('./models/products');
const userModel = require('./models/users');
const orderModel = require('./models/orders');
const productOrderModel = require('./models/products_orders');

const sequelize = new Sequelize(
    'ei1GBJjAJJ',
    'ei1GBJjAJJ',
    '5vHkoxbnfe',
{
    host: 'remotemysql.com',
    dialect: 'mysql'
});

const Product = productModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const ProductOrder = productOrderModel(sequelize, Sequelize);

Product.belongsToMany(Order, {
    through: ProductOrder,
    foreignKey: 'productID',
    otherKey: 'orderID'
});

Order.belongsToMany(Product, {
    through: ProductOrder,
    foreignKey: 'orderID',
    otherKey: 'productID'
});

User.hasMany(Order, {
    foreignKey: 'user_has_order'
});

Order.belongsTo(User, {
    foreignKey: 'order_belongsto_user'
});

sequelize.sync({ force: false})
.then(() => {
    console.log('Tablas sincronizadas')
});

module.exports = {
    Product,
    User,
    Order,
    ProductOrder
}
