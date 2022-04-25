const { name } = require('ejs');
var app = require('express');
//const con = require('../pool');
const router = app.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
var mongoUtil = require( '../utils/mongoUtil' );
// var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
// var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";

router.post('/', async (req,res)=>{
//const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)
// MongoClient.connect(url, function(err, db) 
// {
  // if (err) throw err;
  var db = await mongoUtil.connectToServer();
  var dbo = db.db("etsy-database");

  

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

        // Check if user exists
        query= {email:req.body.email}
        dbo.collection("login_table").find(query).toArray(function(err, result) {
          if (err) 
          {
              console.log("user already exists");
              console.log(err)
              //throw err;
          }
          else if(result.length ==0)
              {
                  res.status(200);
                  console.log("you can create an account")
                  res.send("can create an account")
              }
              else{
                  res.status(202)
                  res.send("cannot create an account")
              }

            // Hash password
            // const salt = await bcrypt.genSalt(10)
            // const hashedPassword = await bcrypt.hash(password, salt)


              //hashedPassword
      var myobj = { name: name, email: email, password: password};
      dbo.collection("login_table").insertOne(myobj, function(err,res1) {
        console.log("============", res1);
        // if (res1) {
        //   res.status(201).json({
        //     // _id: user.id,
        //     // name: user.name,
        //     // email: user.email,
        //     token: generateToken(res1.insertedId),
        //   })
        // } else {
        //   res.status(400)
        //   throw new Error(err)
        // }
        // console.log(res1)
      });
    });


});

// });
//router.post('/signup',registerUser);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
module.exports = router
