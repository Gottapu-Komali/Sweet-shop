const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'PENDING'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: {
        type: Array, // Storing items as an array of objects
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        default: 'COD'
    },
    idempotencyKey: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
