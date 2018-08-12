var express=require("express");
var app=express();
var path=require('path');
var cors=require('cors')
var mysql = require('mysql');
session = require('express-session')
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'Shopping-Online'
// });
app.use(cors());
 var nav=require('./nav');
 

// con.connect((err) => {
//     if (err) {
//         console.log("Can not connect to DB");
//         console.log(err);
        
//         return;
//     }
//     console.log('Connected');
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/Shopping-Online'));

app.use(nav);


app.listen(8080, ()=> {
    console.log("8080 is ready");
});