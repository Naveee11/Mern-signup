const express = require('express');
const loginSign =express();

const signlogcontoller = require('../Controller/Controller');

loginSign.post('/login',signlogcontoller.login);
loginSign.post('/signup',signlogcontoller.signUp);


module.exports=loginSign;