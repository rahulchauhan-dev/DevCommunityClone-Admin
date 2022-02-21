import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'

import adminRoutes from './routes/adminRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('API is running..')
})

app.use('/api/posts', postRoutes)

app.use('/api/admin', adminRoutes)



app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))