var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post('/',checkAuth, async function(req,res){

   
    
    //Insert a record in the "customers" table:
    
    //var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    var query= {name:req.body.name}

    //MongoClient.connect(url, function(err, db) {
        
        var db = await mongoUtil.connectToServer();
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("user_table").find(query).toArray(function(err, result) {
            if (err) 
        {
            console.log("user data not avialable");
            res.end("user data not avialable");
            throw err;
        }
        else if(result.length == 0)
        {
            console.log("invalid data");
            res.status(401)
            res.end("invlid data");
        }
        else{
            console.log(result);
            res.send({result});
        }
        });
      });
    //});

module.exports = router


