import { sendOrderEmail } from "../email-templets/order.email.js";
import Order from "../models/order.model.js";

const generateOrderId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
};


export const createOrder = async (req, res) => {
    const cartValues = req.body.cartValues;
    try {
        const user = req.user;
        const user_id = req.userId;
        const order_id = generateOrderId();
        const timestamp = Date.now();

        const orders = cartValues.map(cartItem => ({
            product_id: cartItem.product_id,
            product_name: cartItem.product_name,
            quantity: cartItem.quantity,
            product_category: cartItem.product_category,
            product_properties: cartItem.product_properties
        }));

        const newOrder = new Order({
            user: user_id,
            orders,
            timestamp,
            order_id
        });

        await newOrder.save();
        await sendOrderEmail(req.user.email, 'Valence | Order Confirmation', newOrder, user);
        return res.status(201).json({ status: true, message: 'Order created successfully', order_id: order_id });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ status: false, message: 'Error creating order', error: error.message });
    }
};