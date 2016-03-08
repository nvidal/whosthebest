app = angular.module('WTBApp', ['ngRoute', 'ngResource']);

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
		.otherwise({
			redirectTo : '/ranking'
		});
}]);