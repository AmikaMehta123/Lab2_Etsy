var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");

router.post('/',checkAuth, function(req,res){


    var newvalues={
        $set:
        {
        image : req.body.img
        }
    }
    var myobj={
        shop:req.body.shop
    }
    console.log(req.body)

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("shop_table").updateOne(myobj, newvalues, function(err,result) {
            if (err) 
        {
            console.log("items not recieved");
            res.end("items not recieved");
            throw err;
        }
        else {
            // console.log("Items Received");
            // res.status(200);
            res.send("Edited Image")
        }
        });
      });
    });
    

module.exports = router


