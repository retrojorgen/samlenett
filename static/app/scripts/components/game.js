spilldb.component('game', {
	templateUrl: 'app/scripts/views/game.html',
  	controller: function ($scope, $http, $timeout, $routeParams) {
      $scope.consoleSlug = $routeParams.consoleSlug;
      $scope.gameSlug = $routeParams.gameSlug;
});
	