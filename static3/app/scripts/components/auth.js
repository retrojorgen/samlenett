spilldb.component('auth', {
	templateUrl: 'app/scripts/views/auth.html',
  	controller: function ($scope, $http, $timeout, $location, $rootScope) {
  		$scope.loggedIn = false;
  		$scope.user = undefined;
  		$scope.loginFormTab = 'login';
  		$scope.showLoginForm = false;
      $scope.loginError = false;
      $scope.typingTimeouts = {};
      $rootScope.user = undefined;

  		$scope.toggleLoginForm = function () {
        console.log('toggling');
  			$scope.showLoginForm = !$scope.showLoginForm;
  		};

  		$scope.submitLoginForm = function () {
        $scope.loginError = false;
  			$http.post('/api/login',{
  				username: $scope.loginUsername,
  				password: $scope.LoginPassword
  			}).success(function (data) {
  				$scope.loggedIn = true;
          $scope.user = true;
          $scope.showLoginForm = false;
          console.log('logget inn');
				  $scope.user = data.user;
          $rootScope.user = data.user;
          $rootScope.$broadcast("user logged in");
          console.log('emitted event');
  			}).error(function (data) {
  				$scope.loggedIn = false;
				  $scope.user = undefined;
          $scope.loginError = true;
  			});
  		};

      $scope.logOut = function () {
        $http.get('/api/logout')
        .success(function (data) {
          $scope.loggedIn = false;
          $scope.user = undefined;
        });
      };


      $scope.$on('$routeChangeStart', function(next, current) { 
        //$scope.toggleLoginForm();
        //$scope.checkLogin();
      });

      $scope.typingProxy = function(toCall, parameter, typingTimeout) {

        if($scope.typingTimeouts[typingTimeout]) {
          $timeout.cancel($scope.typingTimeouts[typingTimeout]);
        }
        console.log(typingTimeout, 'reset / starting timeout');
        $scope.typingTimeouts[typingTimeout] = $timeout(function () {
          //console.log(toCall, parameter, typingTimeout, 'Running function');
          toCall(parameter);
        }, 1000);
      };
      
      $scope.checkLogin = function () {
        $http.get('/api/auth')
        .success(function (data) {
          $scope.loggedIn = true;
          $scope.user = data.user;
          $rootScope.user = data.user;
          $rootScope.$broadcast("user logged in");
          console.log('emitted event');
        })
        .error(function (data) {
          $scope.loggedIn = false;
          $scope.user = undefined;
          $rootScope.user = undefined;
        });
      };

      $scope.checkLogin();
      

  	}
});
	