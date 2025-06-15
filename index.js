import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import cors from "cors"
import { connectDB } from "./utils/db.js"

import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import foodRoutes from "./routes/food.route.js"
import foodRequestRoutes from "./routes/foodReq.route.js"

connectDB()

// middlewares
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: ["http://localhost:5173" , "https://nohunger-ccf5b.web.app"],
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())


// routes 
app.get("/" , async (req , res)=>{
   res.status(200).json({
    message: "it's our server",
    success: true
   })
})

app.use('/api/users' , userRoutes)
app.use("/api/food/" , foodRoutes)
app.use("/api/request/" , foodRequestRoutes)



const PORT =  process.env.PORT || 4004

app.listen(PORT , ()=>{
    
    console.log(`server is running at http://localhost:${PORT}`)
})
