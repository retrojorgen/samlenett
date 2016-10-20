spilldb.component('auth', {
    templateUrl: '/static/app/scripts/views/auth.html',
    controller: function ($scope, $http, $timeout, $location, $rootScope, $log) {
        $scope.loggedIn = false;
        $scope.user = undefined;
        $scope.loginFormTab = 'login';
        $scope.showLoginForm = false;
        $scope.loginError = false;
        $scope.typingTimeouts = {};
        $rootScope.user = undefined;
        $scope.toggles = {
            showLogin: false
        };

        $scope.toggleLoginForm = function () {
            console.log('toggling');
            $scope.toggles.showLogin = !$scope.toggles.showLogin;
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
                $rootScope.visible = true;
                $scope.toggleLoginForm();
            }).error(function (data) {
                $scope.loggedIn = false;
                $scope.user = undefined;
                $scope.loginError = true;
                $rootScope.visible = false;
            });
        };

        $scope.logOut = function () {
            $http.get('/api/logout')
                .success(function (data) {
                    $scope.loggedIn = false;
                    $scope.user = undefined;
                    $rootScope.visible = false;
                });
        };


        $scope.$on('$routeChangeStart', function(next, current) {
            $log.log($location.path());
        });



        $scope.checkLogin = function () {
            $http.get('/api/auth')
                .success(function (data) {
                    $scope.loggedIn = true;
                    $scope.user = data.user;
                    $rootScope.user = data.user;
                    $rootScope.$broadcast("user logged in");
                    $rootScope.visible = true;
                    console.log('emitted event');
                })
                .error(function (data) {
                    $scope.loggedIn = false;
                    $scope.user = undefined;
                    $rootScope.user = undefined;
                    $rootScope.visible = false;
                });
        };

        $scope.checkLogin();


    }
});
