const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function() {
    MongoClient.connect( url,  { useNewUrlParser: true }).then(function( client ) {
    
      _db  = client.db('etsy-database');
      return _db
    } ).catch(err=>{console.log(err)});
  },

  getDb: function() {
    return _db;
  }
};