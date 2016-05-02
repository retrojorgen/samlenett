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
	getGamesFromConsoleSlug: function (consoleSlug, sucessCallback, failCallback) {
		console.log('henter ut rader');
		connection.query('SELECT id from consoles where slug = ? limit 1', [consoleSlug], function(err, rows, fields) {
			if(rows.length) {
				connection.query('SELECT games.title, games.slug, game_images.url from games left join game_images on games.id = game_images.game_id where games.console_id = ? group BY games.title', [rows[0].id], 
				function(err, rows, fields) {
					console.log(rows);
					if(rows) {
						sucessCallback(rows);
					}
				});
			}
		});			
	},
  getGameFromSlug: function (gameSlug, sucessCallback, failCallback) {
    console.log('henter ut rader');
    connection.query('SELECT * from games where slug = ? limit 1', [gameSlug], function(err, rows, fields) {
      if(rows.length) {
        connection.query('SELECT * from games-regions where games_id = ?', [rows.id], function(err, regionrows, regionfields) {
          connection.query('SELECT * from games-comments where games_id = ?', [rows.id], function(err, regionrows, regionfields) {

          });
        });
      }
    });
  },
  updateGame: function (gameSlug, values, sucessCallback, failCallback) {
    connection.query('UPDATE games SET ? where slug = "' + gameSlug + '"', values, function(err, regionrows, regionfields) {
    });     
  },
  updateGameRegion: function (gameSlug, values, sucessCallback, failCallback) {
    connection.query('UPDATE games SET ? where slug = "' + gameSlug + '"', values, function(err, regionrows, regionfields) {
    });     
  },
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



