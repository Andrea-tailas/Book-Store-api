// service.ts
import db from '../drizzle/db';
import { authorsTable,TIauthor,TSauthor } from '../drizzle/schema';
import {  asc, eq } from "drizzle-orm";

export const addAuthor = async (book:TIauthor) => {
  return await db.insert(authorsTable).values(book);
};

export const deleteAuthor = async (id: number) => {
  return await db.delete(authorsTable).where(eq(authorsTable.id,id));
};

export const updateAuthor = async (id:number,book:TIauthor) => {
  return await db.update(authorsTable).set(book).where(eq(authorsTable.id, id));
};

export const getAuthor = async (limit?:number):Promise<TSauthor[] | null> => {
    if (limit){
        return await db.query.authorsTable.findMany({
            limit:limit        });
    }
    return await db.query.authorsTable.findMany()
};

export const getAuthorId = async (id:number) => {
    return await db.query.authorsTable.findFirst({where: eq(authorsTable.id, id)})
    
}
