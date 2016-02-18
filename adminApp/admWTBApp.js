app = angular.module('admWTPApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'views/list.html',
		controller : 'PlayerCtrl'
	})
	.when('/edit/:id', {
		templateUrl : 'views/edit-player.html',
		controller : 'PlayerEditCtrl'
		})
	.when('/create', {
		templateUrl : 'views/form-player.html',
		controller : 'PlayerCtrl'
	})
	.otherwise({
		redirectTo : '/'
	})
}]);