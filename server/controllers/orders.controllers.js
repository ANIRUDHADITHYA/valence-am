import Order from "../models/order.model.js";
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NO_REPLY_EMAIL_ID,
            pass: process.env.NO_REPLY_EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.NO_REPLY_EMAIL_ID,
        to: [to, "anirudhadithya.b.s@gmail.com"],
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

const generateOrderId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
};


export const createOrder = async (req, res) => {
    const cartValues = req.body.cartValues;


    try {
        const user = req.user.userId;
        const order_id = generateOrderId();
        const timestamp = Date.now();

        const orders = cartValues.map(cartItem => ({
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
            product_category: cartItem.product_category,
            product_properties: cartItem.product_properties
        }));

        const newOrder = new Order({
            user,
            orders,
            timestamp,
            order_id
        });

        await newOrder.save();

        const emailText = `We have received your order with ID ${order_id}. Order details: ${JSON.stringify(orders)}`;
        await sendEmail(req.user.email, 'Valence | Order Confirmation', emailText);
        return res.status(201).json({ status: true, message: 'Order created successfully', order_id: order_id });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ status: false, message: 'Error creating order', error: error.message });
    }
};