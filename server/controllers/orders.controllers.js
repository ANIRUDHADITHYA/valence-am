import Order from "../models/order.model.js";
import nodemailer from 'nodemailer';

const categories = {
    0: "everything",
    1: "Vacuum Bagging Films",
    2: "Release Films",
    3: "Breathers & Bleeders",
    4: "Peel Ply",
    5: "Sealant Tapes",
    6: "Pressure Sensitive Tapes",
    7: "Vacuum Valves & Hoses",
    8: "Resin Flow Mesh",
    9: "Infusion Tooling & Accessories",
    10: "Infusion Flow & Control Systems",
}

const sendEmail = async (to, subject, orderDetails) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        sameSite: 'Lax',
        auth: {
            user: process.env.NO_REPLY_EMAIL_ID,
            pass: process.env.NO_REPLY_EMAIL_PASS
        }
    });

    const emailContent = `
    <img src="https://valence-new.netlify.app/Asserts/logo.png" alt="logo"/>
    <h1>Thank you for your Interest in Valence Products.</h1>
    <h2>Your Order Details are as follows:</h2>
    <ol>
        ${orderDetails.map(orderItem => `
            <li>
                <h3>Product ID: ${orderItem.product_id}</h3>
                <p>Quantity: ${orderItem.quantity}</p>
                <p>Category: ${categories[orderItem.product_category]}</p>
                ${orderItem.product_properties.map(prop => `
                    <div>
                        <h5><b>${prop.property_name}:</b> ${prop.value}</h5>
                        ${prop.customized ? `<h5>(${prop.custom_value})</h5>` : ""}
                    </div>
                `).join('')}
            </li>
        `).join('')}
    </ol>
`;


    const mailOptions = {
        from: process.env.NO_REPLY_EMAIL_ID,
        to: [to, "no-reply@valence-am.com"],
        subject,
        html: emailContent
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
        await sendEmail(req.user.email, 'Valence | Order Confirmation', newOrder.orders);
        return res.status(201).json({ status: true, message: 'Order created successfully', order_id: order_id });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ status: false, message: 'Error creating order', error: error.message });
    }
};