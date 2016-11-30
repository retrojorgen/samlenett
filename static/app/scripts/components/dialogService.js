/**
 * Created by jorjacob on 29/11/16.
 */
spilldb.factory('dialogService', function($rootScope, $q) {

    var openDialog = function (message) {
        var deferred = $q.defer();
        console.log(message);
        $rootScope.$broadcast('open dialog', message);

        $rootScope.$on("yes dialog", function () {
            deferred.resolve();
        });

        $rootScope.$on("no dialog", function () {
            deferred.reject();
        });

        return deferred.promise;
    };


    return {
        openDialog: openDialog
    }

});