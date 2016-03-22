app = angular.module('admWTPApp', ['ngRoute', 'ngResource', 'ui.bootstrap',
	'angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'views/index.html',
		controller : 'StatsAdminCtrl'
	})
	.when('/list', {
		templateUrl : 'views/list.html',
		controller : 'PlayerCtrl'
	})
	/*.when('/password', {
		templateUrl : 'views/password.html',
		controller : 'PasswordCtrl'
	})*/
	.when('/historial', {
		templateUrl : 'views/historial.html',
		controller : 'HistorialCtrl'
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