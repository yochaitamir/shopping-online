var express=require("express");
var app=express();
var path=require('path');
var cors=require('cors')
var mysql = require('mysql');
session = require('express-session')
var fileUpload = require('express-fileupload');

app.use(cors());
 var nav=require('./nav');
 


app.use(express.static('dist/Shopping-Online'));
app.use(express.static('uploads'));
app.use(express.static('api'));
app.use(nav);


app.listen(8080, ()=> {
    console.log("8080 is ready");
});