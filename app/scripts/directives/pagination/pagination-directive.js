angular.module('crudApp')
	.directive('tablePagination', [function() {

		var Controller = ['$scope', function($scope) {
			var defaultOptions = {
				limit: 10,
				page: 1,
				totalItems: 0
			};

			$scope.pagination = {};
			$scope.pageOptions = angular.merge(defaultOptions, $scope.pageOptions);

			$scope.nPages = [10, 25, 50, 100];
			$scope.currentPage = 1;

			$scope.prevPage = function() {
				if ($scope.currentPage === 1) return false;
				$scope.currentPage--;
				$scope.pageOptions.page = $scope.currentPage;
			};

			$scope.nextPage = function() {
				if ($scope.currentPage === $scope.lastPageNumber()) return false;
				$scope.currentPage++;
				$scope.pageOptions.page = $scope.currentPage;
			};

			$scope.lastPageNumber = function() {
				return Math.ceil($scope.pageOptions.totalItems / $scope.pageOptions.limit);
			};

			$scope.setPage = function() {
				$scope.currentPage = this.p || 1;
				$scope.pageOptions.page = $scope.currentPage;
			};

			$scope.firstPage = function() {
				if ($scope.currentPage === 1) return false;
				$scope.currentPage = 1;
				$scope.pageOptions.page = $scope.currentPage;
			};

			$scope.lastPage = function() {
				if ($scope.currentPage === $scope.lastPageNumber()) return false;
				$scope.currentPage = $scope.lastPageNumber();
				$scope.pageOptions.page = $scope.currentPage;
			};

			var getPagesArray = function() {
				if ($scope.lastPageNumber() > 7) {
					var startIndex = $scope.currentPage <= 3 ? 1 : $scope.currentPage - 3;
					startIndex = startIndex + 6 > $scope.lastPageNumber() ? $scope.lastPageNumber() - 6 : startIndex;
					return Enumerable.Range(startIndex, 7).ToArray();
				} else {
					return Enumerable.Range(1, $scope.lastPageNumber()).ToArray();
				}
			};

			var setPaginationButtons = function() {
				$scope.pages = getPagesArray();
				var p = $scope.pagination;
				p.firstPageDisabled = $scope.currentPage === 1 || !$scope.pageOptions.totalItems;
				p.lastPageDisabled = $scope.currentPage === $scope.lastPageNumber() || !$scope.pageOptions.totalItems;
			};

			$scope.$watch('pageOptions', function(newVal, oldVal) {
				if (typeof newVal === 'undefined') return;

				if (newVal.totalItems !== oldVal.totalItems) {
					setPaginationButtons();
				} else {
					$scope.pageOnChange({
						$params: newVal,
						$done: setPaginationButtons
					});
				}
			}, true);
		}];

		return {
			restrict: 'E',
			controller: Controller,
			templateUrl: 'scripts/directives/pagination/pagination-directive-tpl.html',
			scope: {
				pageOptions: '=',
				pageOnChange: '&'
			}
		};
	}]);