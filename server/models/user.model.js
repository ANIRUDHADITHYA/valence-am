import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    company_name: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    reset_token_used: { type: Boolean, default: false }
})


const User = model("User", UserSchema)

export default User;