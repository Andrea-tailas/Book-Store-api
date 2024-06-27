
import { pgTable, text, integer } from "drizzle-orm/pg-core";


export const booksTable = pgTable('books', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    authors: text('author_id').notNull(),
    publicationYear: integer('publication_year').notNull()
  });
  

 
 

export type TIbooks = typeof booksTable.$inferInsert
export type TSbooks = typeof booksTable.$inferSelect
