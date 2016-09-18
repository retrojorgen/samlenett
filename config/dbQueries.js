var shortid = require('shortid');

module.exports = function (models, slug) {

	shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
	
	var User = models.User;
	var Game = models.Game;
	var Settings = models.Settings;
	var Collection = models.Collection;
	var ImageObj = models.Image;


	return {
		getUserFromNick: function (nick, callback) {
			User.findOne({ 'slug' :  slug(nick) }, function(err, user) {
			 	if(err)
			 		callback(false);
			 	if(!user)
			 		callback(false);
			 	if(user)
			 		callback(user);
			 });
		},
		getUserFromUsername: function (username, callback) {
			 User.findOne({ 'username' :  username }, function(err, user) {
			 	if(err)
			 		callback(false);
			 	if(!user)
			 		callback(false);
			 	if(user)
			 		callback(user);
			});
		},
		getUserFromSlug: function (nickSlug, callback) {
			User.findOne({'slug': nickSlug}, function (err, user) {
				if(err)
					callback(false);
				if(!user)
					callback(false);
				if(user)
					callback(user);
			});
		},
		getGamesForUserFromUserId: function (userId, callback) {
			Game.find({'userId': userId}, null, {sort: {title: 1}}, function (err, games) {
				if(err)
					callback(false);
				if(!games)
					callback(false);
				if(games) {
					callback(games);
				}
					
			});
		},
		getCollectionsFromUserId: function (userId, callback) {
			Collection.find({'userId': userId}, null, {sort: {title:1}}, function (err, collections) {
				if(!err)
					callback(collections);
			});
		},
		getSettings: function (callback) {
			Settings.find({}, function (err, settings) {
			 	if(err)
			 		callback(false);
			 	if(!settings)
			 		callback(false);
			 	if(settings)
			 		callback(settings);
			});
		},
		addGame: function (game, callback) {
			var game = new Game(game);
			game.save(function (err) {
				if(!err)
					callback(game);
			});
		},

		updateGame: function (gameId, newValue, row, callback) {
			Game.findById(gameId, function (err, foundGame) {
				foundGame[row] = newValue;
				foundGame.save(function (err) {
					if(!err)
						callback(foundGame);
				})
			});
		},
		removeGame: function (gameId, callback) {
			Game.findByIdAndRemove(gameId, function (err) {
				if(!err)
					callback();
			});
		} 
	}
}

