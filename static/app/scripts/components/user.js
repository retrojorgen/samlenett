spilldb.component('user', {
	templateUrl: 'app/scripts/views/user.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {
      $scope.toggles = {
        editable: false
      };

      $scope.user = {};

      $scope.user = $rootScope.user;


      $scope.$on('user logged in', function(next, current) { 
        $scope.user = $rootScope.user;
        setPriveleges();
      });

      var setPriveleges = function () {
        console.log($routeParams);
        if($routeParams.nickSlug && $scope.user && $scope.user.slug == $routeParams.nickSlug) {
          $scope.toggles.editable = true;
        }
      }
      setPriveleges();
    }
});
	