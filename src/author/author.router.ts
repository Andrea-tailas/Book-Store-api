import { Hono } from "hono";
import { listAuth, getAuth, createAuth, updateAuth, deleteAuth } from "./author.controller"

export const authorsRouter = new Hono();

//get all books     
authorsRouter.get("/authors" ,listAuth);
//get a single book   
authorsRouter.get("/author/:id", getAuth)

// create a book
authorsRouter.post("/author", createAuth)
//update a book
authorsRouter.put("/author/:id", updateAuth)

authorsRouter.delete("/author/:id", deleteAuth)