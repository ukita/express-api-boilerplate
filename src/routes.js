const express = require('express');

const Router = express.Router();

const usersController = require('./controllers/users.controller');

Router.get('/users', usersController.index);
Router.post('/users', usersController.create);
Router.get('/users/:userId', usersController.show);
Router.put('/users/:userId', usersController.update);
Router.delete('/users/:userId', usersController.delete);

module.exports = Router;
