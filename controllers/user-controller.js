const dbConnector = require("../models/dbc").get()
const bcrypt = require("bcryptjs");


exports.getAll = (req, res, next) => {
    dbConnector.User.findAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err);
            res.json(err)
        })
}

exports.newUser = async (req, res, next) => {
    try {
        if(!req.body.pseudo || !req.body.password) {
            return res.status(400).json({
                message : "Please insert a pseudo and a password"
            })
        }
        let newUser = {}
        const user = await dbConnector.User.findOne({where : {pseudo : req.body.pseudo}})
        if(user) {
            return res.status(400).json({
                message : "Pseudo already exist"
            })
        } else {
                if(req.body.role){
                    const role = await dbConnector.Role.findOne({ where: { role: req.body.role } })
                        newUser = {
                            pseudo : req.body.pseudo,
                            password : bcrypt.hashSync(req.body.password.trim(), 10),
                            RoleId : role.id
                        }
                } else {
                        const userRole = await dbConnector.Role.findOne({ where: { role : "user" } })
                        newUser = {
                            pseudo : req.body.pseudo,
                            password : bcrypt.hashSync(req.body.password.trim(), 10),
                            RoleId : userRole.id
                        }
                }
        dbConnector.User.create(newUser)
            .then((response)=> {
                res.status(201).json({
                    message: 'User successfully created!',
                    result: response,
                })
            })
        }
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}

exports.getUserByName = async (req, res, next) => {
    try {
        let user = await dbConnector.User.findOne({where : {pseudo : req.params.name}})
        let role = await user.getRole()
        let order = await user.getOrders()
        let newData = {pseudo : user.pseudo,
                        createdAt : user.createdAt,
                        updatedAt : user.updatedAt,
                        role : role.role,
                        orders : order.map(e => e.toJSON())
                        }
        res.json(newData)
    } catch (err) {
        res.json(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const delUser = await dbConnector.User.destroy({where : {pseudo : req.params.name}})
        if(delUser) {
            res.write(JSON.stringify({Message :  `User ${req.params.name} deleted` }))
            res.end()
        } else {
            res.write(JSON.stringify({Message :  `User ${req.params.name} not found` }))
            res.end()
        }
        
    } catch(err) {
        res.json(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await dbConnector.User.findOne({where : {pseudo : req.params.name}})
        if(user) {
            if(req.body.password) {
                return res.status(403).send({
                    message : "Can't change password"
                })
            } 
            user.update(req.body)
            res.write(JSON.stringify({Message :  `User ${req.params.name} updated` }))
            res.end()
        } else {
            res.write(JSON.stringify({Message :  `User ${req.params.name} not found` }))
            res.end()
        }
    } catch (err) {
        res.json(err)
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const user = await dbConnector.User.findOne({where : {pseudo : req.params.name}})
        if(user) {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password.trim(),
                user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            if(req.body.newPassword != req.body.newPasswordRepeat) {
                res.status(401).send({
                    message: `Repeated password is not te same`
                })
            } else if (req.body.newPassword == "") {
                res.status(401).send({
                    message: "Password cannot be empty!"
                })
            } else {
                const newPassword = bcrypt.hashSync(req.body.newPassword.trim(), 10)
                await user.update({password : newPassword})
                res.status(201).send({
                    message: "Password changed!"
                })
            }
        }
        else {
            res.write(JSON.stringify({Message :  `User ${req.params.name} not found` }))
            res.end()
        }
    } catch (err) {
        res.json(err)
    }
}