const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "ensembleSample"
});

connection.connect(error => {
    if(error) throw error;
    console.log("Successfully connected to database");
});

module.exports = connection;
