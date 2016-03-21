app = angular.module('WTBApp', ['ngRoute', 'ngResource', 'angularUtils.directives.dirPagination']);

// Configuracion de la rutas de la app.
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/ranking', {
			templateUrl : 'partials/ranking.html',
			controller : 'RankCtrl'
		})
		.when('/addPlayer', {
			templateUrl : 'partials/form-player.html',
			controller : 'PlayersCtrl'
		})
		.when('/vote/', {
			templateUrl : 'partials/vote.html',
			controller : 'PlayersCtrl'
		})
		.when('/nosotros/', {
			templateUrl : 'partials/nosotros.html'
		})
		.when('/rankClubs/', {
			templateUrl : 'partials/rank-clubs.html',
			controller : 'RankClubsCtrl'
		})
		.otherwise({
			redirectTo : '/vote'
		});
}]);
