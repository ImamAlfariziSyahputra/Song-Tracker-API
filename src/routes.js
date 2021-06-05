const AuthControllerPolicy = require('./policies/AuthControllerPolicy');
const AuthController = require('./controllers/AuthController');
const SongsController = require('./controllers/SongsController');
const BookmarkController = require('./controllers/BookmarkController');

module.exports = (app) => {
  app.post(
    '/register',
    AuthControllerPolicy.register,
    AuthController.register,
  );
  app.post(
    '/login',
    AuthController.login,
  );

  app.get(
    '/songs',
    SongsController.all,
  );
  app.get(
    '/songs/:songId',
    SongsController.show,
  );
  app.post(
    '/songs',
    SongsController.store,
  );
  app.put(
    '/songs/:songId',
    SongsController.update,
  );

  app.get(
    '/bookmarks',
    BookmarkController.all,
  );
  app.post(
    '/bookmarks',
    BookmarkController.store,
  );
  app.delete(
    '/bookmarks/:bookmarkId',
    BookmarkController.delete,
  );
}