import BASTicket from "../models/bas.model.js";
import Ticket from "../models/ticket.model.js";
import nodemailer from 'nodemailer';

const sendEmailToUser = async (to, subject, ticketDetails) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        sameSite: 'Lax',
        auth: {
            user: process.env.ENQUIRY_EMAIL_ID,
            pass: process.env.ENQUIRY_EMAIL_PASS
        }
    });

    const emailContent = `
    <img src="https://valence-new.netlify.app/Asserts/logo.png" alt="logo"/>
    <h1>Dear ${ticketDetails.name},<br/>Thank you for Reaching Out to Valence.</h1>
    <h2>We have received your Feedback, Our Team will contact you soon</h2>
    <h3>Please use your the Acknowledge Number: ${ticketDetails.ticket_id}, for further communication</h3>
    
`;


    const mailOptions = {
        from: process.env.ENQUIRY_EMAIL_ID,
        to: to,
        subject,
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
};

const sendEmailToEnquiry = async (subject, ticketDetails) => {
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
    <h1>New Get In Touch Record</h1>
    <h2>Ticket ID: ${ticketDetails.ticket_id}</h2>
    <h2>Time Stamp: ${ticketDetails.timestamp}</h2>
    <h2>Name: ${ticketDetails.name}</h2>
    <h2>Email: ${ticketDetails.email}</h2>
    <h2>Subject: ${ticketDetails.subject}</h2>
    <h2>Message: ${ticketDetails.message}</h2>
`;


    const mailOptions = {
        from: process.env.NO_REPLY_EMAIL_ID,
        to: "enquiry@valence-am.com",
        subject,
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
};

const sendBASEmailToUser = async (to, subject, ticketDetails) => {
    const transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        sameSite: 'Lax',
        auth: {
            user: process.env.ENQUIRY_EMAIL_ID,
            pass: process.env.ENQUIRY_EMAIL_PASS
        }
    });

    const emailContent = `
    <img src="https://valence-new.netlify.app/Asserts/logo.png" alt="logo"/>
    <h1>Dear ${ticketDetails.name},<br/>Thank you for Showing Interest to Valence.</h1>
    <h2>We have received your Request to Become a Supplier, Our Team will review your application and contact you soon.</h2>
    <h3>Please use your the Acknowledge Number: ${ticketDetails.ticket_id}, for further communication or reply to this mail directly.</h3>
    
`;


    const mailOptions = {
        from: process.env.ENQUIRY_EMAIL_ID,
        to: to,
        subject,
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
};

const sendBASEmailToEnquiry = async (subject, ticketDetails) => {
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
    <h1>New Become A Supplier Request</h1>
    <h2>Ticket ID: ${ticketDetails.ticket_id}</h2>
    <h2>Time Stamp: ${ticketDetails.timestamp}</h2>
    <h2>Name: ${ticketDetails.name}</h2>
    <h2>Company Name: ${ticketDetails.company_name}</h2>
    <h2>Email: ${ticketDetails.email}</h2>
    <h2>Phone: ${ticketDetails.phone}</h2>
    <h2>Company Website: ${ticketDetails.company_website}</h2>
    <h2>Message: ${ticketDetails.message}</h2>
`;


    const mailOptions = {
        from: process.env.NO_REPLY_EMAIL_ID,
        to: "enquiry@valence-am.com",
        subject,
        html: emailContent
    };

    await transporter.sendMail(mailOptions);
};

const generateTicketId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit random number
};


export const createTicket = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const ticket_id = `VE-T${generateTicketId()}`;
    const timestamp = Date.now();

    try {
        const newTicket = new Ticket({
            name,
            email,
            subject,
            message,
            ticket_id,
            timestamp
        });

        await newTicket.save();

        await sendEmailToUser(req.body.email, `Received your Feedback - acknowledge number: ${ticket_id}`, newTicket);
        await sendEmailToEnquiry(`Received New Get In Touch Record - acknowledge number: ${ticket_id}`, newTicket);
        return res.status(201).json({ status: true, message: 'Ticket created successfully', ticket_id: ticket_id });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ status: false, message: 'Error creating ticket', error: error.message });
    }
};

export const createBASTicket = async (req, res) => {
    const { name, company_name, email, phone, company_website, message } = req.body;
    const ticket_id = `BAS-T${generateTicketId()}`;
    const timestamp = Date.now();
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    try {
        const lastTicket = await BASTicket.findOne({ email }).sort({ timestamp: -1 });

        if (lastTicket && (timestamp - lastTicket.timestamp) < sevenDaysInMilliseconds) {
            return res.status(400).json({ status: false, message: 'You can only create a new ticket 7 days after the last one.' });
        }

        const newTicket = new BASTicket({
            name,
            company_name,
            email,
            phone,
            company_website,
            message,
            ticket_id,
            timestamp
        });

        await newTicket.save();

        await sendBASEmailToUser(req.body.email, `Received your Become a Supplier Application - acknowledge number: ${ticket_id}`, newTicket);
        await sendBASEmailToEnquiry(`Received New Get In Touch Record - acknowledge number: ${ticket_id}`, newTicket);

        return res.status(201).json({ status: true, message: 'Ticket created successfully', ticket_id: ticket_id });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return res.status(500).json({ status: false, message: 'Error creating ticket', error: error.message });
    }
};

