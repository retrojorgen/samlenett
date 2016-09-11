spilldb.component('games', {
	templateUrl: 'app/scripts/views/games.html',
  	controller: function ($scope, $http, $timeout, $routeParams, _) {
      $scope.hest = "hest22";
      $scope.console = $routeParams.console;
      $scope.consoleInfo = {};
      $scope.orderToggle = false;
      $scope.gamesByRegion = {};
      $scope.addGameToggle = true;
      $scope.addGameData = {};
      $scope.conditions = [];
      $scope.gameFilters = {};
      $scope.regionsLookupById = {};
      $scope.regionsLookupByRegion = {};
      $scope.childrenLookupByParentId = {};

      $scope.gamesReal = [];
      $scope.gamesFiltered = [];
      $scope.regions = [];
      $scope.variationsStorage = {};
      $http.post("/api/games", {consoleSlug: $scope.console})
      .success(function (data) {
        $scope.gamesFiltered = data.games;
        $scope.regions = data.regions;
        $scope.consoleInfo = data.console;

        // sort regions in simple lookup
        _.each($scope.regions, function(region) {
          $scope.regionsLookupById[region.id] = region;
        });

        // sort children games into library
        _.each(data.children, function (child) {
          if(!$scope.childrenLookupByParentId[child.parent_id])
            $scope.childrenLookupByParentId[child.parent_id] = [child];
          else {
            $scope.childrenLookupByParentId[child.parent_id].push(child);
          }
        });

        // place children games under parent
        _.each($scope.gamesFiltered, function (game) {
          if(!game.children)
            game.children = [];
          if($scope.childrenLookupByParentId[game.id])
            game.children = $scope.childrenLookupByParentId[game.id];
        });



        // get the conditions
        $http.post("/api/conditions", {consoleSlug: $scope.console})
        .success(function (data) {
          $scope.conditions = data;
          console.log(data);
        })
        .error(function (data) {
          console.log(data);
        });

      
        // store games with parents in scope
        $scope.gamesWithParent = data.children;


        // store games under regions
        _.each($scope.regions, function (region) {
          region.games = [];
          _.each($scope.gamesWithParent, function (game) {
            if(game.region_id == region.id) {
              region.games.push(game);
            }
          });
        });

        _.each($scope.gamesFiltered, function (game) {
          game.regions = [];
          _.each(game.children, function (child) {
            child.region_name = $scope.regionsLookupById[child.region_id].name;
            child.game_title = child.title;
            game.regions.push(child);
          });
          _.each($scope.regions, function (region) {
            var hasRegion = _.find(game.regions, function(gameRegion) {
              if(gameRegion.region_id && gameRegion.region_id == region.id)
                return true;
            });
            if(!hasRegion) {
              var region = angular.copy(region);
              region.region_name = region.name;
              region.game_title = game.title;
              game.regions.push(region);
            }
          });
        });



      })
      .error(function (data) {
        console.log('error', data);
      });

      $scope.openAddGameDialog = function (game) {
        $scope.addGameData.game = game;
        
      };

      $scope.addGameToCollection = function () {
        console.log($scope.addGameData.game, $scope.consoleInfo, $scope.regions);


        var postData = {
          gameId : $scope.addGameData.game.id,
          parentId: $scope.addGameData.game.parentId || false,
          consoleId: $scope.consoleInfo.id,
          regionId: $scope.addGameData.game.regionId
        }
      }

      $scope.closeAddGameDialog = function () {
        $scope.addGameData = {};
        console.log("closing dialog");
      };

      $scope.toggleAdvancedAddGameSettings = function (toggle) {
        if(toggle) {
          $scope.addGameData.showAdvanced = true;
        } else {
          $scope.addGameData.showAdvanced = false;
        }
      }

      $scope.toggleOrder = function () {
        $scope.orderToggle = !$scope.orderToggle;
      }


		}
});
	