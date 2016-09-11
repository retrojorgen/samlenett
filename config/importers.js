// Importers for different consoles

module.exports = function (dbQueries) {
	return {
		// Assumes that nes games have consoleId 1
		nesImportGames: function () {
	    	var nesGames = require('./../data/nes-games.json');
	    	var counter = 0;
	    	var droppedCounter = 0;
	    	nesGames.forEach(function (game, index) {
	    		dbQueries.isGame(game.Tittel, function (response) {
	    			if(!response) {
	    				dbQueries.addGame(game.Tittel, 1);
	    				counter++;
	    			} else {
	    				droppedCounter++;
	    			}
	    			if(index+1 == nesGames.length) {
	    				console.log('totalt ' + nesGames.length + ' spill.');
	    				console.log('Lagt inn ' + (counter) + ' spill.');
	    				console.log('Spill som eksisterte fra før ' + (droppedCounter) + ' spill.');
	    			}
	    				
	    		});
	    	});
	    	console.log(counter);
    	},
    	nesImportVariants: function () {
    		// assumes same structure as nes-games.json
    		var nesVariants = require('./../data/nes-variants.json');
    		var counter = 0;
    		var droppedCounter = 0;
    		var publishersLookup = {};

    		dbQueries.getParentGamesFromConsoleId(1, function (games) {
    			dbQueries.getPublishers(function (publishers) {

    				for(var x = 0; x < publishers.length; x++) {
    					if(!publishersLookup[publishers[x].name])
    						publishersLookup[publishers[x].name] = x + " hest";
    				}
    				console.log(publishersLookup);
	    			nesVariants.forEach(function (game, index) {

	    				var euroReleaseYear;
	    				var usaReleaseYear;

	    				if(game["utgitt europa"]) {
	    					euroReleaseYear = game["utgitt europa"].split(" ");
	    					euroReleaseYear = euroReleaseYear[euroReleaseYear-1];
	    				}

	    				if(game["utgitt usa"]) {
	    					usaReleaseYear = game["utgitt usa"].split(" ");
	    					usaReleaseYear = usaReleaseYear[usaReleaseYear-1];
	    				}



	    				var publisher = "";
	    				if(game["FRG/DAS"]) {
	    					var frgDas = {
	    						gameTitle : game["european name"] ? game["european name"] : game["Tittel"],
	    						"attr1": 11,
	    						"attr2": 26,
	    						"attr3": 23,
	    						"releaseYear": euroReleaseYear || usaReleaseYear,
	    						"publisherId": game["PUBLISH-EUROPE"] ? publishersLookup[game["PUBLISH-EUROPE"]] : publishersLookup[game["PUBLISH-USA"]]

	    					};

	    					isGameVariant(frgDas.gameTitle, frgDas.attr1, frgDas.attr2, frgDas.attr3, 1, index, frgDas.releaseYear, frgDas.publisherId, function (response) {
	    						if(!response)
	    							addGameVariant(frgDas.gameTitle, frgDas.attr1, frgDas.attr2, frgDas.attr3, 1, index, frgDas.releaseYear, frgDas.publisherId);
	    					});

	    				}

	    				if(game["CAN/CAN"]) {
	    					var canCan = {
	    						gameTitle : game["european name"] ? game["european name"] : game["Tittel"],
	    						"attr1": 27, // CAN
	    						"attr2": 27, // CAN
	    						"attr3": 21,
	    						"releaseYear": usaReleaseYear,
	    						"publisherId": game["PUBLISH-EUROPE"] ? publishersLookup[game["PUBLISH-EUROPE"]] : publishersLookup[game["PUBLISH-USA"]]

	    					};

	    					isGameVariant(canCan.gameTitle, canCan.attr1, canCan.attr2, canCan.attr3, 1, index, canCan.releaseYear, canCan.publisherId, function (response) {
	    						if(!response)
	    							addGameVariant(canCan.gameTitle, canCan.attr1, canCan.attr2, canCan.attr3, 1, index, canCan.releaseYear, canCan.publisherId);
	    					});

	    				}

	    				if(game["ITA/EAI"]) {
	    					var itaEAI = {
	    						gameTitle : game["european name"] ? game["european name"] : game["Tittel"],
	    						"attr1": 6, // ITA
	    						"attr2": 17, // EAI
	    						"attr3": 22, // pal a
	    						"releaseYear": usaReleaseYear,
	    						"publisherId": game["PUBLISH-EUROPE"] ? publishersLookup[game["PUBLISH-EUROPE"]] : publishersLookup[game["PUBLISH-USA"]]

	    					};

	    					isGameVariant(itaEAI.gameTitle, itaEAI.attr1, itaEAI.attr2, itaEAI.attr3, 1, index, itaEAI.releaseYear, itaEAI.publisherId, function (response) {
	    						if(!response)
	    							addGameVariant(itaEAI.gameTitle, itaEAI.attr1, itaEAI.attr2, itaEAI.attr3, 1, index, itaEAI.releaseYear, itaEAI.publisherId);
	    					});

	    				}


	    				if(game["NOE/FRG/DAS"]) {
	    					var noeFrgDas = {
	    						gameTitle : game["european name"] ? game["european name"] : game["Tittel"],
	    						"attr1": 15, // NOE/FRG
	    						"attr2": 26, // DAS
	    						"attr3": 23, // pal b
	    						"releaseYear": usaReleaseYear,
	    						"publisherId": game["PUBLISH-EUROPE"] ? publishersLookup[game["PUBLISH-EUROPE"]] : publishersLookup[game["PUBLISH-USA"]]

	    					};

	    					isGameVariant(noeFrgDas.gameTitle, noeFrgDas.attr1, noeFrgDas.attr2, noeFrgDas.attr3, 1, index, noeFrgDas.releaseYear, noeFrgDas.publisherId, function (response) {
	    						if(!response)
	    							addGameVariant(noeFrgDas.gameTitle, noeFrgDas.attr1, noeFrgDas.attr2, noeFrgDas.attr3, 1, index, noeFrgDas.releaseYear, noeFrgDas.publisherId);
	    					});

	    				}

	    				if(game["NOE/DAS"]) {
	    					var noeDas = {
	    						gameTitle : game["european name"] ? game["european name"] : game["Tittel"],
	    						"attr1": 4, // NOE
	    						"attr2": 26, // DAS
	    						"attr3": 23, // pal b
	    						"releaseYear": usaReleaseYear,
	    						"publisherId": game["PUBLISH-EUROPE"] ? publishersLookup[game["PUBLISH-EUROPE"]] : publishersLookup[game["PUBLISH-USA"]]

	    					};

	    					isGameVariant(noeDas.gameTitle, noeDas.attr1, noeDas.attr2, noeDas.attr3, 1, index, noeDas.releaseYear, noeDas.publisherId, function (response) {
	    						if(!response)
	    							addGameVariant(noeDas.gameTitle, noeDas.attr1, noeDas.attr2, noeDas.attr3, 1, index, noeDas.releaseYear, noeDas.publisherId);
	    					});

	    				}

	    			});		
    			});
    			
    		});
    	},
    	nesImportPublishers: function () {
    		var publishers = require('./../data/nes-publishers.json');

    		var counter = 0;
    		var droppedCounter = 0;

    		publishers.forEach(function(publisher, index) {
    			dbQueries.isPublisher(publisher, function (response) {
    				if(!response) {
    					dbQueries.addPublisher(publisher);
    					counter++;
    				} else {
    					droppedCounter++;
    				}

    				if(index+1 == publishers.length) {
    					console.log('totalt ' + publishers.length + ' publishers.');
	    				console.log('Lagt inn ' + (counter) + ' Publishers.');
	    				console.log('Publishers som eksisterte fra før ' + (droppedCounter) + ' publishers.');
    				}
    			})
    		})
    	}

	}
};