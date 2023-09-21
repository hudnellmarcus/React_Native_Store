import express, { Router } from "express";
import { bookRouter } from "./bookRoutes";

export const routes = express.Router(); 

routes.use(bookRouter);