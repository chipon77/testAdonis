'use strict'

class MangaCreate {
    get rules() {
        return {
            'title': 'required|unique:manga',
            'author': 'required',
        }
    }

    get messages() {
        return {
            'required': 'Woah now, {{ field }} is required.',
            'unique': 'Wait a second, the {{ field }} already exists'
        }
    }

    async fails(error) {
        this.ctx.session.withErrors(error)
        .flashAll();

        return this.ctx.response.redirect('back');
    }
}

module.exports = MangaCreate
