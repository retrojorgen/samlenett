spilldb.component('userbar', {
	templateUrl: 'app/scripts/views/userbar.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {

      $scope.collections = {};
      $scope.user = {};

      console.log('running again');

      $rootScope.$on("user logged in", function () {
        $scope.user = $rootScope.user;
        
        $http.get("/api/me/collections")
        .success(function (collections) {

          $scope.collections = {
            'collections': [],
            'goals': [],
            'sales': []
          };
          _.each(collections, function (collection) {
            if($routeParams.collectionId && $routeParams.collectionId == collection._id)
              collection.selected = true;
            else
              collection.selected = false;
            $scope.collections[collection.type].push(collection);
            
          });
          console.log($scope.collections);
        });
      });
  }});