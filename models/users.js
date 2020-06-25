module.exports = (sequelize, type) => {
    return sequelize.define('user',
    {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
        name_lastName: type.STRING,
        email: type.STRING,
        phone_number: type.STRING,
        address: type.STRING,
        adminStatus: type.INTEGER
    });
}