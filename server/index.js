import express from "express";
import productsRouters from "./routes/products.route.js"
import connectDB from "./lib/db.js";

const app = express()

const PORT = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


//Middleware
app.use('/api/products', productsRouters)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})