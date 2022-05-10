const express = require("express")
const router = express.Router()
const roleControlller = require("../controllers/role-controller")
const authController = require("../controllers/auth-controller")


router.post("/", roleControlller.createRole)
// router.get("/:id", usersController.getOne)
// router.post("/", usersController.newUser)
// router.post("/login", authController.signIn)
// router.patch("/:id", usersController.update)
// router.delete("/:id", usersController.delete)


module.exports = router
