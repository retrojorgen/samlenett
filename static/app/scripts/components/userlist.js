spilldb.component('userlist', {
	templateUrl: 'app/scripts/views/userlist.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window) {



      $scope.nickSlug = $routeParams.nickSlug;
      $scope.settings = [];

      $scope.games = [];
      $scope.user = {};
      $scope.currentCollectionId = {};

      $scope.currentCollection = undefined;

      $scope.collectionByTypes = {
        "collections": [],
        "goals": [],
        "sales": []
      };

      $scope.settingFields = {
        "collections": [],
        "goals": [],
        "sales": []
      };

      $scope.toggles = {
        contextMenu: 0,
        editGames: [],
        sortOrder: "hest"
      };

      $http.post("/api/get/user/games", {"nickSlug": $scope.nickSlug})
      .success(function (data) {

        // assign user
        $scope.user = data.user;

        // fix the settings
        _.each(data.settings, function (settingList) {
          _.each(settingList, function (setting, key) {
            if(key != "type") {
              if(key != "_id") {
                $scope.settingFields[settingList.type].push({
                  field: key,
                  name: setting.name,
                  type: setting.type,
                  description: setting.description
                }); 
              }
            }
          });
        });


        // Fix collections
        _.each(data.collections, function (collection) {
          if(!collection.games)
            collection.games = [];
          _.each(data.games, function (game) {
            if(game.collectionId == collection._id)
              collection.games.push(game);
          });
          $scope.addRow(collection, true);
        });

        if($routeParams.listId) {
          $scope.currentCollection = _.find(data.collections, function (collection) {
            return collection._id == $routeParams.listId;
          });
        }

        if(!$scope.currentCollection) {
          $scope.currentCollection = _.find(data.collections, function (collection) {
            return collection._id == data.user.mainCollectionId;
          });
        }
           
        _.each(data.collections, function (collection) {
            $scope.collectionByTypes[collection.type].push(collection);
        });


      });

      $($window).on('paste', function (e) {
        //e.preventDefault();
        //var data = e.originalEvent.clipboardData.getData('text/plain');
      });

      $scope.addRow = function (collection, postToggle) {        
        var newRow = {};
        _.each($scope.settingFields[collection.type], function (setting) {
          newRow[setting.field] = "";
        });

        newRow.collectionId = collection._id;

        newRow.userId = $scope.user._id;
        if(!postToggle) {
          $http.post("/api/add/game", newRow)
          .success(function (game) {
            collection.games.push(game);
          });  
        } else {
          newRow.inactive = true;
          collection.games.push(newRow);
        }
        
      };

      $scope.countCollection = function (games) {
        var counter = 0;
        if(games) {
          _.each(games, function (game) {
            if(!game.inactive)
              counter++;
          });  
        }
        return counter;
      };

      $scope.removeGame = function (collection, game) {
        var indexPosition = $scope.games.indexOf(game);
        collection.games.splice(indexPosition, 1);
        $http.post("/api/remove/game", {gameId: game._id}, function () {

        });
      };

      $scope.updateGame = function (game, row, field) {
        row = row.replace(/<\/?[^>]+(>|$)/g, "");
        console.log(game[field], row, game);
        game[field] = game[field].replace(/<\/?[^>]+(>|$)/g, "");
        console.log(game[field], row, game);
        if(!game.inactive) {

          $http.post("/api/update/game", {
            gameId: game._id,
            newValue : row,
            field: field
          })
          .success(function (data) {
          });
        } else {
          delete game.inactive;
          console.log('sending in game:', game);
          $http.post("/api/add/game", game)
          .success(function (dbGame) {
            game._id = dbGame._id;
          });
          $scope.addRow($scope.currentCollection, true);
        }
          
      };

      $scope.sortBy = function (currentCollection, field) {
        var currentSort = $scope.toggles.sortOrder;
        if(!currentSort)
        currentSort.replace("-", "");

        if(currentSort == field) {
          if($scope.toggles.sortOrder.charAt(0) == "-") {
            $scope.toggles.sortOrder = currentSort;
          } else {
            $scope.toggles.sortOrder = "-" + currentSort;
          }
        } else {
          $scope.toggles.sortOrder = field;
        }
        console.log($scope.currentCollection.games, $scope.toggles.sortOrder);
        $scope.currentCollection.games = $filter('orderBy')($scope.currentCollection.games, $scope.toggles.sortOrder);
      };

      $scope.gameKeyHandler = function ($event,game, field) {
        if($event.keyCode == 46) {
          game[field] = "";
          $scope.updateGame(game, "", field);
        }
      }
      $scope.toggleGameToggle = function (gameId, toggleField) {
        if($scope.toggles[toggleField] == gameId) {
          $scope.toggles[toggleField] = 0;
        } else {
          $scope.toggles[toggleField] = gameId;
        }
      }
      $scope.toggleGameInEditList = function (game) {
        var isGame = $scope.toggles['editGames'].indexOf(game);
        if(isGame > -1) {
          $scope.toggles['editGames'].splice(isGame, 1);
        } else {
          $scope.toggles['editGames'].push(game);
        }
      }
      $scope.runBulk = function (collection, command) {
        _.each($scope.toggles['editGames'], function (game) {
          if(command == 'deleteRows') {
            $scope.removeGame(collection, game);
          }
        });
      }
    }
});
	