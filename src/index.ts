import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { booksRouter } from "./books/books.router";
import {cors} from 'hono/cors'

const app = new Hono()

app.use('*',cors({
  origin:'http://localhost:8000' ,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],

}))

app.get('/ok',async (c) => {
    return c.json({message: 'Hello World'})
 
})

//custom route
app.route('/api', booksRouter)




console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000
})
