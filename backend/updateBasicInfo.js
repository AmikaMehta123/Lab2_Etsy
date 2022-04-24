var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const name = req.body.name;
    const dob = req.body.dob;
    const city = req.body.city;
  
    var sql = "UPDATE user_table SET dob = ?, city= ? WHERE name = ?";


    con.query(sql,[dob,city,name],function (err, result) {
        if (err) throw err;
        console.log("row has been updated");
        res.end("row updated");
    });
    });

module.exports = router



