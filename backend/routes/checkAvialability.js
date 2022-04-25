var app = require('express');
const con = require('./../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post("/",checkAuth, async function(req,res) {

//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
//var url = "mongodb://localhost:27017/";

var query= {shop_name:req.body.shop_name}

    //MongoClient.connect(url, function(err, db) {
        var db = await mongoUtil.connectToServer();
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("shop_table").find(query).toArray(function(err, result) {
            if (err) 
        {
            console.log("shop name already exists");
            console.log(err)
            //throw err;
        }
        else if(result.length ==0)
            {
                res.status(200);
                console.log("you can create")
                res.send("can create a shop")
            }
            else{
                res.status(202)
                res.send("cannot create")
            }
        });
      });
      //});

module.exports = router
