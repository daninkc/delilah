module.exports = (sequelize, type) => {
    return sequelize.define('products_orders', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
}