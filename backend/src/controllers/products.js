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
        const { page, limit, category } = req.query
        let query = {}
        if (category) {
            if (!['Men', 'Women', 'Kids'].includes(category)) {
                return res.status(400).json({ message: 'Invalid category' });
            }
            query.productCategory = category
        }
        const totalCount = await Product.countDocuments(query)
        const skipCount = (page - 1) * limit
        const data = await Product.find(query).limit(limit).skip(skipCount)
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



// const getAllProducts = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, category, sortBy = 'productName', order = 'asc' } = req.query;

//         // Build the query
//         let query = {};
//         if (category) {
//             if (!['Men', 'Women', 'Kids'].includes(category)) {
//                 return res.status(400).json({ message: 'Invalid category' });
//             }
//             query.productCategory = category;
//         }

//         // Build the sort options
//         let sort = {};
//         sort[sortBy] = order === 'desc' ? -1 : 1;

//         // Calculate pagination
//         const skipCount = (page - 1) * limit;

//         // Get total count
//         const totalCount = await Product.countDocuments(query);

//         // Fetch products
//         const data = await Product.find(query)
//             .sort(sort)
//             .limit(parseInt(limit))
//             .skip(skipCount);

//         // Prepare pagination info
//         const totalPages = Math.ceil(totalCount / limit);
//         const hasNextPage = page < totalPages;
//         const hasPrevPage = page > 1;

//         res.json({
//             data,
//             totalCount,
//             currentPage: parseInt(page),
//             totalPages,
//             hasNextPage,
//             hasPrevPage,
//             limit: parseInt(limit)
//         });

//     } catch (error) {
//         console.error('Error retrieving products:', error);
//         res.status(500).json({ message: 'Error retrieving products', error: error.message });
//     }
// };
