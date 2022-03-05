const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');


// makes stylesheet available to client along with app.use(express.static(path.join(__dirname, 'public'))); found below
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express(); // initialize express

//Since we set up the routes the way we did, we don't have to worry about importing multiple files for different endpoints. 
//The router instance in routes/index.js collected everything for us and packaged them up for server.js to use.
const routes = require('./controllers/');

const sequelize = require('./config/connection');

// set up Handlebars.js as your app's template engine of choice:
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// These are always required when you will POST/PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// used with path to make stylesheet available to client
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

app.use(require('./controllers/'));
//   turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});