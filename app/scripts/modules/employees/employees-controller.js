angular.module('crudApp')
	.controller('EmployeesController', ['$scope', 'EmployeeService', function($scope, Employee) {

		$scope.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		$scope.formStatusMsg = {};
		$scope.newForm = {
			isClosed: true
		};

		var masterFormData = {};

		$scope.formData = angular.copy(masterFormData);

		var resetForm = function(form) {
			$scope.formData = angular.copy(masterFormData);
			form.$setPristine();
			form.$setUntouched();
		};

		$scope.toggleForm = function(form) {
			$scope.newForm.isClosed = !$scope.newForm.isClosed;

			if ($scope.newForm.isClosed) {
				if (form) resetForm(form);
				angular.element(document.querySelector('.add-edit-employee .panel-body')).slideUp();
			} else {
				angular.element(document.querySelector('.add-edit-employee .panel-body')).slideDown();
			}
		};

		$scope.save = function(form) {
			$scope.formStatusMsg = {show: false};

			if (form.$invalid) {
				angular.forEach(form.$error, function(field) {
					angular.forEach(field, function(errorField) {
						errorField.$setTouched();
					});
				});
				return false;
			}

			Employee.save($scope.formData)
				.then(function(res) {
					$scope.formStatusMsg = {show: true, type: 'success', text: 'You have successfully added an employee', autoCloseDelay: 5000};
					resetForm(form);
					$scope.loadTable();
				}, function(errMsg) {
					$scope.formStatusMsg = {show: true, type: 'danger', text: errMsg};
				});
		};

		$scope.update = function(form) {
			$scope.formStatusMsg = {show: false};

			if (form.$invalid) {
				angular.forEach(form.$error, function(field) {
					angular.forEach(field, function(errorField) {
						errorField.$setTouched();
					});
				});
				return false;
			}

			Employee.update($scope.formData)
				.then(function(res) {
					$scope.formStatusMsg = {show: true, type: 'success', text: 'You have successfully updated an employee'};
					resetForm(form);
					$scope.loadTable();
				}, function(errMsg) {
					$scope.formStatusMsg = {show: true, type: 'danger', text: errMsg};
				});
		};

		$scope.edit = function(rowData) {
			if (typeof rowData !== 'object' && !rowData.id) return false;

			rowData.dob = new Date(rowData.dob);

			if ($scope.newForm.isClosed) $scope.toggleForm();
			$scope.formData = angular.copy(rowData);
		};

		$scope.delete = function(rowData) {
			if (typeof rowData !== 'object' && !rowData.id) return false;

			if (!confirm('Are you sure you want to remove "' + rowData.firstName + ' ' + rowData.lastName + '"?')) {
				return false;
			}

			Employee.delete(rowData.id)
				.then(function() {
					$scope.loadTable();
				}, function() {});

		};

		// grid

		$scope.pageOptions = {
			limit: 10,
			page: 1,
			totalItems: 0
		};

		$scope.employees = [];

		$scope.loadTable = function(pageOptions, done) {
			Employee.get(pageOptions || $scope.pageOptions)
				.then(function(result) {
					$scope.employees = result.employees;
					$scope.pageOptions.totalItems = result.count;
					if (typeof done === 'function') done();
				}, function(err) {})
				.finally(function() {
					if ($scope.employees.length === 0) {
						if ($scope.newForm.isClosed) $scope.toggleForm();
						$scope.addEmpHint = {show: true, type: 'info', text: 'Seems like there are no employees added. Use this form to add an employee.'};
					}
				});
		};
	}]);