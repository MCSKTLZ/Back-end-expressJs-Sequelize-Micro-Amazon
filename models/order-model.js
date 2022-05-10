const orderModel = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        total: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Order
}

module.exports = orderModel