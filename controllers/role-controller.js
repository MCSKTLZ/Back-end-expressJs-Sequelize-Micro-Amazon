const dbConnector = require("../models/dbc").get()

exports.createRole = (req, res, next) => {
    dbConnector.Role.create({role : req.body.role})
    res.write(JSON.stringify({Message :  `${req.body.role} inserted` }))
    res.end()
}