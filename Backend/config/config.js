import dotenv from "dotenv"
 dotenv.config();


 if (!process.env.MONGO_URI){
    throw new Error ("MONOG_URI is not decleared")
 }

 export const config = {
    MONGO_URI:process.env.MONGO_URI
 }