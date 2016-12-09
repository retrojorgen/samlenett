var crypto = require('crypto');
var _ = require('underscore');
var bcrypt = require('bcrypt-nodejs');

var publishers = require('./../data/publishers.json');
var consoles = require('./../data/consoles.json');
var games = require('./../data/games.json');

module.exports = function (models, slug) {

	
	var User = models.User;
	var Game = models.Game;
	var Settings = models.Settings;
	var Collection = models.Collection;
	var ImageObj = models.ImageObj;
	var Console = models.Console;
	var Publisher = models.Publisher;
	var GameSearch = models.GameSearch;

	var ResetPassword = models.ResetPasswordSchema;

	function generateSecureVal(callback) {
		crypto.randomBytes(3, function(err, buffer) {
			callback(parseInt(buffer.toString('hex'), 16).toString().substr(0,6));
		});
	};


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
		getUserFromId: function (userId, callback) {
			User.findById(userId, function (err, user) {
				if(!err) {
					callback(user);
				} else {
					callback(false);
				}
			})
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

		setPasswordCode: function (email, callback) {
			User.findOne({username: email}, function (err, user) {

				if(!err) {
					generateSecureVal(function (secureVal) {
						var newPasswordCode = new ResetPassword({
							userId: user._id,
							generatedKey: secureVal
						});

						newPasswordCode.save(function (err) {
							if(!err) {
								callback({
									status: true,
									email: user.username,
									code: newPasswordCode.generatedKey
								});
							} else {
								callback({
									status: false
								});
							}
						});
					});

				} else {
					callback({
						status: false
					});
				}
			});
		},

		setPasswordFromCodeAndEmail: function (email, code, newPassword) {
			this.verifyPasswordCode(email, code, true, function (response) {
				if(response.status) {
					response.user.password = bcrypt.hashSync(newPassword);
					response.user.save(function (err) {
						if(!err) {
							callback({
								status: true,
								statusMessage: "Passordet har blitt resatt"
							});
						} else {
							callback({
								status: false,
								statusMessage: "Kunne ikke lagre passordet. Prøv igjen"
							});
						}
					});
				} else {
					callback({
						status: false,
						statusMessage: "Kunne ikke verifisere kode"
					})
				}
			});
		},

		verifyPasswordCode: function (email, code, userReturnToggle, callback) {
			User.findOne({username: email}, function (err, user) {
				if(!err) {
					ResetPassword.findOne({userId: user._id, generatedKey: code}, null, {sort: {date: -1}},	 function (err, resetPasswordCode) {
						if(!err) {
							callback({
									status: true,
									statusMessage: "Fant kode",
									user: userReturnToggle ? user : false
								});
						} else {
							callback({
								status: false,
								statusMessage: "Fant ikke kode"
							});
						}
					});
				} else {
					callback({
						status: false,
						statusMessage: "Fant ikke bruker"
					});
				}
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

		getGameFromId: function (gameId, callback) {
			Game.findById(gameId, function (err, game) {
				if(!err) {
					callback(game);
				} else {
					callback(false);
				}
			})
		},

		updateDescription : function (userId, description, callback) {
			User.findById(userId, function (err, user) {
				user.description = description;
				user.save(function (err, user) {
					callback();
				});
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
							Game.find({"collectionId": collection._id}, function (err, games) {
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

		updateCollection: function (collection, callback) {
			
			Collection.findById(collection._id, function (err, foundCollection) {

				foundCollection.title = collection.title;
				foundCollection.description = collection.description;
				foundCollection.collectionImageId = collection.collectionImageId;
				foundCollection.save(function (err, updatedCollection) {
					callback(updatedCollection);
				});
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
				else
					callback(err);
			});
		},

		updateGame: function (game, callback) {
			var id = game._id;

			delete game._id;
			delete game.collectionId;

			console.log('leter etter spill ', id);
			Game.findById(id, function (err, foundGame) {
				if(err) {
					console.log('error', err);
				} else {
					console.log('found game: ', foundGame);
					_.extend(foundGame, game);

					console.log('utvidet game: ', foundGame);


					foundGame.save(function (err) {
						if(err)
							callback('no luck');
						else
							callback(foundGame);
					})
				}
				//{"_id": ObjectId("582451d5d69d2068e11d6cfb")}
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
		addProfileImageToUser: function (userId, imageId, callback) {
			User.findById(userId, function (err, user) {
				if(!err) {
					user.profileImageId = imageId;

					user.save(function (err) {
						if(!err)
							if(callback)
								callback(user);
					});
				}
			})
		},
		removeImageFromUser: function (userId, imageId, callback) {
			User.findById(userId, function (err, user) {
				if(!err) {
					if(user.collectionImages) {
						var indexOfImage = user.collectionImages.indexOf(imageId);
						user.collectionImages.splice(indexOfImage, 1);
						user.save(function (err) {
							callback(user);
						});
					}
				} else {

				}
			});
		},
		addImageToUser: function (userId, imageId, callback) {
			User.findById(userId, function (err, user) {
				if(!err) {
					if(!user.collectionImages) {
						user.collectionImages = [imageId];
					} else {
						user.collectionImages.push(imageId);
					}

					user.save(function (err) {
						if(!err)
							if(callback)
								callback(user);
					});
				}
			})
		},
		addCollectionPhotoToCollection: function (collectionId, imageId, callback) {
			Collection.findById(collectionId, function (err, collection) {
				console.log('kom til samling', collectionId, collection);
				collection.collectionImageId = imageId;

				collection.save(function (err) {
					if(!err)
						callback(collection.collectionImageId);
				});
			});
		},

		searchConsoles: function (phrase, callback) {

			Console.find(
				{ "console": { "$regex": phrase, "$options": "i" } },
				function(err,results) {
					if(err) {
						callback([]);
						console.log(err);
					}
					else {
						callback(results);
					}
				}
			);
		},

		searchPublishers: function (phrase, callback) {

			Publisher.find(
				{ "publisher": { "$regex": phrase, "$options": "i" } },
				function(err,results) {
					if(err) {
						callback([]);
						console.log(err);
					}
					else {
						callback(results);
					}
				}
			);
		},
		searchGames: function (phrase, callback) {

			GameSearch.find(
				{ "title": { "$regex": phrase, "$options": "i" } },
				function(err,results) {
					if(err) {
						callback([]);
						console.log(err);
					}
					else {
						callback(results);
					}
				}
			);
		},

		deleteGames: function (ids, callback) {
			var cleanIds = [];
			_.each(ids, function (id) {
				cleanIds.push(models.convertToObjectId(id._id));
			});
			Game.remove({
				_id: {
					$in: cleanIds
				}
			}, function (err) {
				if(!err)
					callback(cleanIds);
				else
					callback([]);
			});
		},

		moveGames: function (ids, collectionId, callback) {
			var cleanIds = [];
			_.each(ids, function (id) {
				cleanIds.push(models.convertToObjectId(id._id));
			});
			Game.update(
				{
					_id: {
						$in: cleanIds
					}
				},
				{
					$set: { collectionId: collectionId }
				},
				{
					multi: true
				},
				function (err) {
					if(!err)
						callback(cleanIds);
					else
						callback([]);
				}
			);
		},
		copyGames: function (games, collectionId, callback) {

			_.each(games, function (game) {
				delete game._id;
				game.collectionId = collectionId;
			});

			Game.collection.insert(games, function (err, docs) {
				if(!err) {
					callback(docs);
				} else {
					callback([]);
				}
			})
		},


		addConsoles: function (callback) {

			Console.collection.insert(consoles, function (err, docs) {
				if(!err)
					callback([]);
				else
					callback(docs);
			});
		},
		addPublishers: function (callback) {

			Publisher.collection.insert(publishers, function (err, docs) {
				if(!err)
					callback([]);
				else
					callback(docs);
			});
		},
		addGames: function (callback) {

			GameSearch.collection.insert(games, function (err, docs) {
				if(!err)
					callback([]);
				else
					callback(docs);
			});
		}

	}
}

