var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const shopName = req.body.shop_Name;

    var sql = `INSERT INTO shop_Name (shop_Name) VALUES ('${shopName}')`
    con.query(sql, function (err, result) {
        if (err) 
        {
            console.log("shop name already exists");
            res.end("shop name already exists");
            //throw err;
        }
        else{
        console.log("shop name is aviable");
        res.end("shop name is avialable");
        }
    });
});

module.exports = router