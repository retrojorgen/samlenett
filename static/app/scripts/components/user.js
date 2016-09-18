spilldb.component('user', {
	templateUrl: 'app/scripts/views/user.html',
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
        sortOrder: ""
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
           

        


        $scope.games = $scope.currentCollection.games;


        _.each(data.collections, function (collection) {
            $scope.collectionByTypes[collection.type].push(collection);
        });


      });

      $($window).on('paste', function (e) {
        //e.preventDefault();
        //var data = e.originalEvent.clipboardData.getData('text/plain');
      });

      $scope.addRow = function (collectionId) {
      
        var newRow = {};
        _.each($scope.settings, function (setting) {
          newRow[setting.field] = "";
        });

        newRow.collectionId = collectionId;

        newRow.userId = $scope.user._id;
        
        $http.post("/api/add/game", newRow)
        .success(function (game) {
          $scope.games.push(game);
        });
      };

      $scope.removeGame = function (game) {
        var indexPosition = $scope.games.indexOf(game);
        $scope.games.splice(indexPosition, 1);
        $http.post("/api/remove/game", {gameId: game._id}, function () {

        });
      };

      $scope.updateGame = function (game, row, field) {
          $http.post("/api/update/game", {
            gameId: game._id,
            newValue : row,
            field: field
          })
          .success(function (data) {
          });  
      };

      $scope.sortBy = function (field) {
        var currentSort = $scope.toggles.sortOrder;
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
        $scope.games = $filter('orderBy')($scope.games, $scope.toggles.sortOrder);
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
      $scope.runBulk = function () {
        _.each($scope.toggles['editGames'], function (game) {
          if($scope.toggles.bulkAlternative == 'deleteRows') {
            $scope.removeGame(game);
          }
        });
      }
    }
});
	