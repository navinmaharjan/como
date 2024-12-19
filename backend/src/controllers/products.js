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
        const { page, limit, category, sortBy } = req.query;

        let query = {};
        if (category) {
            if (!['Men', 'Women', 'Kids'].includes(category)) {
                return res.status(400).json({ message: 'Invalid category' });
            }
            query.productCategory = category;
        }

        let sort = {};
        if (sortBy === 'price-low-to-high') {
            sort.productSellPrice = 1;
        } else if (sortBy === 'price-high-to-low') {
            sort.productSellPrice = -1;
        } else if (sortBy === 'name-a-to-z') {
            sort.productName = 1;
        } else if (sortBy === 'name-z-to-a') {
            sort.productName = -1;
        }

        const totalCount = await Product.countDocuments(query);
        const skipCount = (page - 1) * limit;
        const data = await Product.find(query).sort(sort).limit(limit).skip(skipCount);

        res.json({ data, totalCount });
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



