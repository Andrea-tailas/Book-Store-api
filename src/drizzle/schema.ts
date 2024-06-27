

import { pgTable, text, decimal,serial } from "drizzle-orm/pg-core";


export const booksTable = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    publicationYear: decimal('publication_year').notNull()
  });
  

 
 

export type TIbooks = typeof booksTable.$inferInsert
export type TSbooks = typeof booksTable.$inferSelect
