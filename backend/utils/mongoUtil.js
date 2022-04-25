const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://AmikaMehta:AmikaMehta@cluster0.busbs.mongodb.net/etsy-database?retryWrites=true&w=majority";

var client;

module.exports = {

  connectToServer: async function() {
    client = await MongoClient.connect( url,  { useNewUrlParser: true }).then(function( client ) {
      // _db  = client.db('etsy-database');
      return client
    } ).catch(err=>{console.log(err)});
    return client;
  },

  getDb: function() {
    return client.db('etsy-database');
  }
};