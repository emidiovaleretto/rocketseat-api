const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')

const Router = require('express')

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/notes', notesRouter)

module.exports = routes
