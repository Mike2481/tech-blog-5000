// // import the Sequelize constructor from the library

// const Sequelize = require('sequelize');

// // Passes database name, username, and password securely
// require('dotenv').config();

// // create connection to our database, pass in your MySQL information for username and password
// let sequelize;
// // use JAWSDB_URL for database server for use with Heroku
// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   });
// }
// // The new Sequelize() function accepts the database name, MySQL username, and MySQL password (respectively) as parameters, 
// // then we also pass configuration settings. Once we're done, we simply export the connection.

// module.exports = sequelize;
require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;