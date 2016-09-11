var spilldb = angular
.module('spilldb', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'underscore'])
.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');
	$routeProvider.
		when('/games/:console', {
			'template': '<games></games>'
		}).
		when('/games/:consoleSlug/:gameSlug', {
			'template': '<game></game>'
		}).
		otherwise('/');
}]);

