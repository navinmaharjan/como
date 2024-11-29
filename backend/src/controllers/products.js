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

const updateProduct = async (req, res) => {
    try {
        const newProductData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            newProductData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ updatedProduct, msg: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productToDelete = await Product.findByIdAndDelete(req.params.productId)
        if (!productToDelete) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }

}


module.exports = { addNewProduct, getAllProducts, updateProduct, deleteProduct }