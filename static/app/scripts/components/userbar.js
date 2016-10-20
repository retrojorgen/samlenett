spilldb.component('userbar', {
	templateUrl: '/static/app/scripts/views/userbar.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope, $location) {

      $scope.collections = {};
      $scope.user = {};

      $scope.path = $location.path();

      console.log($scope.path);

      $scope.$on("update collections", function () {
        updateCollection();
      });

      $scope.$on("user logged in", function () {
        $scope.user = $rootScope.user;
        $rootScope.visible = true;
        updateCollection();
      });

      $scope.isUserSelected = function () {
          if($location.path().indexOf("/user") > -1 && $location.path().indexOf("/c/") == -1)
              return true;
          return false;
      }

      $scope.isFrontSelected = function () {
          if($location.path() == "/")
              return true;
          return false;
      }

      var updateCollection = function () {
        $http.get("/api/me/collections")
        .success(function (collections) {

          $scope.collections = {
            'collections': [],
            'goals': [],
            'sales': []
          };
          _.each(collections, function (collection) {
            $scope.collections[collection.type].push(collection);
          });

          if($routeParams.collectionId)
            setSelected($routeParams.collectionId);
        });
      };



      var setSelected = function (selectedId) {
        _.each($scope.collections, function (collectionList) {
          _.each(collectionList, function (collection) {
            if(collection._id == selectedId)
              collection.selected = true;
            else
              collection.selected = false;
          });
        });
      }

      $scope.addCollection = function (type) {
        $http.post("/api/me/create/collection", {type: type})
        .success(function (collection) {
          $scope.collections[type].push(collection);
        });
      };

      $scope.$on('$routeChangeStart', function(next, current) {
          setSelected(current.pathParams.collectionId ? current.pathParams.collectionId : 0);
      });
  }});