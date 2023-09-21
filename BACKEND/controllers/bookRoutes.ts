import { Router, Request, Response } from 'express';
import { BookModel, IBook } from "../models/bookSchema";

export const bookRouter = Router(); 
const api = process.env.API_URL; 


bookRouter.get("/", async (req: Request, res: Response) => {
    try {
      const bookList = await BookModel.find();
      res.status(200).json(bookList);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal Server Error',
        success: false,
      });
    }
  });
  
  bookRouter.post("/", (req: Request, res: Response) => {
    const bookData: IBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo,
      inStock: req.body.inStock,
    }; 
    
    const book = new BookModel(bookData); 
  
    book.save()
    .then((createdBook => {
      res.status(201).json(createdBook)
    })).catch((err: Error) => {
      res.status(500).json({
        error: err,
        success: false, 
      });
    });
  });
  
  

