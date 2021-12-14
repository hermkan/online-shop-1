const path = require('path');
const csrf = require('csurf');
const express = require('express');
const db = require('./data/database');
const addcsrfTokenMiddleware = require('./middleware/csrf-token');
const authRoutes = require('./routes/auth.routes');
const app = express();
app.use(csrf());
app.use(addcsrfTokenMiddleware);
app.use(authRoutes);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

db.connectToDatabase()
  .then(() => app.listen('3002'))
  .catch((e) => console.log(e, 'failed to connect to database'));
