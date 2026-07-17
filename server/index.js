import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

// Import routes
import authRoutes from './routes/auth.js'
import newsRoutes from './routes/news.js'

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/NewsSite")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)

// Root route
app.get('/', (req, res) => {
  let name="santhosh"
let value=atob("eyJpZCI6IjY3YzQyNDhkMjI4MjY3NGZkNmY0NjlkNSIsImlhdCI6MTc0MDkwNzY2MSwiZXhwIjoxNzQzNDk5NjYxfQ")
console.log(value)
  res.send('News API is running')
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})