const multer = require('multer');

const {
  UserController, LocationController, SublocationController
} = require('./../controller');

const { auth } = require('./../middlewares');
const { auth_non_active } = require('./../middlewares');

module.exports = (app) => {
  // End Users
  app.post('/user', UserController.create);
  app.get('/user', auth, UserController.get);
  app.get('/user/refresh_token', auth, UserController.refreshToken);
  app.post('/user/verify_code', auth_non_active, UserController.verifyCode);
  app.get('/user/init', UserController.seedUsers);

  
  
};
