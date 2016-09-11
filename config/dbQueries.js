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


	getRegionsFromConsoleId: function (regionId, callback) {
		connection.query('select * from regions where console_id = ?', regionId, function (err, rows, fields) {
			callback(rows);
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

	getConsoleFromSlug: function (consoleSlug, callback) {
		connection.query('SELECT name, created_time, wiki_link, slug, release_date from consoles where slug = ? limit 1', consoleSlug, function (err, rows, fields) {
			callback(rows[0]);
		});
	},

	getConsoleIdFromSlug: function (consoleSlug, callback) {
		connection.query('SELECT id from consoles where slug = ? limit 1', consoleSlug, function (err, rows, fields) {
			callback(rows[0]);
		});
	},

	getConditionsFromConsoleId: function (consoleId, callback) {
		connection.query('select * from conditions where console_id = ? order by state', consoleId, function (err, rows, fields) {
			console.log(rows, consoleId, ' her');
			if(err || !rows) {
				callback([]);
			} else {
				callback(rows);
			}
		});
	},
	getPublishers: function (callback) {
		connection.query('select * from Publishers order by name', function (err, rows, fields) {
			console.log(rows.length);
			callback(rows);
		});
	},

	isGame: function (gameTitle, callback) {
		connection.query('select id from games where title = ? limit 1', gameTitle, function (err, rows, fields) {
			if(err)
				console.log('fikk denne erroren ', err);
			if(err || rows && rows.length <= 0)
				callback(false);
			else
				callback(rows);
		})
	},

	isGameVariant: function (gameTitle, attr1, attr2, attr3, consoleId, parentId, callback) {
		connection.query('select * from games where attr1 = ? and attr2 = ? and attr3 = ? and console_id = ? and parentId = ? limit 1', 
			[attr1, attr2,attr3, consoleId, parentId], function (err, rows, fields) {
				if(err || rows && rows.length <= 0) {
					callback(false);
				} else {
					callback(rows);	
				}
				
			});
	},


	addGameVariant: function (gameTitle, attr1, attr2, attr3, consoleId, parentId, callback) {
		connection.query("insert into games values(NULL, ?, ?, NULL, NULL, NULL,'','', ?, 0, 0, '', NULL, ?,?,?, '', '', 1, 1,1)", [gameTitle, consoleId, parentId, attr1,attr2,attr3], function (err, rows, fields) {
			//console.log('la til spill ' + err + ' ' + rows);
			if(callback())
				callback(rows);
		})
	},



	isPublisher: function (publisherTitle, callback) {
		connection.query('select * from Publishers where name = ?', publisherTitle, function (err, rows, fields) {
			if(err || rows && rows.length <= 0) {
				callback(false);
			} else {
				callback(rows);	
			}
		});
	},

	addPublisher: function (publisherTitle, callback) {
		connection.query("INSERT INTO Publishers VALUES (NULL, ?, CURRENT_TIMESTAMP, '')", publisherTitle, function (err, rows, fields) {
			var returnvalue = false;
			if(err || rows && rows.length <= 0) {
				returnvalue = false;
			} else {
				returnvalue = rows;
			}
			if(callback)
				callback(returnvalue);
		});
	},

	getParentGamesFromConsoleId: function (consoleId, callback) {
		connection.query('select * from games where parent_id = 0 and console_id = ? order by id', consoleId, function (err, rows, fields) {
			callback(rows);
		});
	},

	getChildGamesFromConsoleId: function (consoleId, callback) {
		connection.query('select * from games where parent_id != 0 and console_id = ? order by id', consoleId, function (err, rows, fields) {
			callback(rows);
		});
	},


	addGame: function (gameTitle, consoleId, callback) {
		connection.query("insert into games values(NULL, ?, ?, NULL, NULL, NULL,'',?, 0, 0, 0, '', NULL, 0,0,0, '', '', 1, 1,1)", [gameTitle, consoleId, slug(gameTitle)], function (err, rows, fields) {
			if(err)
				console.log(err);
			//console.log('la til spill ' + gameTitle);
			if(callback)
				callback();
		})
	},

	setVariantAsUnreleased: function (parentId, regionId, callback) {
		console.log('update games set released = 0 where parent_id = ' + parentId + ' and region_id = ' + regionId);
		connection.query('update games set released = 0 where parent_id = ? and region_id = ?', [parentId, regionId], function (err, rows, fields) {
			if(callback)
				callback();
		});
	},

	getGamesFromConsoleSlug: function (consoleSlug, successCallback, failCallback) {
			console.log('henter ut rader hest', consoleSlug);
			connection.query('SELECT * from consoles where slug = ? limit 1', [consoleSlug], function (err, rows, fields) {
				if(rows.length) {
					connection.query('SELECT * from games where console_id = ? and parent_id = 0 order BY title', [rows[0].id], 
					function(gameserr, gamesrows, gamesfields) {
						connection.query('SELECT regions.* from regions where regions.console_id = ?', [rows[0].id],
						function (regionserr, regionsrows, regionsfields) {
							connection.query('SELECT * from games where console_id = ? and parent_id != 0 and released = 1 order BY title', [rows[0].id], function (childrenerr, childrenrows, childrenfields) {
								successCallback({
									regions: regionsrows,
									console: rows[0],
									games: gamesrows,
									children: childrenrows
								});
							});
						});
					});
				} else {
					failCallback([]);
				}
			});			
		},	
	  getGameFromSlug: function (gameSlug, successCallback, failCallback) {
	    connection.query('select games.id, games.title, consoles.name from games\n' +
						 'left join consoles on consoles.id = games.console_id\n' +
						 'where games.slug = ?\n' +
						 'and games.parent_id = 0' +
						 'limit 1', [gameSlug], function(err, rows, fields) {
	      if(rows.length) {
	      		// find variants
	      		connection.query('select games.id, games.title, consoles.name from games\n' +
						 'left join consoles on consoles.id = games.console_id\n' +
						 'where games.parent_id = ?' +
						 '', [rows[0].id], function(err, variantRows, fields) {
						 	successCallback({
						 		game: rows[0],
						 		variants: variantRows
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

