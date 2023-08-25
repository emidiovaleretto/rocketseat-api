const NotesController = require('../controllers/NotesController')

const { Router } = require('express')

const notesRouter = Router()

const notesController = new NotesController()

notesRouter.post('/:user_id', notesController.create)
notesRouter.get('/:id', notesController.showNotes)

module.exports = notesRouter
