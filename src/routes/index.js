const usersRouter = require('./users.routes')

const Router = require('express')

const routes = Router()

routes.use('/users', usersRouter)

module.exports = routes
