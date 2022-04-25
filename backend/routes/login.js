var app = require('express');
const router = app.Router();
const jwt = require('jsonwebtoken');
var mongoUtil = require( '../utils/mongoUtil' );


router.post('/', async function(req,res){

    const name = req.body.name;
    const password = req.body.password;
   

    // var MongoClient = require('mongodb').MongoClient;
    //var url = "mongodb://localhost:27017/";
    // var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";
    // MongoClient.connect(url).then(function(db) {
    
  //if (err) throw err;
  var dbo = await mongoUtil.connectToServer();
  // console.log(dbo)
  dbo.collection("login_table").find({name,password}).toArray(function(err, result) {

    if (err) 
    {
        console.log("invalid credentials");
      //  res.end("invlid credentials");
        throw err;
    }
    else if (result.length == 0 || password != result[0].password) 
        {
            console.log("invalid credentials");
            res.status(401)
          //  res.end("invlid credentials");
        }
    else
    {
        if (result) {
            const payload = { _id: result[0]._id, name: result[0].name};
            const token = jwt.sign(payload, "cmpe273_2022", {
            });
            res.status(200).end("JWT " + token);
            
        }
        
        // // console.log(result);    
        // console.log("succesfully logged in");
        // res.status(200);
        // res.send(name);
    } 
    console.log(result);
    db.close();
  });
});
// });

module.exports = router