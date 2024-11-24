const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productCategory: {
        type: String,
        enum: ['Men', 'Women', 'Kids']
    },
    productSubcategory: {
        type: String,
        enum: ['Briefcase', 'Messenger', 'Backpack', 'Travel Bag', 'Rucksack', 'Handbag', 'Clutch', 'Tote', 'Shoulder Bag', 'School Bag', 'Lunch Bag', 'Mini Backpack', 'Crossbody Bag']
    },
    productSellPrice: Number,
    productCostPrice: Number,
    productImage: String,
    isBestSelling: Boolean,
    isFeatured: Boolean
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product