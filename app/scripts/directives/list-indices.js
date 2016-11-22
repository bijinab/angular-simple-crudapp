angular.module('crudApp')
	.directive('listIndices', [function() {

		var IndexController = ['$scope', 'EmployeeService', function($scope, Employee) {

			var indicesStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$scope.indices = indicesStr.split('');

			$scope.setIndex = function(index) {
				if ($scope.filterIndex === index) return;

				$scope.filterIndex = index;
			};
		}];

		return {
			restrict: 'E',
			controller: IndexController,
			template: '<div class="index-filters"> Filter' +
				'<a class="" ng-class="{\'active\': filterIndex === \'all\'}" ng-click="setIndex(\'all\')">All</a>' +
				'<span ng-repeat="i in indices">|<a class="" ng-class="{\'active\': filterIndex === i}" ng-click="setIndex(i)">{{i}}</a></span>' +
				'</div>',
			scope: {
				filterIndex: '='
			}
		};
	}]);