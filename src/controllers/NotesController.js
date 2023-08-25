const knex = require('../database/knex')

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
}

module.exports = NotesController
