import { Context } from "hono";
import { addBook, getBooks, getBooksId, updateBook, deleteBook} from "./books.service";

export const listBk = async (c: Context) => {
    try {

        const limit = Number(c.req.query('limit'))

        const data = await getBooks(limit);
        if (data == null || data.length == 0) {
            return c.text("Book not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBk = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const user = await getBooksId(id);
    if (user == undefined) {
        return c.text("Book not found", 404);
    }
    return c.json(user, 200);
}

export const createBk = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await addBook(user);


        if (!createdUser) return c.text("Book not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBk = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        
        const searchedUser = await getBooksId(id);
        if (searchedUser == undefined) return c.text("Book not found", 404);
        // get the data and update it
        const res = await updateBook(id, user);
        // return a success message
        if (!res) return c.text("Book not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBk = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
     
        const user = await getBooksId(id);
        if (user == undefined) return c.text("Book not found", 404);
     
        const res = await deleteBook(id);
        if (!res) return c.text("Book not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}