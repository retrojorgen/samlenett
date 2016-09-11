spilldb.component('auth', {
	templateUrl: 'app/scripts/views/auth.html',
  	controller: function ($scope, $http, $timeout) {
  		$scope.loggedIn = false;
  		$scope.user = undefined;
  		$scope.loginFormTab = 'login';
  		$scope.showLoginForm = false;
      $scope.loginError = false;
      $scope.signupError = false;
      $scope.signupEmailStatus = 0;
      $scope.signupNickStatus = 0;
      $scope.signupPasswordStatus = 0;
      $scope.signupPasswordRepeatStatus = 0;
      $scope.typingTimeouts = {};
  		$scope.toggleLoginForm = function () {
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
  			}).error(function (data) {
  				$scope.loggedIn = false;
				  $scope.user = undefined;
          $scope.loginError = true;
  			});
  		};

      $scope.submitSignupForm = function () {
        $scope.signupError = false;
        $http.post('/api/signup', {
          username: $scope.signupUsername,
          password: $scope.signupPassword,
          nick: $scope.signupNick
        }).success(function (data) {
          $scope.loggedIn = true;
          $scope.user = data.user;
          $scope.showLoginForm = false;
        }).error(function (data) {
          $scope.signupError = true;
        });
      }

  		$scope.logOut = function () {
  			$http.get('/api/logout')
  			.success(function (data) {
  				$scope.loggedIn = false;
  				$scope.user = undefined;
  			});
  		};


      $scope.typingProxy = function(toCall, parameter, typingTimeout) {

        if($scope.typingTimeouts[typingTimeout]) {
          $timeout.cancel($scope.typingTimeouts[typingTimeout]);
        }
        console.log(typingTimeout, 'reset / starting timeout');
        $scope.typingTimeouts[typingTimeout] = $timeout(function () {
          console.log(toCall, parameter, typingTimeout, 'Running function');
          toCall(parameter);
        }, 1000);
      }

      $scope.checkEmail = function (email) {
        
        $http.post('/api/check/email', { email: email})
        .success(function (data) {
          console.log('error 2');
          $scope.signupEmailStatus = 1;
        })
        .error(function (data) {
          console.log('error', data);
          if(data.code == 'alreadyexists') {
            $scope.signupEmailStatus = 2;
          }
          if(data.code == 'novalid') {
            $scope.signupEmailStatus = 3;
          }
        })
      };

      $scope.checkEmail = function (email) {
        
        $http.post('/api/check/email', { email: email})
        .success(function (data) {
          $scope.signupEmailStatus = 1;
        })
        .error(function (data) {
          console.log('error', data);
          if(data.code == 'alreadyexists') {
            $scope.signupEmailStatus = 2;
          }
          if(data.code == 'novalid') {
            $scope.signupEmailStatus = 3;
          }
        })
      };

      $scope.checkNick = function (nick) {
        console.log('checking nick ', nick);
        $http.post('/api/check/nick', { nick: nick})
        .success(function (data) {
          $scope.signupNickStatus = 1;
        })
        .error(function (data) {
          console.log('error', data);
          if(data.code == 'notavailable') {
            $scope.signupNickStatus = 2;
          }
        })
      };

      $scope.checkPassword = function (password) {
        if(password.length < 6)
          $scope.signupPasswordStatus = 2;
        else
          $scope.signupPasswordStatus = 1;
      }

      $scope.CheckPasswordEqual = function (password) {
        if(password == $scope.signupPassword)
          $scope.signupPasswordRepeatStatus = 1;
        else
          $scope.signupPasswordRepeatStatus = 2;
      }

      $scope.isSignupValid = function () {
        if($scope.signupUsername == '')
          return true;
        if($scope.signupNick == '')
          return true;
        if($scope.signupPassword == '')
          return true;      
        if($scope.signupPasswordRepeat == '')
          return true;
        if($scope.signupEmailStatus > 1 || $scope.signupEmailStatus == 0)
          return true;
        if($scope.signupNickStatus > 1 || $scope.signupNickStatus == 0)
          return true;
        if($scope.signupPasswordStatus > 1 || $scope.signupPasswordStatus == 0)
          return true;
        if($scope.signupPasswordRepeatStatus > 1 || $scope.signupPasswordRepeatStatus == 0)
          return true;

        return false;
      }
  		
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
	