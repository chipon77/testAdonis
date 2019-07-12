'use strict'

const User = use('App/Models/User');

class LoginController {
    /**
     * redirect to the google page.
     */
    async redirect({ally}) {
        await ally.driver('google').redirect()
    }

    /**
     * Callback of google.
     */
    async callback({ally, auth, response}) {
        try {
            const fbUser = await ally.driver('google').getUser()

            // user details to be saved
            const userDetails = {
                username: fbUser.getName(),
                email: fbUser.getEmail(),
                login_source: 'google'
            }

            // search for existing user
            const whereClause = {
                email: fbUser.getEmail()
            }

            const user = await User.findOrCreate(whereClause, userDetails)
            await auth.login(user)

            return response.route('userShow');
        } catch (error) {
            console.log(error)
            return 'Unable to authenticate. Try again later'
        }
    }
}

module.exports = LoginController
