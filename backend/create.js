var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const name = req.body.name;
    const dob = req.body.dob;
    const city = req.body.city;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const address = req.body.address;
    const country = req.body.country;

    // var records = [
    //     [1, 'Yashwant', '29-12-1998', 'pune', 'amika@gmail.com', '9881240190', 'female', 'xxx']
    // ];

    //Insert a record in the "customers" table:
    var sql = `INSERT INTO user_table (name,dob,city,email,phone,address,gender,country) VALUES ('${name}','${dob}','${city}','${email}','${phone}','${address}','${gender}','${country}')`
    con.query(sql, function (err, result) {
        if (err) 
        {
            console.log("user not created");
            res.end("user not created");
            throw err;
        }
        else{
        console.log("user has been created");
        res.end("user has been created");
        }
    });
    });

module.exports = router


