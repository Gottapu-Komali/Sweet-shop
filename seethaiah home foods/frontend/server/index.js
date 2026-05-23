require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const connectDB = require('./database');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

// Products API
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Orders API (MVP)
app.post('/api/orders', async (req, res) => {
    try {
        // Basic Zod Schema (Expand later)
        const orderSchema = z.object({
            items: z.array(z.any()),
            totalAmount: z.number(),
            customerDetails: z.object({
                name: z.string(),
                phone: z.string(),
                address: z.string()
            })
        });

        const validation = orderSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error });
        }

        const { items, totalAmount, customerDetails } = validation.data;
        const orderId = `ORD-${Date.now()}`;

        const newOrder = new Order({
            orderId,
            totalAmount,
            items: items, // Mongoose handles array
            customerName: customerDetails.name,
            customerPhone: customerDetails.phone,
            address: customerDetails.address,
            paymentMethod: 'COD'
        });

        await newOrder.save();

        res.status(201).json({ success: true, orderId });

    } catch (error) {
        console.error('Order creation failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
