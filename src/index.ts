import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { booksRouter } from "./books/books.router";
import { authorsRouter } from "./author/author.router";

const app = new Hono()



app.get('/ok',async (c) => {
    return c.json({message: 'Hello World'})
 
})

//custom route
app.route('/api', booksRouter)
app.route('/api', authorsRouter)



console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
})
