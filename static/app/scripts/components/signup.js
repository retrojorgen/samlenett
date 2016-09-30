spilldb.component('signup', {
	templateUrl: 'app/scripts/views/signup.html',
  	controller: function ($scope, $http, $timeout, $location) {
      console.log('hei');
  		$scope.loggedIn = false;
  		$scope.user = undefined;
  		$scope.signupError = false;
      $scope.signupEmailStatus = 0;
      $scope.signupNickStatus = 0;
      $scope.signupPasswordStatus = 0;
      $scope.signupPasswordRepeatStatus = 0;
      $scope.typingTimeouts = {};
  		
      $scope.submitSignupForm = function () {
        $scope.signupError = false;
        $http.post('/api/signup', {
          username: $scope.signupUsername,
          password: $scope.signupPassword,
          nick: $scope.signupNick
        }).success(function (data) {
          $scope.user = data.user;
          $location.path("/user/" + data.user.slug);

        }).error(function (data) {
          $scope.signupError = true;
        });
      }

      $scope.typingProxy = function(toCall, parameter, typingTimeout) {

        if($scope.typingTimeouts[typingTimeout]) {
          $timeout.cancel($scope.typingTimeouts[typingTimeout]);
        }
        console.log(typingTimeout, 'reset / starting timeout');
        $scope.typingTimeouts[typingTimeout] = $timeout(function () {
          //console.log(toCall, parameter, typingTimeout, 'Running function');
          toCall(parameter);
        }, 1000);
      }

      $scope.checkEmail = function (username) {
        if(username) {
          $http.post('/api/check/username', { username: username})
          .success(function (data) {
            console.log('user exists', data);
            $scope.signupEmailStatus = 2;
          })
          .error(function (data) {
            console.log('no user', data);
            $scope.signupEmailStatus = 1;
          })
        }
      };

      $scope.checkNick = function (nick) {
        if(nick) {
          $http.post('/api/check/nick', { nick: nick})
          .success(function (data) {
            console.log('signupstatus unavailable');
            $scope.signupNickStatus = 2;
          })
          .error(function (data) {
              console.log('signupstatus available');
              $scope.signupNickStatus = 1;
          })  
        }
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
  	}
});
	