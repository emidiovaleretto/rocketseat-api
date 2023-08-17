require('express-async-errors')

const AppError = require('./utils/AppError')

const express = require('express')

const migrationsRun = require('./database/sqlite/migrations')

const app = express()

const routes = require('./routes')

migrationsRun()

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    error: 'error',
    message: 'Internal Server Error',
  })
})

const PORT = 3333

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
