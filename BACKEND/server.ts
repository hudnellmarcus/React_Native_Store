import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose, { Error } from "mongoose";
import { BookModel, IBook } from "./models/bookSchema";
import { ErrorRequestHandler } from "express";
import { routes } from "./controllers";
import { bookRouter } from "./controllers/bookRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookstore_db";
const api = process.env.API_URL; 


// mongoose connection options 
const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
} as mongoose.ConnectOptions;

// connect to Mongo
mongoose.connect(mongoURI, mongooseOptions)
    .then(() => {
        console.log(`[MongoDB]: Connected Successfully`); 
    })
    .catch((error) => {
        console.error(`[MongoDB]: Connection Error`, error)
    }); 

// middleware
app.use(express.json());
app.use(morgan("tiny"));

//// Routers////////////////////////////////////
app.use(`${api}/books`, bookRouter); 

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    success: false,
  });
};
app.use(errorHandler); 

// Routes ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

app.get(`${api}`, (req: Request, res: Response) => {
  res.send("Welcome to the bookstore"); 
});


app.listen(port, () => {
  console.log(`[server]: listening to Andre ${port}`);
});
