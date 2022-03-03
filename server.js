const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');





// initialize express
const app = express();

const routes = require('./controllers/');
// we're importing the connection to Sequelize from config/connection.js
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super Secret Secret',
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db:sequelize})
};

app.use(session(sess))



const PORT = process.env.PORT || 3001;

// These are always required when you will POST/PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))

app.use(routes);

//   turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});