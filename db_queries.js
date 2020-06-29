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

Order.belongsTo(User, {
    foreignKey: {
      name: 'userfk',
      onUpdate: 'CASCADE'    
      }
  });
  User.hasMany(Order, {
    foreignKey: {
      name: 'userfk',
      onUpdate: 'CASCADE'
    }
  });
  
  Product.belongsToMany(Order, {
    through: ProductOrder, 
    foreignKey: {
      name: 'productfk',
      onUpdate: 'CASCADE'
    }
  });
  Order.belongsToMany(Product, {
    through: ProductOrder, 
    foreignKey: {
      name: 'orderfk',
      onUpdate: 'CASCADE'
    } 
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
