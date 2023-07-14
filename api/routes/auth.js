const express = require('express');
const Auth = require('../Controller/authController.js');

const route = express.Router();



route.post('/register', Auth.Registeration );
route.post('/login', Auth.Login );
route.get('/logout', Auth.Logout );

module.exports = route;