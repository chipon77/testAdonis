'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MangaSchema extends Schema {
    up() {
        this.create('manga', (table) => {
            table.increments()
            table.string('title', 254).notNullable().unique()
            table.string('author', 254).notNullable()
            table.string('editor', 254).notNullable()
            table.string('year', 254)
            table.timestamps()
        })
    }

    down() {
        this.drop('manga')
    }
}

module.exports = MangaSchema
