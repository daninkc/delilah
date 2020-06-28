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

// Relación Order => User
Order.belongsTo(User, {
    foreignKey: 'cod_user'    
  });
  User.hasMany(Order, {
    foreignKey: 'cod_user'
  });
  
  // Relación Order => Order_item <= Product
  Product.belongsToMany(Order, {
    through: ProductOrder, 
    foreignKey: 'cod_product'
  });
  Order.belongsToMany(Product, {
    through: ProductOrder, 
    foreignKey: 'cod_order'
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
