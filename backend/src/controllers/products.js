const Product = require('../models/products')

const addNewProduct = async (req, res) => {
    try {
        await Product.create(req.body)
        res.status(201).json({
            msg: 'Product added successfully'
        })
    } catch (error) {
        console.error('Error adding new product:', error);
        res.status(500).json({ message: 'Error adding new product', error: error.message });
    }
}

module.exports = { addNewProduct }