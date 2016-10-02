var spilldb = angular
.module('spilldb', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'underscore', 'ngSanitize'])
.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');
	$routeProvider.
		when('/user/:nickSlug', {
			'template': '<user></user>'
		}).
		when('/user/:nickSlug/:listId', {
			'template': '<user></user>'
		}).
		otherwise('/');
}]);

