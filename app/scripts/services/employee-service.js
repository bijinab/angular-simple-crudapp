angular.module('crudApp')
	.service('EmployeeService', ['$q', '$http', function($q, $http) {

		var self = this;
		var baseUrl = 'http://localhost:4000';

		this.get = function(filters) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: baseUrl + '/employees'
			})
			.then(function (res) {
				var employees = res.data;
				var count = employees.length;

				if (typeof filters === 'object' && filters !== null) {
					if (filters.search) {
						employees = employees.filter(function(item) {
							return item.lastName.toLowerCase().indexOf(filters.search.toLowerCase()) != -1;
						});
					}

					if (filters.index) {
						employees = employees.filter(function(item) {
							return item.lastName.charAt(0).toLowerCase() === filters.index.toLowerCase();
						});
					}

					count = employees.length;

					if (filters.page >= 0 && filters.limit >= 0) {
						employees = employees.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);
					}

				}

				deferred.resolve({
					employees: employees,
					count: count
				});

			}, function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		};

		this.save = function(employee) {
			var deferred = $q.defer();
			
			$http({
				method: 'POST',
				url: baseUrl + '/employee',
				data: JSON.stringify(employee)
			})
			.then(function (res) {
				deferred.resolve('success');
			}, function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		};

		this.update = function(employee) {
			var deferred = $q.defer();

			$http({
				method: 'PUT',
				url: baseUrl + '/employee/' + employee.id,
				data: JSON.stringify(employee)
			})
			.then(function (res) {
				deferred.resolve('success');
			}, function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		};

		this.delete = function(employeeId) {
			var deferred = $q.defer();

			$http({
				method: 'DELETE',
				url: baseUrl + '/employee/' + employeeId
			})
			.then(function (res) {
				deferred.resolve('success');
			}, function (err) {
				deferred.reject(err);
			});

			return deferred.promise;
		};

	}]);