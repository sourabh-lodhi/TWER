const router = require('express').Router({ mergeParams: true })

const auth = require('../middlewares')
const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getOneUser,
  updateUserStatus,
  salaryPassword,
  changePassword,
  updateProfile,
  updateUserAccount,
} = require('../controllers')
const { superAdmin } = require('../config')
const {
  userStatusValidation,
  userValidation,
  salaryPasswordValidation,
  changePasswordValidation,
  userAccountValidation,
} = require('../validation')
const { fileUpload } = require('../helpers/services/fileUploader')

const {
  checkRole,
  verifySuperAdminPassword,
  checkAndMakeDirectory,
} = require('../middlewares')

router.post(
  '/createUser',
  [auth.verifyToken],
  checkRole(superAdmin),
  userValidation,
  verifySuperAdminPassword,
  createUser,
)

router.get('/', [auth.verifyToken], checkRole(superAdmin), getUsers)

router.put('/updateUser', [auth.verifyToken], checkRole(superAdmin), updateUser)

router.put(
  '/updateStatus',
  [auth.verifyToken],
  checkRole(superAdmin),
  userStatusValidation,
  updateUserStatus,
)

router.put(
  '/changePassword',
  [auth.verifyToken],
  changePasswordValidation,
  changePassword,
)

router.put(
  '/uploadProfile',
  [auth.verifyToken],
  checkAndMakeDirectory('public/user/profiles'),
  fileUpload,
  updateProfile,
)
router.post(
  '/uploadProfile',
  [auth.verifyToken],
  checkAndMakeDirectory('public/user/profiles'),
  fileUpload,
  updateProfile,
)
router.post(
  '/salaryPassword',
  [auth.verifyToken],
  checkRole(superAdmin),
  salaryPasswordValidation,
  salaryPassword,
)
router.put(
  '/updateAcountDetail',
  [auth.verifyToken],
  userAccountValidation,
  updateUserAccount,
)

router.delete('/:id', [auth.verifyToken], checkRole(superAdmin), deleteUser)

module.exports = router
