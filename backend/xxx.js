
var mysql = require('mysql');


const express = require('express');
//const db = require('./config/db')
const cors = require('cors')


var con = mysql.createConnection({
    host     :  'etsy-database-1.cegdotowuytk.us-east-1.rds.amazonaws.com',
    user     : 'amikauser',
    password : 'amikauser',
    port : 3306,
    database : 'etsydb'
});


app.post('/', function(req,res){

const name = req.body.userName;
const dob = req.body.title;
const city = req.body.text;
const email = req.body.email;
const phone = req.body.phone;
const gender = req.body.gender;
const address = req.body.address;

// var records = [
//     [1, 'Yashwant', '29-12-1998', 'pune', 'amika@gmail.com', '9881240190', 'female', 'xxx']
// ];

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  //Insert a record in the "customers" table:
  var sql = "INSERT INTO user_table (name, dob,city,email,phone,gender,address) VALUES (?,?,?,?,?,?,?)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

});