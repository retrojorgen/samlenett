/**
 * Created by jorjacob on 16/12/16.
 */
spilldb.component('gamesearch', {
    templateUrl: '/static/app/scripts/views/gameSearch.html',
    controller: function ($scope, $http, $timeout, $location, $rootScope, $log, authService) {

        $scope.gamesSearchResults = [];
        $scope.toggles = {
            showLogin: false
        };

        $scope.user = undefined;

        var updateGameSearch = function () {
            authService.signedGet("/api/jwt/me/complete")
                .then(function (data) {
                    $scope.gamesSearchResults = data.data.games;
                });
        };

        $scope.wipeSearch = function () {
          $scope.toggles.searchInput = "";
        };

        $(document).on('keydown', function (e) {
            $scope.$apply(function () {
                if($scope.toggles.searchInput.length)  {
                    if(e.which == 27) {
                        $scope.wipeSearch();
                    }
                }
            });

        });


        $scope.$on("user logged in", function () {
            $scope.user = $rootScope.user;
            updateGameSearch();
        });

        $scope.$on('user logged in from form', function () {

        });
    }
});
