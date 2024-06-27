import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.js";
import mongoose from "mongoose";
import { connectDb } from "./lib/connectDb.js";
import userRoutes from "./routes/userRouter.js"
import formRoutes from "./routes/formRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();
connectDb(process.env.uri);
const app = express();
const PORT = process.env.PORT ||5000;

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/form",formRoutes);
app.get("/", (req, res,next) => {
   return res.status(200).json({success:true,message:"I am working"})
});


app.use(errorHandler);
mongoose.connection.once("open",()=>{
    console.log("Connection established with DataBase");
    app.listen(PORT, () => {
        console.log(`Server is running on the port ${PORT}`);
    });
})
mongoose.connection.on("error",(err)=>{
    console.log(err);
})
