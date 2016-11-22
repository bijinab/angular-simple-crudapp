angular.module('crudApp')
	.directive('appHeader', [function() {

		var HeaderController = ['$rootScope', '$state', function($root, $state) {
			$root.$state = $state;
		}];

		return {
			restrict: 'E',
			replace: true,
			controller: HeaderController,
			templateUrl: 'scripts/directives/app-header/header-directive-tpl.html'
		};
	}]);