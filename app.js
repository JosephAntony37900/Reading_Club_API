
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const book = require('./routes/book');
const clubs = require('./routes/clubs');
const members = require('./routes/members');
const users = require('./routes/users');
const coments = require('./routes/coment');


const app = express();

app.use(bodyParser.json());

app.use(cors());



app.use('/', book);
app.use('/', users);
app.use('/', members);
app.use('/', clubs);
app.use('/', coments)



module.exports = app;