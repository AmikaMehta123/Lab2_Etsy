var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post('/',checkAuth, async function(req,res){

   
    //var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    var query= {user:req.body.user}

    //MongoClient.connect(url, function(err, db) {
        var db = await mongoUtil.connectToServer();
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("favourite_table").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("row has been updated");
          
            res.send({result})
        });
      });

    //});
module.exports = router



