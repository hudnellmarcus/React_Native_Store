import mongoose, { Model, Models } from "mongoose";

const { Schema } = mongoose; 

interface IBook {
    title: string;
    author: string;
    genre: string;
    price: number;
    quantity: number,
    photo?: string;
    inStock?: boolean;
}

const bookSchema = new Schema<IBook>(
    {
        "title": String,
        "author": String,
        "genre": String,
        "price": Number,
        "quantity": Number,
        "photo": String,
        "inStock": {
            type: Boolean,
            default: true,
        },
    });

const BookModel: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export {BookModel, IBook};  