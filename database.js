var mysql = require('mysql');
var slug  = require('slug');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Tufte1969',
  database : 'samlenett',
  multipleStatements: true
});




module.exports = {
	
}

/**
connection.query('SELECT title,id from games where console_id like 1', function(err, rows, fields) {
  if (err) throw err;
  console.log({'slug': slug(rows[0].title).toLowerCase(), 'id': rows[0].id});
  
 
  //	if (err) throw err;

  rows.forEach(function (row) {
  	connection.query("UPDATE games SET slug = ? where id = ?", [slug(row.title).toLowerCase(), row.id]);
  });

});
**/



