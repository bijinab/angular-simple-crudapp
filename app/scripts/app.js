angular.module('crudApp', [
	'ui.router',
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			views: {
				main: {
					templateUrl: 'scripts/modules/employees/employees-tpl.html',
					controller: 'EmployeesController'
				}
			}
		})
		.state('list', {
			url: '/employee-list',
			views: {
				main: {
					templateUrl: 'scripts/modules/employees-list/employees-list-tpl.html',
					controller: 'EmployeesListController'
				}
			}
		});

	$urlRouterProvider.otherwise('/');
}])

.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.headers.common = {'Content-Type': 'application/www-form-urlencoded'};
	// $httpProvider.defaults.headers.post = {};
	// $httpProvider.defaults.headers.put = {};
	// $httpProvider.defaults.headers.patch = {};
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);