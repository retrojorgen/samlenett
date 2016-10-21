spilldb.component('userlist', {
	templateUrl: '/static/app/scripts/views/userlist.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {

      var collectionId = $routeParams.collectionId;

      $scope.collection = {};

      $scope.toggles = {
        contextMenu: 0,
        editGames: [],
        sortOrder: "",
        filterPhrase : "",
        editTab: false,
        editable: false,
        editStatus: true
      };

      $scope.imageInfo = {
        image: {},
        imageFileName: {}
      }

      $scope.editCollection = {

      };

      $scope.toggleEditStatus = function () {
        $scope.toggles.editStatus = !$scope.toggles.editStatus;
        console.log($scope.toggles);
      };

      $http.post("/api/get/user/collection", {collectionId: collectionId})
      .success(function (collection) {
        $scope.collection = collection;
        $scope.editCollection = angular.copy(collection.collection);


        delete $scope.collection.settings._id;
        delete $scope.collection.settings.type;
        console.log($scope.collection);

        console.log(collection, collection.user._id, collection.collection.userId);
        if(collection.user._id == collection.collection.userId)
        {
          
          $scope.toggles.editable = true;
        }
        $scope.addRow();
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
        newRow.inactive = true;
        $scope.collection.games.push(newRow);
      };

      $scope.removeGame = function (game) {
        var indexPosition = $scope.collection.games.indexOf(game);
        $scope.collection.games.splice(indexPosition, 1);
        $http.post("/api/remove/game", {gameId: game._id}, function () {

        });
      };

      $scope.updateGame = function (game, row, field) {
        console.log(game.inactive, game);
        row = row.replace(/<(?!br\s*\/?)[^>]+>/g, '');
        game[field] = game[field].replace(/<(?!br\s*\/?)[^>]+>/g, '');
        if(!game.inactive) {

          var add = false;
          add = _.find(game, function (row) {
            if(row != "")
              return row;
          });

          if(add) {
            console.log('updated game');
            $http.post("/api/update/game", {
              gameId: game._id,
              newValue : row,
              field: field
            })
            .success(function (data) {
            });
          }
          
        } else {
          var add = false;
          add = _.find(game, function (row, key) {
            if(row != "" && key != "$$hashKey" && key != "collectionId" && key != "userId" && key != "inactive")
              return row;
          });

          console.log('trying to add game', add, game);

          if(add) {
            
            delete game.inactive;
            
            $http.post("/api/add/game", game)
            .success(function (dbGame) {
              game._id = dbGame._id;
            });
            $scope.addRow($scope.currentCollection, true);
            
          }
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

      $scope.updateCollection = function () {


        $http.post("/api/me/update/collection", {collection: $scope.editCollection})
        .success(function (collection) {
          $scope.collection.collection = collection;
          $scope.toggleEditTab();
          $rootScope.$broadcast("update collections");
        });

      };

      $scope.reportImage = function (image) {

        $http.post("/api/me/upload/image", {
          image: image
        })
        .success(function (image) {
          console.log(image);
          $scope.editCollection.collectionImageId = image.image._id;
          console.log($scope.editCollection, image);
        });
      }
      $scope.toggleEditTab = function () {
        $scope.toggles.editTab = !$scope.toggles.editTab;
      };

      $scope.runBulk = function (collection, command) {
        _.each($scope.toggles['editGames'], function (game) {
          if(command == 'deleteRows') {
            $scope.removeGame(collection, game);
          }
        });
      }

      $scope.changeToBreak = function (content) {
        if(content) {
          content = content.replace(/\n/g, "<br />");
          return content;
        }
        return "";
      }
    }
});
	