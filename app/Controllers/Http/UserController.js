'use strict'
const User = use('App/Models/User');
const Manga = use('App/Models/Manga');

class UserController {
    /**
     * login the user.
     */
    async login({request, auth, response, session}) {
        const {email, password} = request.all();

        try {
            await auth.attempt(email, password);

            return response.route('layout.edge');
        } catch (error) {
            session.flash({loginError: 'These credentials do not work.'})

            return response.route('login_view');
        }
    }

    /**
     * logout the user.
     */
    async logout({auth, response}) {
        await auth.logout();

        return response.route('layout.edge');
    }

    /**
     * Store new user.
     */
    async store({request, response, auth}) {
        const user = await User.create(request.only(['username', 'email', 'password']));
        await auth.login(user);

        return response.route('layout.edge');
    }

    /**
     * show user profile.
     */
    async show({params, request, response, view}) {
        const mangas = await Manga.all();

        return view.render('showUser', {mangas: mangas.toJSON()});
    }

    /**
     * update data user.
     */
    async update({params, request, response, view, auth}) {
        await User.query().where('id', auth.user.id).update(request.only('username'));

        return response.route('userShow');
    }

    /**
     * redirect to the google page.
     */
    async linkManga({params, request, response, view, auth}) {
        request.all().manga.forEach(function (element) {
            if (auth.user.manga().where('manga.id', element).fetch() !== []) {
                auth.user.manga().attach(element);
            }
        });
        return response.route('userShow');
    }

}

module.exports = UserController
