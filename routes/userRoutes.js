const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  uploadImageUser,
} = require('../controllers/userController');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('user'), getAllUsers);

  router
  .route('/uploadImage/:id')
  .post([authenticateUser, authorizePermissions('user')], uploadImageUser);

  router
  .route('/:id')
  .delete([authenticateUser, authorizePermissions('user')], deleteUser);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
