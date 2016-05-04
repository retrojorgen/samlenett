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
	getGamesFromConsoleSlug: function (consoleSlug, successCallback, failCallback) {
		console.log('henter ut rader hest', consoleSlug);
		connection.query('SELECT * from consoles where slug = ? limit 1', [consoleSlug], function (err, rows, fields) {
			if(rows.length) {
				connection.query('SELECT games.title, games.slug, game_images.url from games left join game_images on games.id = game_images.game_id where games.console_id = ? group BY games.title', [rows[0].id], 
				function(gameserr, gamesrows, gamesfields) {
					successCallback({
						console: rows[0],
						games: gamesrows
					});
				});
			} else {
				failCallback([]);
			}
		});			
	},
  getGameFromSlug: function (consoleSlug, gameSlug, successCallback, failCallback) {
    connection.query('SELECT * from games, consoles where games.slug = ? and games.console_id = consoles.id and consoles.slug = ? limit 1', [gameSlug, consoleSlug], function(err, rows, fields) {
    	console.log(rows);
      if(rows.length) {
        connection.query('SELECT * from games-regions where games_id = ?', [rows[0].id], function(err, regionrows, regionfields) {
        	console.log(regionrows);
          connection.query('SELECT * from games-comments where games_id = ?', [rows[0].id], function(err, commentsrows, commentsfields) {
          	console.log(commentsrows);
          	connection.query('SELECT * from game-reviews where games_id = ?', [rows[0].id], function(err, reviewsrows, reviewsfields) {
          		console.log(reviewsrows);
          		successCallback({
          			game: rows,
          			regions: regionrows,
          			comments: commentsrows,
          			reviews: reviewsrows
          		});
          	});
          });
        });
      } else {
      	failCallback([]);
      }
    });
  },
  updateGame: function (gameSlug, values, successCallback, failCallback) {
    connection.query('UPDATE games SET ? where slug = "' + gameSlug + '"', values, function(err, regionrows, regionfields) {
    });     
  },
  updateGameRegion: function (gameSlug, values, successCallback, failCallback) {
    connection.query('UPDATE games SET ? where slug = "' + gameSlug + '"', values, function(err, regionrows, regionfields) {
    });     
  },
  searchForString: function (searchString, successCallback, failCallback) {
  	connection.query('SELECT games.title, games.slug, consoles.name FROM games, consoles WHERE MATCH (title) AGAINST (? IN NATURAL LANGUAGE MODE) AND games.console_id = consoles.id', [searchString], function (err, rows, fields) {

    });
  }
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



