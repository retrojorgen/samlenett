var shortid = require('shortid');

module.exports = function (models, slug) {

	shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
	
	var User = models.User;
	var Game = models.Game;
	var Settings = models.Settings;
	var Collection = models.Collection;
	var ImageObj = models.ImageObj;


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
		getCollectionFromId: function (collectionId, callback) {
			Collection.findById(collectionId, function (err, collection) {
				if(!err) 
					User.findById(collection.userId, function (err, user) {
						if(!err)
							Game.find({"userId": user._id}, function (err, games) {
								if(!err)
									Settings.findOne({"type": collection.type}, function (err, settings) {
										callback({
											collection: collection,
											user: user,
											games: games,
											settings: settings
										});
									});
							});
					});
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
		addCollection: function (title,userId,type,callback) {
			var collection = new Collection ({
				userId: userId,
				title: title,
				type: type
			});
			collection.save(function (err) {
				if(!err) {
					callback(collection);
				}
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
		},
		addImage: function (callback) {
			var newImage = {
				'location': 'static/userImages/',
				'type': 'jpg',
				imageAdded: new Date()
			};

			var image = new ImageObj(newImage);

			image.save(function (err) {
				if(!err) {
					callback(image);
				}
			});
		},
		addImageToUser: function (userId, image, callback) {
			User.findById(userId, function (err, user) {
				if(!err) {
					if(!user.collectionImages) {
						user.collectionImages = [image];
					} else {
						user.collectionImages.push(image);
					}
					console.log(user);
					user.save(function (err) {
						if(!err)
							if(callback)
								callback(user);
					});
				}
			})
		}
	}
}

