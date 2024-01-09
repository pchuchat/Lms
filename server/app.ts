require('dotenv').config();
import express, {Request,Response,NextFunction } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";

//body parser
app.use(express.json({limit:"50mb"}));

//cookie parser
app.use(cookieParser());

//cors => cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));

//testing api
app.get("/testi",(req:Request ,res:Response, next:NextFunction) => {
    res.status(200).json({
        success:true,
        message:"API is working",
    });
});

// unknow route
app.all("*", (req:Request ,res:Response, next:NextFunction) => {
    const error = new Error(`Route ${req.originalUrl} not found`) as any;
    error.statusCode = 404;
    next(error);
});


app.use(ErrorMiddleware);