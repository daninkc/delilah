module.exports = (sequelize, type) => {
    return sequelize.define('order',
    {
        order_id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: type.ENUM,
            values: ['Nuevo', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'],
            defaultValue: 'Nuevo'
        },
        description: type.STRING,
        total_price: type.INTEGER,
        payment_method: type.STRING,
    });
}