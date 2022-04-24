var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");

router.post('/',checkAuth, function(req,res){
    var myobj={
        shop:req.body.shop,
        owner : req.body.owner,
        sale_count : req.body.sale_count,
        image : req.body.img
    }

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    
        if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("shop_table").insertOne(myobj,function(err, result) {
            if (err) 
            {
            console.log("shop details not added");
            res.end("shop details not added");
            throw err;
            }
            else{
            console.log("shop details have been added");
            res.end("shop details have been added");
            }
        });
      });
    });
module.exports = router


