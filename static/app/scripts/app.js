var mobileThreshold = (window.innerWidth < 800);

var spilldb = angular
	.module('spilldb', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'underscore', 'ngSanitize', 'puElasticInput'])
	.constant("appConst", {
		"mobileThreshold": window.mobileThreshold
	})
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
		when('/user/:nickSlug/c/:collectionId/g/:gameId', {
			'template': '<game></game>'
		}).
		when('/signup', {
			'template': '<signup></signup>'
		}).
		when('/reset', {
			'template': '<resetpassword></resetpassword>'
		}).
		when('/reset/:email', {
			'template': '<resetpassword></resetpassword>'
		}).
		when('/login', {
			'template': '<login></login>'
		}).
		when('/logout', {
			'template': '<logout></logout>'
		}).
		otherwise('/');
	}]);


// file upload button
// http://jsfiddle.net/johnwun/U47tM/