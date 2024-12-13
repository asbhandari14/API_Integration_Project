import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import youtubeRoute from "./routes/youtube-router.js";
import connectDB from "./database/connectDB.js";



const app = express();


const PORT=process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods : "GET, POST, PUT, DELETE"

}))


app.use("/api/youtube_data", youtubeRoute);


connectDB().then(()=>{
    app.listen(PORT, (err)=>{
        if(err) console.log(err);
        else console.log("Server is connected at the PORT", PORT);
    })
})
.catch((err)=>{
    console.log(err);
})



// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/youtube', require('./routes/youtubeRoutes'));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));