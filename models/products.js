//this module defines sequelize for the product table

module.exports = (sequelize, type) => {
    return sequelize.define('product',
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        price: type.DOUBLE
    })
}

