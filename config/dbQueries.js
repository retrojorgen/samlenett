var shortid = require('shortid');

module.exports = function (models, slug) {

	shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
	
	var User = models.User;
	var Game = models.Game;
	var Settings = models.Settings;
	var Collection = models.Collection;
	var ImageObj = models.ImageObj;
	var Console = models.Console;


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

		addConsoles: function (callback) {
			var consoles = [
				{console: "Magnavox Odyssey" },
				{console: "Ping-O-Tronic" },
				{console: "Atari PONG" },
				{console: "PC-50X Family" },
				{console: "Tele-Spiel" },
				{console: "Video 2000" },
				{console: "Philips Odyssey" },
				{console: "Coleco Telstar Arcade" },
				{console: "Color TV Game" },
				{console: "Fairchild Channel F" },
				{console: "APF-MP1000" },
				{console: "RCA Studio II" },
				{console: "Atari 2600" },
				{console: "Bally Astrocade" },
				{console: "VC 4000" },
				{console: "Magnavox Odyssey²" },
				{console: "APF Imagination Machine" },
				{console: "Intellivision" },
				{console: "PlayCable" },
				{console: "Bandai Super Vision 8000" },
				{console: "VTech CreatiVision" },
				{console: "Epoch Cassette Vision" },
				{console: "Arcadia 2001 (Leisure Vision in Canada)" },
				{console: "Atari 5200 (US Only)" },
				{console: "ColecoVision" },
				{console: "Entex Adventure Vision" },
				{console: "Vectrex" },
				{console: "Compact Vision TV-Boy" },
				{console: "Pyuuta Jr." },
				{console: "RDI Halcyon" },
				{console: "PV-1000" },
				{console: "Videopac G7400" },
				{console: "Commodore 64 Games System" },
				{console: "Amstrad GX4000" },
				{console: "Atari 7800" },
				{console: "Atari XEGS" },
				{console: "Sega SG-1000" },
				{console: "Sega Master System" },
				{console: "NES" },
				{console: "FAMICOM" },
				{console: "FAMICOM Disk System" },
				{console: "My Vision" },
				{console: "Super Cassette Vision" },
				{console: "Zemmix" },
				{console: "Bridge Companion" },
				{console: "Videosmarts" },
				{console: "ComputerSmarts" },
				{console: "Action Max" },
				{console: "Video Challenger" },
				{console: "Video Art" },
				{console: "Sega Genesis" },
				{console: "Sega Mega Drive" },
				{console: "Sega CD" },
				{console: "Sega Mega CD" },
				{console: "Sega 32X" },
				{console: "PC Engine" },
				{console: "TurboGrafx-16" },
				{console: "PC Engine2" },
				{console: "SuperGrafx" },
				{console: "Interactive Vision" },
				{console: "Socrates" },
				{console: "Terebikko" },
				{console: "Konix Multisystem" },
				{console: "Neo-Geo" },
				{console: "Sega Pico" },
				{console: "Neo Geo CD" },
				{console: "Commodore CDTV" },
				{console: "Memorex VIS" },
				{console: "Super NES" },
				{console: "Super Famicom" },
				{console: "Satellaview" },
				{console: "Dreamcast" },
				{console: "CD-i" },
				{console: "TurboDuo" },
				{console: "PC Engine Duo" },
				{console: "Super A'Can" },
				{console: "Pioneer LaserActive" },
				{console: "FM Towns Marty" },
				{console: "Apple Bandai Pippin" },
				{console: "PC-FX" },
				{console: "Atari Panther" },
				{console: "Atari Jaguar" },
				{console: "Atari Jaguar CD" },
				{console: "PlayStation" },
				{console: "Net Yaroze" },
				{console: "Sega Saturn" },
				{console: "3DO Interactive Multiplayer" },
				{console: "Amiga CD32" },
				{console: "Casio Loopy" },
				{console: "Playdia" },
				{console: "CPS Changer" },
				{console: "Nintendo 64" },
				{console: "Nintendo 64DD" },
				{console: "Nuon" },
				{console: "PlayStation 2" },
				{console: "L600" },
				{console: "MoMA Eve" },
				{console: "GameCube" },
				{console: "Game Boy Player" },
				{console: "iQue Player" },
				{console: "Panasonic M2" },
				{console: "Panasonic Q/Q Game Boy Player" },
				{console: "Xbox" },
				{console: "PSX" },
				{console: "XaviX Port" },
				{console: "DISCover" },
				{console: "Leapster TV" },
				{console: "V.Smile" },
				{console: "GoGo TV Video Vision" },
				{console: "Buzztime Home Trivia System" },
				{console: "Sega Beena" },
				{console: "Game Wave" },
				{console: "Xbox 360" },
				{console: "HyperScan" },
				{console: "ION" },
				{console: "Wii" },
				{console: "PlayStation 3" },
				{console: "I Can Play Piano" },
				{console: "V.Flash" },
				{console: "V.Smile V-Motion" },
				{console: "V.Smile Baby" },
				{console: "Vmigo TV Docking System" },
				{console: "Telestory" },
				{console: "Clickstart My First Computer" },
				{console: "I Can Play Guitar" },
				{console: "Smart Cycle" },
				{console: "EVO Smart Console" },
				{console: "Sega Firecore" },
				{console: "Zeebo" },
				{console: "Zippity" },
				{console: "Sega Zone" },
				{console: "Eedoo CT510" },
				{console: "Wii U" },
				{console: "PlayStation 4" },
				{console: "Xbox One" },
				{console: "RetroN 5" },
				{console: "LeapTV" },
				{console: "Karaoke Ranking Party" },
				{console: "InnoTV" },
				{console: "Tomahawk F1" }
			];

			Console.collection.insert(consoles, function (err, docs) {
				if(!err)
					callback([]);
				else
					callback(docs);
			});
		}
	}
}

