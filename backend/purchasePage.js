var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const shop_name = req.body.name;
    
    var sql = `selecet picture,shop_name,item_name,quantity,price from cart_table where id= ?`
    con.query(sql, `${id}`,function (err, result) {
        if (err) 
        {
            console.log("items not recieved");
            res.end("items not recieved");
            throw err;
        }
        else if(result.length == 0)
        {
            
        console.log(result[0]);
        console.log("items have been recieved");
        res.end("items have been recieved");
        }
        else {
        console.log("items have been recieved");
        res.end("items have been recieved");
        }
    });
    });

module.exports = router


