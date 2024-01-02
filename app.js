import express from "express"
import mongoose from "mongoose";
import userrouter from "./routes/user.js";
import taskrouter from "./routes/task.js";
import { connectDb } from "./database/data.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

config({
    path:"./database/.env"
})

const app=express();

// using middleware
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
   origin:[process.env.FRONTEND_URL],
   methods:["GET","POST","PUT","DELETE"],
   credentials:true    // credential true is isliye krna pdta kyuki cookie wagera set nhi hoga  
}));

  // app.use(router) // we have to add only this to access routes file

app.use("/api/v1/user",userrouter);
app.use("/api/v1/task",taskrouter);

//using error middleware
app.use(errorMiddleware)

connectDb();

app.get("/",(req,res)=>{
 res.send("nice")
}) 

console.log(process.env.PORT)
const port=process.env.PORT;
app.listen(port,()=>{ 
    console.log("server is working")
}) 
