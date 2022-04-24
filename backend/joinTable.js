var app = require('express');
const con = require('./pool');
const router = app.Router();

router.post('/', function(req,res){

    
    connection.connect((error) => {
        if (error) throw error;
        const query = 'SELECT * ' + 
                      'FROM `item_table` ' +
                      'JOIN `shop`_table ON `user_table`.`name` = `shop_table`.`name`';
    
        connection.query(query, (error, result) => {   // sends queries
            connection.end();                          // closes connection
            if (error) throw error;
            console.log(result);
        });
    });
    });

module.exports = router


