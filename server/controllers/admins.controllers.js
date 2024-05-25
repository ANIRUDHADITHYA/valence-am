import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signupWithEmailAndPasswordAdmin = async (req, res) => {
    const { name, mobile, email, password } = req.body;

    try {
        const adminEmail = await Admin.findOne({ email });
        if (adminEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }
        const adminMobile = await Admin.findOne({ mobile });
        if (adminMobile) {
            return res.status(400).json({ message: "Mobile number already exists." });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            mobile,
            email,
            password: hashPassword,
            role: "admin",
        });
        await newAdmin.save();
        return res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error('Error during admin registration:', error);
        return res.status(500).json({ message: "Server error. Please try again later.", error });
    }
};

export const signinWithEmailAndPasswordAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        const sanitizedAdminData = { ...admin?._doc, password: undefined, last_login: "" };

        if (!admin) {
            return res.status(404).json({ message: 'Unauthorized Access!' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }


        admin.last_login = Date.now();
        await admin.save();

        const accessToken = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.ADMIN_ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 1000,
        });

        return res.json({ status: true, message: 'Login successful!', sanitizedAdminData, last_login: admin.last_login });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error.' });
    }
}

export const verifyAdmin = (req, res) => {
    const admin = req.admin;
    res.json({ status: true, admin });
};

export const signout = (req, res) => {
    res.clearCookie('access_token');
    return res.json({ status: true, message: 'Signed out successfully' });
}