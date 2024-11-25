const express = require('express')
const router = express.Router()
const { addNewProduct, getAllProducts, updateProduct} = require('../controllers/products')

router.post('/addProduct', addNewProduct)
router.get('/products', getAllProducts)
router.patch('/products/:productId', updateProduct)

module.exports = router