'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnGoogleSchema extends Schema {
    up() {
        this.table('users', (table) => {
            table.string('login_source', 255)
            table.string('token', 255)
            table.string('password').alter().nullable()
        })
    }

    down() {
        this.table('users', (table) => {
            table.dropColumn('login_source')
            table.dropColumn('token')
            table.string('password').alter().notNullable()
        })
    }
}

module.exports = AddColumnGoogleSchema
