/**
 * Created by jorjacob on 20.10.2016.
 */

spilldb.component('login', {
    templateUrl: '/static/app/scripts/views/login.html',
    controller: function ($scope, $http, $timeout, $rootScope, $location) {

        $scope.typingTimeouts = {};

        $scope.statusMessage = "";

        $scope.typingProxy = function (toCall, parameter, typingTimeout) {

            if ($scope.typingTimeouts[typingTimeout]) {
                $timeout.cancel($scope.typingTimeouts[typingTimeout]);
            }
            $scope.typingTimeouts[typingTimeout] = $timeout(function () {
                toCall(parameter);
            }, 1000);
        };

        $scope.submitLoginForm = function () {
            $scope.loginError = false;
            $http.post('/api/login',{
                username: $scope.loginUsername,
                password: $scope.LoginPassword
            }).success(function (data) {
                $rootScope.user = data.user;
                $rootScope.$broadcast("user logged in");
                $rootScope.$broadcast("user logged in from form");
                $location.path("/");
            }).error(function (data) {
                $scope.statusMessage = "Brukernavn eller passord er feil..";
            });
        };

    }});