const express = require('express')
const router = express.Router()
const { addNewProduct, getAllProducts, updateProduct, deleteProduct} = require('../controllers/products')

router.post('/addProduct', addNewProduct)
router.get('/products', getAllProducts)
router.patch('/products/:productId', updateProduct)
router.delete('/products/:productId', deleteProduct)

module.exports = router