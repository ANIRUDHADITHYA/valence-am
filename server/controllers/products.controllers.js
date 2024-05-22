import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(201).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductByProcessID = async (req, res) => {
    const processId = parseInt(req.params.process_id, 10);
    if (isNaN(processId)) {
        return res.status(400).json({ message: "Invalid Process ID" });
    }

    try {
        const products = await Product.find({
            process: { $elemMatch: { id: processId } }
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this process ID' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by process id:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProductByProductID = async (req, res) => {
    const productId = req.params.product_id;

    try {
        const product = await Product.findOne({
            product_id: productId
        });

        if (!product) {
            return res.status(404).json({ message: 'No products found for this product ID' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching products by product id:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getProductByCategoryID = async (req, res) => {
    const category_id = req.params.category_id;

    try {
        const products = await Product.find({
            category_id: category_id
        });

        if (!products) {
            return res.status(404).json({ message: 'No products found for this product ID' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by product id:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const addProduct = async (req, res) => {
    try {
        const {
            index,
            product_id,
            product_name,
            category_id,
            process,
            product_discription,
            product_image,
            display_title,
            temperature,
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
            product_image: product_image,
            display_title: display_title,
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