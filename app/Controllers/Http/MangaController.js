'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Manga = use('App/Models/Manga');

/**
 * Resourceful controller for interacting with manga
 */
class MangaController {
    /**
     * Show a list of all manga.
     * GET manga
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({request, response, auth, view}) {
        let mangas;

        if (auth.user) {
            mangas = await auth.user.manga().fetch();
        } else {
            mangas = await Manga.all();
        }

        return view.render('index', {mangas: mangas.toJSON()});
    }

    /**
     * Render a form to be used for creating a new manga.
     * GET manga/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({request, response, view}) {
        return view.render('manga.addManga');
    }

    /**
     * Create/save a new manga.
     * POST manga
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({request, response}) {
        await Manga.create(request.only(['title', 'author', 'editor']));

        return response.route('index');
    }

    /**
     * Display a single manga.
     * GET manga/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({params, request, response, view}) {
        const manga = await Manga.query().where('id', '=', params.id).first();
        console.log(manga.toJSON());
        return view.render('manga.showManga', {
            manga: manga.toJSON()
        });
    }

    /**
     * Render a form to update an existing manga.
     * GET manga/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({params, request, response, view}) {
    }

    /**
     * Update manga details.
     * PUT or PATCH manga/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({params, request, response}) {
    }

    /**
     * Delete a manga with id.
     * DELETE manga/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({params, request, response}) {
    }
}

module.exports = MangaController
