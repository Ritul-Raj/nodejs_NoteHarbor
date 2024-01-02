import mongoose from "mongoose";


export const connectDb= ()=>{ mongoose.connect(process.env.MONGO_URI,{
dbName:"Apibackend" 
}).then((c)=>{
  // console.log(`data base connected with ${c.connection.host}`)})
  console.log("data base connected ")})
.catch((e)=>{
  console.log(e);
}) }

