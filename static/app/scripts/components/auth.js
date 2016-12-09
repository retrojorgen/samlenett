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

        $scope.ready = false;

        $scope.expanded = false;

        $scope.toggleExpanded = function () {
            $scope.expanded = !$scope.expanded;
        };

        $scope.toggleLoginForm = function () {
            console.log('toggling');
            $scope.toggles.showLogin = !$scope.toggles.showLogin;
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
                    console.log('emitted event user logged in');
                    $scope.ready = true;
                })
                .error(function (data) {
                    console.log('user not logged in');
                    $scope.loggedIn = false;
                    $scope.user = undefined;
                    $rootScope.user = undefined;
                    $rootScope.visible = false;
                    $scope.ready = true;
                });
        };

        $scope.$on('user logged in from form', function () {

            $scope.checkLogin();
        });

        $scope.checkLogin();


    }
});
