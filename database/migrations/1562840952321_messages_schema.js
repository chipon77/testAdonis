'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
    up() {
        this.create('messages', (table) => {
            table.increments()
            table.string('id_channel', 254).notNullable()
            table.integer('id_client').notNullable().unsigned().references('id').inTable('users')
            table.string('content', 254).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('messages')
    }
}

module.exports = MessagesSchema
