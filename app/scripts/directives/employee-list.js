angular.module('crudApp')
	.directive('employeesList', [function () {

		var ListController = ['$scope', 'EmployeeService', function ($scope, Employee) {
			$scope.employees = [];
			$scope.pageOptions =  { limit: 10, page: 1, totalItems: 0 };

			$scope.loadTable = function (query, done) {
				Employee.get(query || $scope.pageOptions)
					.then(function (result) {
						$scope.employees = result.employees;
						$scope.pageOptions.totalItems = result.count;
						if (typeof done === 'function') done();
					}, function (err) {});
			};

			$scope.$watch('filterIndex', function () {
				$scope.pageOptions.index = $scope.filterIndex === 'all' ? null : $scope.filterIndex;
			}, true);
		}];

		return {
			restrict: 'E',
			controller: ListController,
			templateUrl: 'scripts/modules/employees-list/employees-list-directive-tpl.html',
			scope: {
				filterIndex: '='
			}
		};
	}]);