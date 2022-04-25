var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");
var mongoUtil = require( '../utils/mongoUtil' );

router.post('/',checkAuth, async function(req,res){

    var newvalues={
        $set:
        {
        shop:req.body.shop,
        picture : req.body.img,
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity
        }
    }
    var myobj={
        name:req.body.name
    }

    //var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    // MongoClient.connect(url, function(err, db) {
        var db = await mongoUtil.connectToServer();    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("item_table").updateOne(myobj, newvalues, function(err,result) {
            if(err)
            { 
                console.log("item has not been updated");
                res.end("item has not been updated");
                throw err;
            }
            else if(result.length == 0)
            {
                console.log("item has not been updated");
                res.status(401);
                res.end("item has not been updated");
            }
            else
            {
                console.log(result);
                res.status(200);
                res.send({result});
            }
        });
      });
    //});

module.exports = router



