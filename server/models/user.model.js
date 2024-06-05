import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    company_name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "client" },
    reset_credentials: [{
        token: String,
        requested_at: Date,
        used: Boolean
    }]
})


const User = model("User", UserSchema)

export default User;