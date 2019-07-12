'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MangaUserSchema extends Schema {
  up () {
    this.create('manga_user', (table) => {
      table.increments()
      table.integer('manga_id').unsigned().references('id').inTable('manga')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_user')
  }
}

module.exports = MangaUserSchema
