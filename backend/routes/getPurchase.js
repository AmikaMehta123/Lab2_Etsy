var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");

router.post('/',checkAuth, function(req,res){

    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        var query = {user: req.body.user};
        var mysort ={orderId: 1};
        dbo.collection("purchase_table").find(query).sort(mysort).toArray(function(err, result) {
            if (err) 
        {
            console.log("items not recieved");
            res.end("items not recieved");
            throw err;
        }
        else if(result.length == 0)
        {
            console.log("No Items");
            res.status(204);
            res.end("No Items");
        }
        else {
            console.log("Items Received");
            res.status(200);
            res.send({result});
        }
        });
      });
      });

module.exports = router


