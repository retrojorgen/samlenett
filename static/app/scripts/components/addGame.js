/**
 * Created by jorjacob on 02/12/16.
 */
spilldb.component('addgame', {
    templateUrl: '/static/app/scripts/views/addGame.html',
    controller: function ($scope, $routeParams, _, $rootScope, $http, $timeout) {

        $scope.game = {
            title: '',
            console: '',
            publisher: '',
            front: '',
            back: '',
            region: '',
            condition: '',
            status: '',
            notePublic: '',
            notePrivat: '',
            gameAdded: new Date(),
            images: []
        };

        $scope.main =
            [
                {'key': 'title', 'title': 'Tittel', 'description': ''},
                {
                    'key': 'console',
                    'title': 'Konsoll',
                    'description': ''
                }
            ]
        ;

        $scope.details =
            [

                {
                    'key': 'publisher',
                    'title': 'Utgiver',
                    'description': ''
                },
                {
                    'key': 'front',
                    'title': 'Kode foran',
                    'description': ''
                },
                {
                    'key': 'back',
                    'title': 'Kode bak',
                    'description': ''
                },
                {
                    'key': 'region',
                    'title': 'Region',
                    'description': ''
                },
                {
                    'key': 'condition',
                    'title': 'Spillets tilstand',
                    'description': ''
                }
            ];

        $scope.collections = {
            selectedCollection : undefined,
            collections : []
        };

        $scope.settings = {};

        $scope.toggles = {
          collectionSelector: false,
          search: {},
          showDialog: false,
          showDetails: false
        };



        var getCollections = function () {
            $http.get('/api/me/collections')
                .then(function (data) {
                    $scope.collections.collections = data.data;
                    if($routeParams.collectionId) {
                        $scope.collections.selectedCollection = _.find($scope.collections.collections, function (collection) {
                            return collection._id == $routeParams.collectionId;
                        });
                        $scope.game.collectionId = $scope.collections.selectedCollection._id;
                    }
                });

        };



        var setSelectedCollectionFromRouteParams = function () {
            $scope.collections.selectedCollection = _.find($scope.collections.collections, function (collection) {
                return collection._id == $routeParams.collectionId;
            });
        }

        $scope.indexSearch = function (key, phrase) {
            if(key && phrase) {
                if(key == 'title' || key == 'publisher' || key == 'console') {
                    $http.get("/api/search/" + key + "/" + encodeURIComponent(phrase))
                        .then(function (data) {
                            $scope.toggles.search[key]= data.data;
                        });
                }
                if(key == 'region') {
                    $scope.toggles.search[key] = [{'region': 'NTSC'}, {'region': 'PAL'}, {'region': 'PAL-A'}, {'region': 'PAL-B'}, {'region': 'NTSC-J'}];
                }
                if(key == 'condition') {
                    $scope.toggles.search[key] = [{'condition': 'CIB'},{'condition': 'NIB'}, {'condition': 'Cart'}];

                }
            }

        };

        $scope.setValueFromSearch = function (key, game) {
            _.each(game, function (field, key) {
                _.each($scope.game, function (newgameTitle, newGameKey) {
                    if(newGameKey == key && newGameKey != '_id' && newGameKey != '__v') {
                        $scope.game[newGameKey] = field;
                    }
                });
            });
            $scope.toggles.search[key] = undefined;
        };

        $scope.addGame = function () {
            console.log('legger til spill');
            $http.post("/api/add/game", $scope.game)
                .success(function (dbGame) {
                    $scope.toggles.showDialog = false;
                    $rootScope.$broadcast('add to active collection', dbGame);
                });
        }

        $scope.setSelectedCollection = function (collection) {
            $scope.collections.selectedCollection = collection;
            $scope.game.collectionId = collection._id;
        };

        $scope.$on("update collections", function () {
            getCollections();
        });

        $scope.$on("user logged in", function () {
            $scope.user = $rootScope.user;
            $scope.game.userId = $scope.user._id;
            getCollections();
        });

        $scope.uploadGamePhoto = function (file, reference) {
            console.log('gikk hit:', reference);
        };

        $scope.uploadGamePhoto = function (file) {
            $http.post("/api/me/upload/photo", {image: file})
                .then(function (data) {

                    $scope.game.images.push(data.data.imageId);
                });
        };

        getCollections();


        $scope.removeImage = function (image) {
            var imageIndex = $scope.game.images.indexOf(image);
            if(imageIndex > -1) {
                $scope.game.images.splice(imageIndex, 1);
            }
        };

        $scope.$on('$routeChangeStart', function(next, current) {
            if($routeParams.collectionId) {
                setSelectedCollectionFromRouteParams();
            }
        });
        /**
        $(document).on('click', function (e) {
            var container = $("#addgame-form");
            var button = $("#add-game-button");

            if (
                !container.is(e.target)
                && !button.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $timeout(function() {
                    // anything you want can go here and will safely be run on the next digest.
                    $scope.toggles.showDialog = false;
                })

            }
        });
         **/

    }});