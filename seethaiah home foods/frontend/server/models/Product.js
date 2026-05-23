const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    badge: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    stockStatus: {
        type: String,
        default: 'IN_STOCK'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
