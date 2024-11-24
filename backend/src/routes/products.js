const express=require('express')
const router=express.Router()
const {addNewProduct} = require('../controllers/products')

router.post('/addProduct', addNewProduct)

module.exports=router