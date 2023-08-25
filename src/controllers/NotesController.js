const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body
    const user_id = request.params.user_id

    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id,
    })

    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      }
    })

    await knex('links').insert(linksInsert)

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      }
    })

    await knex('tags').insert(tagsInsert)

    return response.status(201).json({ message: 'Note created' })
  }

  async show(request, response) {
    const { id } = request.params

    const notes = await knex('notes').where({ id }).first()
    const tags = await knex('tags').where({ note_id: id }).orderBy('name')
    const links = await knex('links')
      .where({ note_id: id })
      .orderBy('created_at')

    if (!notes) {
      throw new AppError('Note not found')
    }

    return response.json({
      ...notes,
      tags,
      links,
    })
  }

  async delete(request, response) {
    const { id } = request.params

    const note = await knex('notes').where({ id }).first()

    if (!note) {
      throw new AppError('Note not found')
    }

    await knex('notes').where({ id }).delete()

    return response.json({ message: 'Note deleted' })
  }
}

module.exports = NotesController
