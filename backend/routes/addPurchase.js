var app = require('express');
const con = require('../pool');
const router = app.Router();
const { checkAuth } = require("../utils/passport");


router.post('/', checkAuth, function(req,res){
    var array = req.body.cart;
    const rtotal = req.body.total;
    const ruser = req.body.user;
    const rorderId = Math.floor(Math.random() * 10000)
    var myobj = []
    array.forEach(element => {
        console.log("-------------------------------------------")
        console.log(element)
        console.log("-------------------------------------------")
        myobj.push({
            itemid : element.item.id,
            itemName : element.item.name,
            quantity : element.quantity,
            category : element.item.category,
            shop : element.item.shop,
            price : element.item.price,
            giftOption: element.giftOption,
            giftNote: element.giftNote,
            total : rtotal,
            user: ruser,
            orderId: rorderId
        });
        
        //Insert a record in the "customers" table:
        // var sql = `INSERT INTO purchase_table (itemid,user,itemName,quantity,category,shop,price,orderId, total) VALUES (?,?,?,?,?,?,?,?,?)`
        // con.query(sql,[itemid,user,itemName,quantity,category,shop,price,orderId, total],function (err, result) {
            
        // });
    });
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    //var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    
        if (err) throw err;
        var dbo = db.db("etsy-database");
        dbo.collection("purchase_table").insertMany(myobj,function(err, result) {
            if (err) 
            {
                console.log("items have not been created");
                res.end("items have not been created");
                throw err;
            }
            else{
                console.log("Inserted");
                // res.status(200);
                // res.send("Inserted");
            }
        });
      });
    res.send("Inserted")
});

module.exports = router


