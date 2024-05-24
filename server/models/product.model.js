import { Schema, model } from "mongoose";

const processSchema = new Schema({
    index: { type: Number, required: true },
    id: { type: Number, required: true }
});

const physicalDimensionSchema = new Schema({
    index: { type: Number, required: true },
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String }
});

const dimensionValueSchema = new Schema({
    index: { type: Number, required: true },
    id: { type: Number, required: true },
    values: { type: Map, of: String }
}, { strict: false });

const productSchema = new Schema({
    index: { type: Number, required: true, unique: true },
    product_id: { type: String, required: true, unique: true },
    product_name: { type: String, required: true },
    category_id: { type: Number, required: true },
    process: [processSchema],
    product_discription: { type: String, required: true },
    product_image: { type: String, required: true, unique: true },
    display_title: { type: String, required: true },
    temperature: { type: String, required: true },
    physical_dimensions: [physicalDimensionSchema],
    dimension_values: [dimensionValueSchema],
    product_status: { type: Boolean, default: true }
});

const Product = model("Products", productSchema)

export default Product;

