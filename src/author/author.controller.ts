import { Context } from "hono";
import { addAuthor, getAuthor, getAuthorId, updateAuthor, deleteAuthor} from "./author.service";

export const listAuth = async (c: Context) => {
    try {

        const limit = Number(c.req.query('limit'))

        const data = await getAuthor(limit);
        if (data == null || data.length == 0) {
            return c.text("Auther not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getAuth = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const user = await getAuthorId(id);
    if (user == undefined) {
        return c.text("Auther not found", 404);
    }
    return c.json(user, 200);
}

export const createAuth = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await addAuthor(user);


        if (!createdUser) return c.text("Auther not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateAuth = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        
        const searchedUser = await getAuthorId(id);
        if (searchedUser == undefined) return c.text("Auther not found", 404);
        // get the data and update it
        const res = await updateAuthor(id, user);
        // return a success message
        if (!res) return c.text("Auther not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteAuth = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
     
        const user = await getAuthorId(id);
        if (user == undefined) return c.text("Auther not found", 404);
     
        const res = await deleteAuthor(id);
        if (!res) return c.text("Auther not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}