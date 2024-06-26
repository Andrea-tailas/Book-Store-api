import { Hono } from "hono";
import { listBk, getBk, createBk, updateBk, deleteBk } from "./books.controller"

export const booksRouter = new Hono();

//get all books     
booksRouter.get("/books" ,listBk);
//get a single book   
booksRouter.get("/book/:id", getBk)

// create a book
booksRouter.post("/book", createBk)
//update a book
booksRouter.put("/book/:id", updateBk)

booksRouter.delete("/book/:id", deleteBk)