var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

//select * from item_table;
router.get('/', checkAuth,async function(req,res){
    
//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
//var url = "mongodb://localhost:27017/";

    //MongoClient.connect(url, function(err, db) {
        var db = await mongoUtil.connectToServer();
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("item_table").find({}).toArray(function(err, result) {
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
                console.log(result);
                res.send({result});
            }
        });
      });
      //});
      

   

module.exports = router


