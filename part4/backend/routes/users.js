const usersRouter = require('express').Router()
const usersController = require('../controllers/users')

usersRouter.get('/', usersController.getAllUsers)
usersRouter.get('/:id', usersController.getUserByID)
usersRouter.post('/', usersController.newUser)
usersRouter.put('/:id', usersController.editUser)
usersRouter.delete('/:id', usersController.deleteUser)

module.exports = usersRouter