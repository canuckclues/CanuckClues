const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = paymentStatus;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete order (admin only)
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.remove();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder
}; 