const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : "root",
    "password": process.env.MYSQL_PASSWORD ,
    "database": "projeto_nodejs",
    "host" : process.env.MYSQL_HOST,
    "port" :  process.env.MYSQL_PORT
});

exports.pool = pool;