/**
 * Created by jorjacob on 02/11/16.
 */
/**
 * Created by jorjacob on 22.10.2016.
 */
/**
 * Created by jorjacob on 20.10.2016.
 */


spilldb.component('imageGallery', {
    templateUrl: '/static/app/scripts/views/imageGallery.html',
    bindings: {
        galleryConfig: "="
    },
    controller: function ($scope, $element, $timeout) {

        var scope = this;

        $scope.galleryConfig = scope.galleryConfig;

        $scope.$watch('scope.galleryConfig', function () {
            console.log(scope.galleryConfig);
            if(scope.galleryConfig.on) {

            }
        });

        $scope.closeGallery = function () {
            $scope.galleryConfig.on = false;
        };

        $scope.nextButton = function () {
            console.log('clicking next');
            var currentIndex = $scope.galleryConfig.imageGallery.indexOf($scope.galleryConfig.current);
            if($scope.galleryConfig.imageGallery[currentIndex+1]) {
                $scope.galleryConfig.current = $scope.galleryConfig.imageGallery[currentIndex+1];
            } else {
                $scope.galleryConfig.current = $scope.galleryConfig.imageGallery[0];
            }
        }

    }});