require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const quizRoutes = require('./routes/quizRoutes')

const app = express()
const PORT = process.env.PORT || 5001

// Allow local dev and production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow all in development if no CLIENT_URL is set, OR check the list
    if (!origin || !process.env.CLIENT_URL || allowedOrigins.includes(origin.replace(/\/$/, ''))) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked for: ${origin}`))
    }
  },
  credentials: true
}))
app.use(express.json())

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`📡 ${req.method} request received at ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.type('text').send(
    'CellQuiz API — use GET /api/test. Run the Vite app (npm run dev in client) for the UI.',
  )
})

app.get('/api/test', (req, res) => {
  res.send('API is working')
})

app.use('/api/quiz', quizRoutes)

async function start() {
  try {
    await connectDB()

    const server = app.listen(PORT)

    server.once('listening', () => {
      console.log(`Server listening on port ${PORT}`)
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${PORT} is already in use. On macOS, try turning off AirPlay Receiver or set PORT in .env.`,
        )
      } else {
        console.error(err)
      }
      process.exit(1)
    })
  } catch (err) {
    console.error('Failed to start server:', err.message || err)
    process.exit(1)
  }
}

start()
