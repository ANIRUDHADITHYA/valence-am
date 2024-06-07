import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(201).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getActiveProducts = async (req, res) => {
    try {
        const activeProducts = await Product.find({ product_status: true });
        res.json(activeProducts);
    } catch (error) {
        console.error('Error fetching active products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


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

export const getproductByID = async (req, res) => {
    const product_id = req.params.productID;
    try {
        const product = await Product.find({ product_id });
        return res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProductById = async (req, res) => {
    try {
        const product_id = req.params.productID;
        const updateData = req.body;

        const updatedProduct = await Product.findOneAndUpdate({ product_id }, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

export const hideProductById = async (req, res) => {
    try {
        const product_id = req.params.productID;

        const product_status = false;
        console.log(product_id)

        const updatedProduct = await Product.findOneAndUpdate(
            { product_id },
            { product_status },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product status', error });
    }
};

export const unHideProductById = async (req, res) => {
    try {
        const product_id = req.params.productID;

        const product_status = true;
        console.log(product_id)

        const updatedProduct = await Product.findOneAndUpdate(
            { product_id },
            { product_status },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product status', error });
    }
};