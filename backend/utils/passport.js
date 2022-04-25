"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require('jsonwebtoken');
//var { secret } = require("./config");


//var mongoUtil = require( './mongoUtil' );
//mongoUtil.connectToServer().then((db)=>console.log(db)).catch(err=>console.log(err));
//var dbo = db.db('etsy-database');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// var url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";

   
// MongoClient.connect(url).then(function(db) {
    
  //if (err) throw err;
//   var dbo = db.db("etsy-database");
// var dbo = mongoUtil.getDb();
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: "cmpe273_2022"
};
passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
        const user_id = jwt_payload._id;
        // dbo.collection("login_table").find({_id:user_id}).toArray(function(err, results) {
        //     if (err) {
        //         return callback(err, false);
        //     }
        //     if (results) {
        //         callback(null, results);
        //     }
        //     else {
        //         callback(null, false);
        //     }
        // });
    })
)

//db.close();

// }).catch(function(err){console.log(err)});

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });



// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log(user_id);
            

            Users.find({_id: user_id}, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


