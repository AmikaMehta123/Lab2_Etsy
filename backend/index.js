//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
// var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');

//var create = require('./create');
var signUp = require('./routes/signUp');
var additems = require('./routes/additems');
var getitems = require('./routes/getitems');
var updateitems = require('./routes/updateitems');
//var checkName = require('./checkName');
//var updateBasicInfo = require('./updateBasicInfo');
//var updateContactInfo = require('./updateContactInfo');
var login = require('./routes/login');
//var create_items = require('./create_items');
//var edit_items_owner = require('./edit_items_owner');
var edit_item_user = require('./routes/edit_item_user');
var getPurchase = require('./routes/getPurchase');
var createShopPage = require('./routes/createShopPage');
var joinTable = require('./joinTable');
var getUser = require('./routes/getUser');
var updateProfile = require('./routes/updateProfile');
var checkAvialability = require('./routes/checkAvialability');
var viewitem = require('./routes/viewItem');
var getShops = require('./routes/getShops');
var purchase = require('./routes/purchase');
var favourites = require('./routes/getFavourites');
var addfav = require('./routes/addFav');
var deletefav = require('./routes/deleteFav');
var editImage = require('./routes/editImage')
var addPurchase = require('./routes/addPurchase')
var mongoUtil = require( './utils/mongoUtil' );

var db = mongoUtil.connectToServer();
console.log(db)

//use cors to allow cross origin resource sharing
app.use(cors({ origin: ['http://localhost:3000'], methods: ["GET", "POST"], credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        res.setHeader('Cache-Control', 'no-cache');
    next();
  });

 

//app.use('/',create);
app.use('/signUp',signUp);
app.use('/additems', additems);
app.use('/getitems', getitems);
app.use('/updateitems', updateitems);
//app.use('/',checkName);
//app.use('/', updateBasicInfo);
//app.use('/', updateContactInfo);
app.use('/login', login);
//app.use('/', create_items);
//app.use('/', edit_items_owner);
app.use('/editItem', edit_item_user);
app.use('/createShopPage', createShopPage);
app.use('/', joinTable);
app.use('/getUser', getUser);
app.use('/updateProfile', updateProfile);
app.use('/checkAvialability', checkAvialability);
app.use('/viewitem', viewitem);
app.use('/getShops', getShops);
app.use('/purchase', purchase)
app.use('/getFavourites', favourites);
app.use('/addfav', addfav);
app.use('/deletefav', deletefav);
app.use('/editImage', editImage);
app.use('/addPurchase', addPurchase)
app.use('/getPurchase', getPurchase)
app.listen(3002 , function () {
    console.log("Server listening on port 3002");
});