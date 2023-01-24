const Router = require('express');
const userController = require('../controllers/user-controller');
const {
  registrationValidation,
  authorizationValidation,
} = require('../middlewares/users-validation');

const router = new Router();

router.post(
  '/registration',
  registrationValidation,
  userController.registration
);
router.post(
  '/login',
  authorizationValidation,
  userController.login
);
router.get(
  '/logout',
  userController.logout
);
router.get(
  '/refresh',
  userController.refresh
);

module.exports = router;
