spilldb.component('userbar', {
	templateUrl: 'app/scripts/views/userbar.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {

      $scope.collections = {};
      $scope.user = {};

      console.log('running again');

      $scope.$on("update collections", function () {
        updateCollection();
      });

      $scope.$on("user logged in", function () {
        $scope.user = $rootScope.user;
        updateCollection();
      });

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
        if(current.pathParams && current.pathParams.collectionId)
          setSelected(current.pathParams.collectionId);
      });
  }});