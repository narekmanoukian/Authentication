const Router = require('express')
const router = new Router
const UserController = require('../controllers.js/userController')
const userController = require('../controllers.js/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)

module.exports = router