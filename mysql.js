const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "root",
    "password": process.env.MYSQL_PASSWORD ,
    "database": "projeto_nodejs",
    "host" : "127.0.0.1",
    "port" : 3306
});

exports.pool = pool;