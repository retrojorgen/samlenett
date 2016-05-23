var mysql = require('mysql');
var dbconfig = require('./database');
var slug = require('slug')
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = {
	getAllGames : function (callback) {
		//connection.connect();
		connection.query("SELECT * FROM games", function(err, rows) {
			if(rows.length) {
				callback(rows);
			} else {
				console.log("error");
			}

		});
		//connection.end();
	},
	getUsernameFromUsername: function (username, successCallback, failCallback) {
		console.log('SELECT * from users where username = ' + username + ' limit 1');
		connection.query('SELECT * from users where username = ? limit 1', [username], function (err, rows, fields) {

			if(rows && rows.length) {
				successCallback();
			} else {
				failCallback();
			}
		});
	},

	getConsolesAndGames: function (successCallback, failCallback) {
		connection.query("SELECT consoles.*, count(games.id) as games from consoles left join games on (consoles.id = games.console_id) group by consoles.name", function (err, rows, fields) {
			successCallback(rows);
		});
	},

	getRegionsFromConsoleSlug: function (consoleSlug, successCallback, failCallback) {
		connection.query("SELECT regions.name from regions left join consoles on(regions.console_id = consoles.id and consoles.slug = ?)", [consoleSlug], function (err, rows, fields) {
			successCallback(rows);
		});
	},

	getGameRegionsFromGameId: function (gameId, successCallback, failCallback) {
		connection.query('SELECT * from games where parent_id = ? limit 1', [gameId], function (err, rows, fields) {
			if(rows) {
				successCallback(rows);
			} else {
				failCallback(false);
			}
		});
	},
	getUserFromSlug: function (usernameSlug, successCallback, failCallback) {
		connection.query('SELECT * from users where slug = ? limit 1', [usernameSlug], function (err, rows, fields) {
			if(rows && rows.length) {
				successCallback(rows[0]);
			} else {
				failCallback(false);
			}
		});
	},

	getSlugFromUsername: function () {

	},

	getNickSlugfromNick: function (nick, successCallback, failCallback) {
		console.log('SELECT * from users where slug = ' + slug(nick) + ' limit 1');
		connection.query('SELECT * from users where slug = ? limit 1', [slug(nick)], function (err, rows, fields) {

			if(rows && rows.length) {
				successCallback();
			} else {
				failCallback();
			}
		});
	},
	getGamesFromConsoleSlug: function (consoleSlug, successCallback, failCallback) {
			console.log('henter ut rader hest', consoleSlug);
			connection.query('SELECT * from consoles where slug = ? limit 1', [consoleSlug], function (err, rows, fields) {
				if(rows.length) {
					connection.query('SELECT games.title, games.wiki_link, games.rarity, games.release_year, games.slug, game_images.url from games left join game_images on games.id = game_images.game_id where games.console_id = ? group BY games.title', [rows[0].id], 
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
	    connection.query('SELECT ga.id, ga.title, ga.release_date, ga.wiki_link, co.id as consoleId, co.name as consoleName from games as ga, consoles as co where ga.slug = ? and ga.console_id = co.id and co.slug = ? and ga.parent_id = "" limit 1', [gameSlug, consoleSlug], function(err, rows, fields) {
	      if(rows.length) {
	        connection.query('SELECT ga.id, ga.title, ga.release_date, ga.wiki_link, ga.rarity, re.id as regionId, re.name as regionName  from games as ga, regions as re where parent_id = ? and ga.region_id = re.id', [rows[0].id], function(err, regionrows, regionfields) {
	        	console.log(regionrows);
	          connection.query('SELECT * from games-comments where games_id = ?', [rows[0].id], function(err, commentsrows, commentsfields) {
	          	console.log(commentsrows);
	          	connection.query('SELECT * from regions where console_id = ?', [rows[0].consoleId], function(err, regionselectrows, commentsfields) {
	          	console.log(commentsrows);
		          	connection.query('SELECT * from game-reviews where games_id = ?', [rows[0].id], function(err, reviewsrows, reviewsfields) {
		          		console.log(reviewsrows);
		          		successCallback({
		          			game: rows[0],
		          			regions: regionrows,
		          			comments: commentsrows,
		          			reviews: reviewsrows,
		          			regionselect: regionselectrows
		          		});
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

