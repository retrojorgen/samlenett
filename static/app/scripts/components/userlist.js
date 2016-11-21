spilldb.component('userlist', {
    templateUrl: '/static/app/scripts/views/userlist.html',
    controller: function ($scope, $http, $timeout, $routeParams, $filter, _, $window, $rootScope, appConst) {



        var collectionId = $routeParams.collectionId;

        $scope.collection = {};

        $scope.selectedGame = {};

        $scope.toggles = {
            contextMenu: 0,
            editGames: [],
            sortOrder: "",
            filterPhrase : "",
            editTab: false,
            editable: false,
            mobileFlag: appConst.mobileThreshold,
            editStatus: false,
            editFlags : {
                collection: {
                    title: false,
                    description: false
                }
            },
            listLimit: 40,
            search: {
                positionLeft: 0,
                positionTop: 0,
                phrase: "",
                type: ""
            }
        };

        $scope.increaseListLimit = function () {
          $scope.toggles.listLimit += 40;
        };



        $scope.imageInfo = {
            image: {},
            imageFileName: {}
        };

        $scope.editCollection = {

        };

        $scope.uploadCollectionPhoto = function (file) {
            $http.post("/api/me/upload/collectionphoto", {image: file, collectionId: $scope.collection.collection._id})
                .then(function (data) {

                    $scope.collection.collection.collectionImageId = data.data.imageId;
                });
        };

        $scope.uploadProfilePicture= function (file) {


        };

        $scope.toggleEditStatus = function () {
            $scope.toggles.editStatus = !$scope.toggles.editStatus;
        };

        $http.post("/api/get/user/collection", {collectionId: collectionId})
            .success(function (collection) {
                $scope.collection = collection;
                $scope.editCollection = angular.copy(collection.collection);


                delete $scope.collection.settings._id;
                delete $scope.collection.settings.type;



            });

        $rootScope.$watch('user', function () {

            if($rootScope.user && $scope.collection.collection && $rootScope.user._id == $scope.collection.collection.userId)
            {
                $scope.toggles.editable = true;
                $scope.toggles.editStatus = true;
            }
        });

        $scope.$watch('collection', function () {
            if($rootScope.user && $scope.collection.collection && $rootScope.user._id == $scope.collection.collection.userId)
            {
                $scope.toggles.editable = true;
                $scope.toggles.editStatus = true;
            }
        });


        $($window).on('paste', function (e) {
            //e.preventDefault();
            //var data = e.originalEvent.clipboardData.getData('text/plain');
        });



        $scope.toggleSelectedGame = function (game, toggle) {
            if(toggle)
                $scope.selectedGame = game;
            else
                $scope.selectedGame = {};
        };

        $scope.removeGame = function (game) {
            var indexPosition = $scope.collection.games.indexOf(game);
            $scope.collection.games.splice(indexPosition, 1);
            $http.post("/api/remove/game", {gameId: game._id}, function () {

            });
        };

        $scope.updateGame = function (game, row, field) {
            row = row.replace(/<(?!br\s*\/?)[^>]+>/g, '');
            game[field] = game[field].replace(/<(?!br\s*\/?)[^>]+>/g, '');
            if(!game.inactive) {


                var add = _.find(game, function (row) {
                    if(row != "")
                        return row;
                });

                if(add) {
                    $http.post("/api/update/game", {
                        gameId: game._id,
                        newValue : row,
                        field: field
                    })
                        .success(function (data) {
                        });
                }

            } else {

                var add = _.find(game, function (row, key) {
                    if(row != "" && key != "$$hashKey" && key != "collectionId" && key != "userId" && key != "inactive")
                        return row;
                });



                if(add) {

                    delete game.inactive;

                    $http.post("/api/add/game", game)
                        .success(function (dbGame) {
                            game._id = dbGame._id;
                    });

                }
            }
        };

        $scope.sortGamesBy = function (field) {
            var currentSort = $scope.toggles.sortOrder;

            if(!currentSort)
                currentSort.replace("-", "");

            if(currentSort == field) {
                if($scope.toggles.sortOrder.charAt(0) == "-") {
                    $scope.toggles.sortOrder = currentSort;
                } else {
                    $scope.toggles.sortOrder = "-" + currentSort;
                }
            } else {
                $scope.toggles.sortOrder = field;
            }
        };

        $scope.gameKeyHandler = function ($event,game, field) {
            if($event.keyCode == 46) {
                game[field] = "";
                $scope.updateGame(game, "", field);
            }
        };

        $scope.toggleGameToggle = function (gameId, toggleField) {
            if($scope.toggles[toggleField] == gameId) {
                $scope.toggles[toggleField] = 0;
            } else {
                $scope.toggles[toggleField] = gameId;
            }
        };

        $scope.toggleGameInEditList = function (game) {
            var isGame = $scope.toggles['editGames'].indexOf(game);
            if(isGame > -1) {
                $scope.toggles['editGames'].splice(isGame, 1);
            } else {
                $scope.toggles['editGames'].push(game);
            }
        };

        var updateCollection = function () {

            $http.post("/api/me/update/collection", {collection: $scope.editCollection})
                .success(function (collection) {
                    $scope.collection.collection = collection;

                    $rootScope.$broadcast("update collections");
                });

        };

        $scope.editField = function (toggleCase) {
            switch(toggleCase) {
            case 'collection title':
                $scope.toggles.editFlags.collection.title = true;
                $scope.editCollection.title = $scope.collection.collection.title;

                break;
            case 'collection description':
                $scope.toggles.editFlags.collection.description = true;
                $scope.editCollection.description = $scope.collection.collection.description;
                break;
            }
        };

        $scope.cancelField = function (toggleCase) {
            switch(toggleCase) {
            case 'collection title':
                $scope.toggles.editFlags.collection.title = false;
                $scope.editCollection.title = $scope.collection.collection.title;
                break;
            case 'collection description':
                $scope.toggles.editFlags.collection.description = false;
                $scope.editCollection.description = $scope.collection.collection.description;
                break;
            }
        };

        $scope.saveField = function (toggleCase) {
            switch(toggleCase) {
            case 'collection title':
                if($scope.editCollection.title.length < 2) {
                    alert("tittelen kan ikke være så kort");
                    $scope.cancelField("collection title");
                }
                $scope.collection.collection.title = $scope.editCollection.title;
                $scope.toggles.editFlags.collection.title = false;
                break;
            case 'collection description':

                $scope.collection.collection.description = $scope.editCollection.description;
                $scope.toggles.editFlags.collection.description = false;

                break;
            }

            updateCollection();
        };




        $scope.reportImage = function (image) {

            $http.post("/api/me/upload/image", {
                image: image
            })
                .success(function (image) {

                    $scope.editCollection.collectionImageId = image.image._id;

                });
        };

        $scope.toggleEditTab = function () {
            $scope.toggles.editTab = !$scope.toggles.editTab;
        };

        $scope.runBulk = function (collection, command) {
            _.each($scope.toggles['editGames'], function (game) {
                if(command == 'deleteRows') {
                    $scope.removeGame(collection, game);
                }
            });
        };

        $scope.changeToBreak = function (content) {
            if(content) {
                content = content.replace(/\n/g, "<br />");
                return content;
            }
            return "";
        }
    }
});
	