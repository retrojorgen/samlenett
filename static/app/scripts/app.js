var spilldb = angular
.module('spilldb', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'underscore', 'ngSanitize'])
.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	$routeProvider.
		when('/user/:nickSlug', {
			'template': '<user></user>'
		}).
		when('/user/:nickSlug/profile/:space', {
			'template': '<user></user>'
		}).
		when('/user/:nickSlug/c/:collectionId', {
			'template': '<userlist></userlist>'
		}).
		when('/signup', {
			'template': '<signup></signup>'
		}).
		otherwise('/');
}]);

