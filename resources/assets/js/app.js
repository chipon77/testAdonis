try {
    require('@babel/polyfill/dist/polyfill');
    window.adonis = require('@adonisjs/websocket-client/dist/Ws.browser');
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('bootstrap');
} catch (e) {
}
require('./test')
require('./chat')


