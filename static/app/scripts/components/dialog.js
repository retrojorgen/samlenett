/**
 * Created by jorjacob on 29/11/16.
 */
spilldb.component('gamedialog', {
    templateUrl: '/static/app/scripts/views/dialog.html',
    controller: function ($scope, $rootScope) {

        $scope.dialog = {
            visible: false,
            message: ""
        };

        $scope.click = function (state) {
            console.log('registering click');
            if(state) {
                $rootScope.$broadcast("yes dialog");
                $scope.dialog.visible = false;
            } else {
                $rootScope.$broadcast("no dialog");
                $scope.dialog.visible = false;
            }
        };
        $scope.$on('open dialog', function ($event, message) {
            console.log('opening dialog');
            $scope.dialog.visible = true;
            $scope.dialog.message = message;
        });
    }
});