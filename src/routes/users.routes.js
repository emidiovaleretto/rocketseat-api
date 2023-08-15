const UsersController = require('../controllers/UsersController')

const Router = require('express')

const usersRouter = Router()

const usersController = new UsersController

usersRouter.post('/', usersController.create)

module.exports = usersRouter
