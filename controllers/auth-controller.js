const dbConnector = require("../models/dbc").get()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");

exports.signIn = async (req, res, next) => {
    const user = await dbConnector.User.findOne({where : {pseudo : req.body.pseudo}})
    if(user) {
        const passwordIsValid = bcrypt.compareSync(
            req.body.password.trim(),
            user.password);
        if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
            }); 
        const role = await user.getRole() 
        res.status(200).send({
            id: user.id,
            username: user.pseudo,
            accessToken: token,
            role : role.role
        });
        res.end() 
        
    } else {
        res.status(401).send({
            message : "User not found"
        })
    }
}