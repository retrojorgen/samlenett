spilldb.component('user', {
	templateUrl: '/static/app/scripts/views/user.html',
  	controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope) {
      $scope.toggles = {
        editable: false,
        editTab: false,
        usermenu: {
          'overview': true,
          'photos': false,
          'collections': false,
          'goals': false,
          'sales': false
        }
      };

      $scope.user = {};

      $scope.user = $rootScope.user;

      $scope.collections = {
        'collections': [],
        'goals': [],
        'sales': []
      }


      $scope.$on('user logged in', function(next, current) { 
        $scope.user = $rootScope.user;
        setPriveleges();
      });

        $scope.uploadProfilePicture= function (file) {
            console.log('yo')
            //console.log(file);
        };

      var setPriveleges = function () {
        console.log($routeParams);
        if($routeParams.nickSlug && $scope.user && $scope.user.slug == $routeParams.nickSlug) {
          $scope.toggles.editable = true;
        }
      }

      var getCompleteData = function () {
        $http.post("/api/get/user/complete", { nickSlug: $routeParams.nickSlug })
        .success(function (data) {
          _.each(data.collections, function (collection) {
            $scope.collections[collection.type].push(collection);
          });

          console.log($scope.collections);
        });
      }

      $scope.toggleEditTab = function () {
        $scope.toggles.editTab = !$scope.toggles.editTab;
      };

      $scope.toggleUserTab = function (tabName) {
        _.each($scope.toggles.usermenu, function (menuValue, key) {
          if(key == tabName)
            $scope.toggles.usermenu[key] = true;
          else
            $scope.toggles.usermenu[key] = false;
        });
      };

      getCompleteData();
      setPriveleges();
      if($routeParams.space)
        $scope.toggleUserTab($routeParams.space);
      else
        $scope.toggleUserTab('overview');
    }
});
	