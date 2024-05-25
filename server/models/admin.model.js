import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    last_login: { type: Date, default: Date.now }
})

const Admin = model("Admins", AdminSchema)

export default Admin;