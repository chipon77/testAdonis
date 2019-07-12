'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MangaUser extends Model {
    static get table () {
        return 'manga_user'
    }
}

module.exports = MangaUser
