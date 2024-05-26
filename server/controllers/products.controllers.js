import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(201).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const addProduct = async (req, res) => {
    try {
        // Fetch all products
        const allProducts = await Product.find();

        // Set index equal to the length of all products minus 1
        const index = allProducts.length > 0 ? allProducts.length : 0;

        const {
            product_id,
            product_name,
            category_id,
            product_discription,
            temperature,
            process,
            physical_dimensions,
            dimension_values
        } = req.body;

        const newProduct = new Product({
            index: index,
            product_id: product_id,
            product_name: product_name,
            category_id: category_id,
            process: process,
            product_discription: product_discription,
            product_image: product_id,
            display_title: product_name,
            temperature: temperature,
            physical_dimensions: physical_dimensions,
            dimension_values: dimension_values
        });

        const product = await newProduct.save();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}