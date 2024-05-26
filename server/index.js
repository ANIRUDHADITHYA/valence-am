import express from "express";
import connectDB from "./lib/db.js";
import dotenv from 'dotenv';
import { ProductRouter } from "./routes/products.route.js";
import { UserRouter } from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { OrderRouter } from "./routes/order.route.js";
import { AdminRouter } from "./routes/admin.route.js";
import { FormsRouter } from "./routes/forms.route.js";

dotenv.config()

const app = express()


app.use(express.json());
app.use(cors({ origin: [process.env.PRIMARY_HOST_URL, process.env.ADMIN_HOST_URL, process.env.VPS_HOST_URL], credentials: true }));
app.use(cookieParser({ origin: [process.env.PRIMARY_HOST_URL, process.env.ADMIN_HOST_URL, process.env.VPS_HOST_URL], credentials: true }));
app.use(express.urlencoded({ extended: true }));

connectDB();


//Middleware for User
app.use('/api/auth', UserRouter)

//Middleware for Product
app.use('/api/auth/admin', AdminRouter)

//Middleware for Product
app.use('/api/products', ProductRouter)

//Middleware for Order
app.use('/api/orders', OrderRouter)

//Middleware for Forms
app.use('/api/forms', FormsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})