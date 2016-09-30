spilldb.component('userlist', {
	templateUrl: 'app/scripts/views/userlist.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {

      var collectionId = $routeParams.collectionId;

      $scope.collection = {};

      $scope.toggles = {
        contextMenu: 0,
        editGames: [],
        sortOrder: "",
        filterPhrase : ""
      };

      $http.post("/api/get/user/collection", {collectionId: collectionId})
      .success(function (collection) {
        $scope.collection = collection;

        delete $scope.collection.settings._id;
        delete $scope.collection.settings.type;
        console.log($scope.collection);
        $scope.addRow(true);
      });

      $($window).on('paste', function (e) {
        //e.preventDefault();
        //var data = e.originalEvent.clipboardData.getData('text/plain');
      });

      $scope.addRow = function (postToggle) {        
        var newRow = {};
        _.each($scope.collection.settings, function (setting) {
          newRow[setting.field] = "";
        });

        newRow.collectionId = $scope.collection.collection._id;

        newRow.userId = $rootScope.user._id;
        if(!postToggle) {
          $http.post("/api/add/game", newRow)
          .success(function (game) {
            $scope.collection.games.push(game);
          });  
        } else {
          newRow.inactive = true;
          $scope.collection.games.push(newRow);
        }
        
      };

      $scope.removeGame = function (game) {
        var indexPosition = $scope.collection.games.indexOf(game);
        $scope.collection.games.splice(indexPosition, 1);
        $http.post("/api/remove/game", {gameId: game._id}, function () {

        });
      };

      $scope.updateGame = function (game, row, field) {
        console.log(game, row, field);
        row = row.replace(/<\/?[^>]+(>|$)/g, "");
        game[field] = game[field].replace(/<\/?[^>]+(>|$)/g, "");
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
          $http.post("/api/add/game", game)
          .success(function (dbGame) {
            game._id = dbGame._id;
          });
          $scope.addRow($scope.currentCollection, true);
        }
          
      };

      $scope.sortGamesBy = function (field) {
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
        
        $scope.collection.games = $filter('orderBy')($scope.collection.games, $scope.toggles.sortOrder);
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
	