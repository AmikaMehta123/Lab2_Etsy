const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('etsy-database');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};