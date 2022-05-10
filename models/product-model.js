const productModel = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: { 
            type : DataTypes.STRING,
            allowNull: false
        },
        stock : {
            type : DataTypes.STRING,
            allowNull: false
        }
    })

    return Product
}

module.exports = productModel