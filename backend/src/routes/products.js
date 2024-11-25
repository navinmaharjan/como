const express = require('express')
const router = express.Router()
const { addNewProduct, getAllProducts} = require('../controllers/products')

router.post('/addProduct', addNewProduct)
router.get('/products', getAllProducts)

module.exports = router