const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  port: "3306",
  database: "cadastro",
});

connection.connect((err) => {
  if (err) return console.log(err);
});

module.exports = connection;
