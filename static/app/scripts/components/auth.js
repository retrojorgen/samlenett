spilldb.component('auth', {
	templateUrl: 'app/scripts/views/auth.html',
  	controller: function ($scope, $http) {
  		$scope.loggedIn = false;
  		$scope.user = undefined;
  		$scope.loginFormTab = 'login';
  		$scope.showLoginForm = false;
  		$scope.toggleLoginForm = function () {
  			$scope.showLoginForm = !$scope.showLoginForm;
  		};

  		$scope.submitLoginForm = function () {

  			console.log($scope.loginUsername, $scope.LoginPassword);

  			$http.post('/api/login',{
  				username: $scope.loginUsername,
  				password: $scope.LoginPassword
  			}).success(function (data) {
  				$scope.loggedIn = true;
				$scope.user = data.user;
  			}).error(function (data) {
  				$scope.loggedIn = false;
				$scope.user = undefined;
  			});
  		};

  		$scope.logOut = function () {
  			$http.get('/api/logout')
  			.success(function (data) {
  				$scope.loggedIn = false;
  				$scope.user = undefined;
  			});
  		};

  		
		$http.get('/api/auth')
		.success(function (data) {
			$scope.loggedIn = true;
			$scope.user = data.user;
		})
		.error(function (data) {
			$scope.loggedIn = false;
			$scope.user = undefined;
		});



  	}
});
	