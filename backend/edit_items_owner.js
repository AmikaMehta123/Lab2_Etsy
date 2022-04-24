var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const name = req.body.name;
    const category = req.body.category;
  
    var sql = "UPDATE item_table SET category = ? WHERE name = ?";


    con.query(sql,[`${category}`,`${name}`],function (err, result) {
        if (err) 
        {
        console.log("category has not been updated");
        res.end("category has not been updated");
        throw err;
        }
        else if(result[0] == null)
        {
        console.log(result[0]);
        console.log("category not updated");
        res.end("categoty not updated");
        } 
        else
        {
        console.log(result);    
        console.log("category is updated");
        res.end("category updated");
        }
    });
    });

module.exports = router



