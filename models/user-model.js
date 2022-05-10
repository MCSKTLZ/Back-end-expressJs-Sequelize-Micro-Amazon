const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })

    return User
}

module.exports = userModel