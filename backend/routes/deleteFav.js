var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post('/',checkAuth, async function(req,res){
    var db = await mongoUtil.connectToServer();
 
    //var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    var myquey ={user: req.body.user,fav:req.body.id};
    //MongoClient.connect(url, function(err, db) {
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("favourite_table").deleteOne(myquey, function(err,result) {
            if (err) {
                console.log("error")
                throw err;
            }
            else{
                console.log("row has been updated");
                res.end("Row Deleted");
            }
        });
      });
    //});

module.exports = router