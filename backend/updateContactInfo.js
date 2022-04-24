var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const email = req.body.email;
    const address = req.body.address;
    const name = req.body.name;
  
    var sql = "UPDATE user_table SET email = ?, address= ? WHERE name = ?";

    con.query(sql,[email,address,name],function (err, result) {
        if (err) throw err;
        console.log("row has been updated");
        res.end("row updated");
    });
    });

module.exports = router



