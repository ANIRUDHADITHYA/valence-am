import express from "express";
import productsRouters from "./routes/products.route.js"
import connectDB from "./lib/db.js";
import dotenv from 'dotenv';

dotenv.config()

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


//Middleware
app.use('/api/products', productsRouters)


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})