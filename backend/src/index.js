import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import {app,server,io} from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT

// app.use(express.json())
app.use(express.json({ limit: '10mb' })); 
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //allows cookies to be sent
}))
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


server.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
    connectDB();
})

