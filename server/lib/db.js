import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/valence-am-db");
        console.log("Connected to Database Established Sucessfully....")
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    };
}


export default connectDB;