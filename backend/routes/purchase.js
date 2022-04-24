var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");

router.post('/',checkAuth, function(req,res){

    var item_ids = []
    var shops = []
    var quantity = []
    var inStockQuantity = []
    req.body.forEach(element => {
        item_ids.push(element.item._id)
        shops.push(element.item.shop)
        quantity.push(element.quantity)
        inStockQuantity.push(element.item.quantity)
        console.log(element.item);
    });
    

    
    var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb://localhost:27017/";
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    var ObjectId = require('mongodb').ObjectId;
    MongoClient.connect(url, function(err, db) {
    
        //if (err) throw err;
        var dbo = db.db("etsy-database");
        for (let index = 0; index < item_ids.length; index++) {
            var q = inStockQuantity[index] - quantity[index]
            var newvalues={
                $set: {
                    quantity : q
                }
            }
            var myobj={
                _id: ObjectId(item_ids[index])
            }

            dbo.collection("item_table").updateOne(myobj, newvalues, function(err,result) {
           // dbo.collection("item_table").updateOne(myobj, newvalues, function(err,result) {
                if(err) { 
                    console.log("row has not been updated");
                    res.end("row not updated");
                    throw err;
                } 
                else {                                
                    console.log("Item Updated - " + item_ids[index]);
                }
            });
            var query = { shop: shops[index]}
            dbo.collection("shop_table").find(query).toArray(function(err, result) {
                if (err) throw err;
                var sc = result[0].sale_count + quantity[index]
                var shopNewValues = {
                    $set: {
                        sale_count: sc
                    }
                }
                dbo.collection("shop_table").update(query, shopNewValues, function(err,result) {
                    if(err) { 
                        console.log("row has not been updated");
                        res.end("row not updated");
                        throw err;
                    } 
                    else {                                
                        console.log("Sale Count Updated - " + shops[index]);
                    }
                });
            });

            // dbo.collection("shop_table").updateOne(myobj, newvalues, function(err,result) {
            //     if (err) {
            //         console.log("items not recieved");
            //         res.end("items not recieved");
            //         throw err;
            //     } else {
            //         res.send("Edited Image")
            //     }
            // });


        }
      });
    res.end("DONE")
});

module.exports = router



