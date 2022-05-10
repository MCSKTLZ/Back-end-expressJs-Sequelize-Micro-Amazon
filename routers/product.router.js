const express = require("express")
const router = express.Router()
const productController = require("../controllers/product-controller")


router.post("/new", productController.createProduct)
router.get("/", productController.getAllProduct)
router.patch("/:id", productController.updateProduct)


module.exports = router