// service.ts
import db from '../drizzle/db';
import { booksTable,TIbooks,TSbooks } from '../drizzle/schema';
import {  asc, eq } from "drizzle-orm";

export const addBook = async (book:TIbooks) => {
  return await db.insert(booksTable).values(book);
};

export const deleteBook = async (id: number) => {
  return await db.delete(booksTable).where(eq(booksTable.id,id));
};

export const updateBook = async (id:number,book:TIbooks) => {
  return await db.update(booksTable).set(book).where(eq(booksTable.id, id));
};

export const getBooks = async (limit?:number):Promise<TSbooks[] | null> => {
    if (limit){
        return await db.query.booksTable.findMany({
            limit:limit        });
    }
    return await db.query.booksTable.findMany()
};

export const getBooksId = async (id:number) => {
    return await db.query.booksTable.findFirst({where: eq(booksTable.id, id)})
    
}
