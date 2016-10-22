/**
 * Created by jorjacob on 22.10.2016.
 */
/**
 * Created by jorjacob on 20.10.2016.
 */


spilldb.component('fileupload', {
    template: '<input type="file" id="uploadFileInput" style="display: none" /><button class="upload-photo-button" ng-click="startUpload()"></button>',
    bindings: {
        uploadFile: "="
    },
    controller: function ($scope, $rootScope) {

        var scope = this;

        $scope.startUpload = function () {
            console.log(angular.element('#uploadFileInput'));
            angular.element('#uploadFileInput').trigger('click');

        }




        angular.element('#uploadFileInput').change(function () {

            var file = document.getElementById('uploadFileInput').files[0];
            var name = file.name;
            var type = file.type;
            var size = file.size;
            var sizeInMB = (size / (1024*1024)).toFixed(2);

            reader = new FileReader();
            reader.onload = function(evt) {
                if(type != "image/jpeg" && parseFloat(sizeInMB) <= 5)
                    alert("Bilde må være jpg og være mindre enn 5 mb");
                else
                    scope.uploadFile(evt.target.result);
            };


            reader.readAsDataURL(file);
        });

    }});