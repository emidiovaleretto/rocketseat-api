const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    )

    if (checkUserExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hashedPassword],
    )

    return response.status(201).json({ message: 'User created' })
  }

  async update(request, response) {
    const { name, email, password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if (!user) {
      throw new AppError('User not found')
    }

    const checkEmailExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email],
    )

    if (checkEmailExists && checkEmailExists.id !== user.id) {
      throw new AppError('This email is already in use')
    }

    const hashedPassword = await hash(password, 8)

    user.name = name
    user.email = email

    await database.run(
      `UPDATE users SET 
        name = (?), 
        email = (?), 
        password = (?),
        updated_at = (?)
      WHERE id = (?)`,
      [name, email, hashedPassword, new Date(), id],
    )

    return response.status(200).json({ message: 'User updated' })
  }
}

module.exports = UsersController
