var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");

router.post('/',checkAuth, function(req,res){
    
   
    var newvalues={
        $set:
        {
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        quantity : req.body.quantity,
        name : req.body.name,
        picture : req.body.img,
        }   
    }
    var myobj={
        id:req.body.id
    }

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
   // var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("item_table").updateOne(myobj, newvalues, function(err,result) {
            if (err) {
                console.log("category has not been updated");
                res.end("category has not been updated");
                throw err;
            }
            else {
                console.log("category updated");
                res.end("categoty updated");
            } 
        });
      });
    });

module.exports = router



