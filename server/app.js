import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbconfig.js";

// configuring dotenv globally
dotenv.config();

// setting up express app
const app = express();

// getting environment variables.
const PORT = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN.split(',') // extract and separate cors origin urls from environment variable(.env) 

// setting cors options
const corsOptions = {
    origin: corsOrigin,
    credentials: true
}

// configuring readymade middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// connecting to database and then starting server
connectDB()
    .then(() => {
        app.listen(PORT || 8800, () => {
            console.log(`Server is running at port : ${PORT}`);
            app.get('/api', (req, res) => {
                res.status(201).send("Ram-Ram Avinash, calling from app.js. Your server is running fine.");
            })
        })
    })
    .catch((error) => {
        console.log("Error starting server.", error)
    })