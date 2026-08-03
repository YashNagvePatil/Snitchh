import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import authRouter from "../routes/auth.routes.js"
import productRouter from "../routes/products.route.js"


  const app = express()

 app.use(morgan("dev"))
 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
 app.use(cookieParser());

 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
 }))

 app.get('/',(req,res) => {
    res.send("Hello World!");
 })

 app.use("/auth/api",authRouter)
 app.use("/api/products",productRouter)
 

 export default app