const express = require('express');





// initialize express
const app = express();

const routes = require('./controllers/api');
// we're importing the connection to Sequelize from config/connection.js
const sequelize = require('./config/connection');



const PORT = process.env.PORT || 3001;

// These are always required when you will POST/PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//   turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});