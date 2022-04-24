var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    const shop = req.body.shop;
    const name = req.body.name;
    const category = req.body.category;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    //const image = req.body.image;

    
    var sql = `INSERT INTO item_table (shop,name,category,description,price,quantity) VALUES ('${shop}','${name}','${category}','${description}','${price}','${quantity}')`
    con.query(sql, function (err, result) {
        if (err) 
        {
            console.log("items not added");
            res.end("items not created");
            throw err;
        }
        else if(result.length == 0)
        {
        console.log(result[0]);
        console.log("shop details not added");
        res.end("shop details not added");
        }
        else {
        console.log("items have been added");
        res.end("items have been added");
        }
    });
    });

module.exports = router


