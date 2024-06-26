import { relations } from "drizzle-orm";
import { pgTable,serial, text, varchar, integer } from "drizzle-orm/pg-core";


export const booksTable = pgTable('books', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    author_id: integer('author_id').notNull().references(()=>authorsTable.id),
    publicationYear: integer('publication_year').notNull()
  });
  

  export const authorsTable=pgTable('authors',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:255}).notNull()
  })

  export const authorsBookRelation=relations(authorsTable,({one})=>({
    book:one(booksTable,{
        fields:[authorsTable.id],
        references:[booksTable.author_id]
    })
  }))

  export const bookAuthorRelation=relations(booksTable,({many})=>({
    author:many(authorsTable)
  }))


export type TIbooks = typeof booksTable.$inferInsert
export type TSbooks = typeof booksTable.$inferSelect
export type TIauthor = typeof authorsTable.$inferInsert
export type TSauthor = typeof authorsTable.$inferSelect