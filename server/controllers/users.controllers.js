import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



export const signupWithEmailAndPassword = async (req, res) => {
    const { name, company_name, mobile, email, password } = req.body;

    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const userMobile = await User.findOne({ mobile });
        if (userMobile) {
            return res.status(400).json({ message: "Mobile number already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            company_name,
            mobile,
            email,
            password: hashPassword,
            role: "client",
            reset_token_used: false
        });

        await newUser.save();
        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const signinWithEmailAndPassword = async (req, res) => {
    const { email, password, remember_me } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User as not found.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'password is incorrect.' });
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: remember_me ? '7d' : '1h' }
        );

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: remember_me ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
        });

        return res.json({ status: true, message: 'login successful.', user: user.name });
    } catch (error) {
        return res.status(500).json({ message: 'server error.' });
    }
}



export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not registered" });
        }

        const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET, {
            expiresIn: "5m",
        });

        user.reset_token_used = false; // Reset the flag


        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NO_REPLY_EMAIL_ID,
                pass: process.env.NO_REPLY_EMAIL_PASS
            }
        });

        const encodedToken = encodeURIComponent(resetToken).replace(/\./g, "%2E");

        const mailOptions = {
            from: process.env.NO_REPLY_EMAIL_ID,
            to: email,
            subject: 'Reset Password',
            text: `${process.env.PRIMARY_HOST_URL}/reset-password/${encodedToken}`
        };

        await transporter.sendMail(mailOptions);
        await user.save();
        return res.status(200).json({ status: true, message: "Email sent" });
    } catch (error) {
        return res.status(500).json({ message: "Error sending email", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const resetToken = req.params.resetToken;
    const { newPassword } = req.body;
    try {
        const decoded = await jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        const id = decoded.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.reset_token_used) {
            return res.status(400).json({ message: 'Reset token has already been used' });
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword, reset_token_used: true });
        return res.json({ status: true, message: "updated password" });
    } catch (err) {
        return res.json(err.message);
    }
}

export const verifyResetToken = async (req, res) => {
    const resetToken = req.params.resetToken;
    try {
        const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        return res.status(200).json({ status: true, message: 'Reset token is valid', userId: decoded.id });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired reset token' });
    }
};

export const verifyUser = (req, res) => {
    const user = req.user;
    res.json({ status: true, user });
};


export const signout = (req, res) => {
    res.clearCookie('access_token');
    return res.json({ status: true, message: 'Signed out successfully' });
}