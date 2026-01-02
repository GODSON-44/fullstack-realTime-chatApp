import express from "express";
import dotenv from "dotenv";// to the .env variable globally 1.
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"; // connect to mongoDB server
import cors from "cors";
import { app, server } from "./lib/socketIO.js";
import path from "path";



dotenv.config()// 2.

app.use(express.json())// used to extract data out of json body
app.use(cookieParser()) // allows to parse the cookie helped in middleware cookie extraction to see if online or not

const PORT = process.env.PORT// 3. (this value is coming from .env file in the backend folder)
const __dirname = path.resolve();


//this is used to remove cors error appeared in the front end part which is trying to fetch
// this backend at a different server i.e localhost:50001 and front end is at localhost:5172
app.use(cors({ // note the position of this app it is before using any URLs
    origin:"http://localhost:5173",
    credentials:true // we allow the caller at localhost:5173 to have our cookies or any json obj
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));


app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(PORT, ()=>{ // replaced the app.listen to server.listen
    console.log("server is running fine on PORT: "+PORT);
    connectDB()
})