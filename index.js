import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware for CORS POLICY
app.use(cors());

// app.use(cors(
//     {
//         origin:`http://localhost:5173`,
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders:['Content-Type'],
//     }
// ));

app.get("/", (request,response)=>{

    console.log(request);
    return response.send("hello");

})
app.use('/books',booksRoute);


mongoose.connect(mongoDBURL)
.then(()=>{
console.log("Connected to database !!");

app.listen(PORT, ()=>{
    console.log(`App is listing to the PORT ${PORT}`);
})

})
.catch((error)=>{
console.log("error in database connection !! "+error);
})

