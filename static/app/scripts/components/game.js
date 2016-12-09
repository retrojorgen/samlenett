spilldb.component('game', {
    templateUrl: '/static/app/scripts/views/game.html',
    controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope, appConst) {

        $scope.game = {};
        $scope.collection = {};
        $scope.settings = {};
        $scope.user = {};
        $scope.loggedInUser = {};

        $scope.toggles = {
            editable: false,
            mobileFlag: appConst.mobileThreshold
        };

        $rootScope.$watch('user', function () {
            if ($rootScope.user) {
                $scope.user = $rootScope.user;
                $scope.toggles.editable = true;
                $scope.toggles.editStatus = true;
            }
        });

        $scope.$on("user logged in", function () {
            $scope.loggedInUser = $rootScope.user;
            checkUser();


        });

        var checkUser = function () {
            console.log('checking user: ', $scope.loggedInUser, $scope.user);
            if($scope.loggedInUser && $scope.loggedInUser['_id'] && $scope.user && $scope.user['_id'] && $scope.loggedInUser._id == $scope.user._id) {
                $scope.toggles.editable = true;
                console.log('found user: ', $scope.loggedInUser, $scope.user);
                return true;

            } else {
                console.log(' no found user: ', $scope.loggedInUser, $scope.user);
                return false;

            }

        }

        $http.get("/api/get/user/game/" + $routeParams.gameId)
            .success(function (data) {
                $scope.game = data.game;
                $scope.user = data.user;
                $scope.collection = data.collection.collection;
                $scope.settings = data.collection.settings;
                checkUser();
            });
    }
});