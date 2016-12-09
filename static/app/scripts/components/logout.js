/**
 * Created by jorjacob on 21.10.2016.
 */
spilldb.component('logout', {
    templateUrl: '/static/app/scripts/views/logout.html',
    controller: function ($scope, $http, $location, $window, $rootScope) {
        console.log('logging out');

        $scope.logOut = function () {
            $http.get('/api/logout')
                .success(function () {
                    $rootScope.user = undefined;
                    $window.location = "/";
                });
        };

        $scope.logOut();


    }
});
