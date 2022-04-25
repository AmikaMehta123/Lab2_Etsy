var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post('/',checkAuth, async function(req,res){

    var myobj={
         user : req.body.user,
         id: req.body.id,
         shop : req.body.shop,
         item_name : req.body.item_name,
         picture : req.body.picture,
         category : req.body.category,
         description : req.body.description,
         price : req.body.price,
         quantity : req.body.quantity,
    }

    // var MongoClient = require('mongodb').MongoClient;
    // var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    // MongoClient.connect(url, function(err, db) {
        var db = await mongoUtil.connectToServer();
        // var dbo = db.db('etsy-database');
        // if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("favourite_table").insertOne(myobj,function(err, result) {
            if (err) {
                console.log("error")
                throw err;
            }
            else{
                console.log("row has been updated");
                res.end("Row Added");
            }
        });
      });
    // });



module.exports = router