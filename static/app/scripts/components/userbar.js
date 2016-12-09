spilldb.component('userbar', {
	templateUrl: '/static/app/scripts/views/userbar.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope, $location) {

      $scope.collections = {};
      $scope.user = undefined;

      $scope.path = $location.path();

      $scope.currentCollection = undefined;
      $scope.expanded = false;

      $(document).on('click', function (e) {
          var container = $("#user-bar");

          if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0) // ... nor a descendant of the container
          {
              $timeout(function() {
                  // anything you want can go here and will safely be run on the next digest.
                  $scope.expanded = false;
              })

          }
      });


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
              if(collection.type)
                  $scope.collections[collection.type].push(collection);
          });

          if($routeParams.collectionId)
            setSelected($routeParams.collectionId);
        });

       $rootScope.collections = $scope.collections.collections;
      };

      var setSelected = function (selectedId) {
          $scope.currentCollection = _.find($scope.collections.collections, function (collection) {
            return collection._id == selectedId;
          });
      };

      $scope.addCollection = function (type) {
        $http.post("/api/me/create/collection", {type: type})
        .success(function (collection) {
          $scope.collections[type].push(collection);
        });
      };

      $scope.toggleExpanded = function () {
          $scope.expanded = !$scope.expanded;
      };

      $scope.$on('$routeChangeStart', function(next, current) {
          setSelected(current.pathParams.collectionId ? current.pathParams.collectionId : 0);
      });
  }});