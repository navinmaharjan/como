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
};

const getAllProducts = async (req, res) => {
    try {
        const totalCount = await Product.find().countDocuments()
        const skipCount = (req.query.page - 1) * req.query.limit
        const data = await Product.find().limit(req.query.limit).skip(skipCount)
        res.json({ data, totalCount })

    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};


module.exports = { addNewProduct, getAllProducts }