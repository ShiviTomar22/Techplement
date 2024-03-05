
import mongoose from "mongoose";

export async function connect(){
    try {
        
        mongoose.connect(process.env.MONGO_URI)

        const connection=mongoose.connection;

        connection.on("connected",()=>{
            console.log("db connected seccussfully");
        })

        connection.on("errors",()=>{
            console.log("db not connected");
            process.exit();
        })

    } catch (error) {
        console.log("Something went Wrong")
    }
}