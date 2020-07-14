var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :   'localhost',
    user    : 'root',
    password    :'',
    database    : 'simple'
});

connection.commit(function(err){
    if(!err){
        console.log("Database is connected");
    }else{
        console.log("Database error");
    }
});

module.exports = connection;
