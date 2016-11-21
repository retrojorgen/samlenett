spilldb.component('game', {
    templateUrl: '/static/app/scripts/views/game.html',
    controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope, appConst) {

        $scope.toggles = {
            editable: false,
            mobileFlag: appConst.mobileThreshold
        };

        $rootScope.$watch('user', function () {

            if ($rootScope.user) {
                $scope.toggles.editable = true;
                $scope.toggles.editStatus = true;
            }
        });
    }
});