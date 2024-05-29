import { Schema, model } from "mongoose";

const productPropertySchema = new Schema({
    value: String,
    property_id: String,
    property_name: String,
    customized: { type: Boolean, default: false },
    custom_value: String,
    unit: String,
});

const orderSchema = new Schema({
    product_id: String,
    product_name: String,
    quantity: Number,
    product_category: String,
    product_properties: [productPropertySchema]
});

const OrderSchema = new Schema({
    user: { type: String, required: true },
    orders: [orderSchema],
    timestamp: { type: Date, default: Date.now },
    order_id: { type: Number, required: true },
    order_status: { type: String, default: "In Enquiry" }
});

const Order = model("Orders", OrderSchema);

export default Order;
