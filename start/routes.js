'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', 'MangaController.index').as("layout.edge");

Route.get('addManga', 'MangaController.create').as('addManga');
Route.post('addManga/store', 'MangaController.store').validator('MangaCreate').as('storeManga');
Route.get('manga/:id', 'MangaController.show').as('show');


Route.on('/login').render('auth.login').as('login_view');
Route.post('/login', 'UserController.login').as('login');
Route.get('/logout', 'UserController.logout').as('logout');

Route.on('/signup').render('auth.signup').as('signup_view');
Route.post('/signup/store', 'UserController.store').validator('UserCreate').as('signup');

Route.get('/user', 'UserController.show').as('userShow').middleware('auth');
Route.post('/user/edit', 'UserController.update').as('userEdit').middleware('auth');
Route.post('/user/link', 'UserController.linkManga').as('linkManga').middleware('auth');

Route.get('login/google', 'LoginController.redirect').as('loginGoogle');
Route.get('authenticated/google', 'LoginController.callback');

Route.on('/websocket').render('chat').as('websocket').middleware('auth');
Route.get('/websocket/messages','MessageController.getMessage').as('getMessages').middleware('auth');