import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import {app,server,io} from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT
const __dirname = path.resolve();

// app.use(express.json())
app.use(express.json({ limit: '10mb' })); 
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //allows cookies to be sent
}));


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


server.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
    connectDB();
})

