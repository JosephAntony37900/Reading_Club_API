const express = require('express');
const bodyParser = require('body-parser');
const book = require('./routes/book');
const clubs = require('./routes/clubs');
const members = require('./routes/members');
const users = require('./routes/users');


const app = express();

app.use(bodyParser.json());

app.use('/', book);
app.use('/', users);
app.use('/', members);
app.use('/', clubs);


module.exports = app;