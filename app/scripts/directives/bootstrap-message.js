angular.module('crudApp')
	.directive('showMessage', [function() {

		var defaults = {
			show: false,
			text: '',
			type: '',
			autoClose: true,
			autoCloseDelay: 5000
		};

		var autoCloseTimeout;

		var linkFunction = function (scope, el, attrs) {

			var showMessage = function (m) {
				if (m === false) el.fadeOut();

				el.fadeIn();

				if (m.autoClose !== false) {
					if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
					
					autoCloseTimeout = setTimeout(function () {
						el.fadeOut();
						scope.$apply(function () {
							scope.message = {};
						});
					}, m.autoCloseDelay || defaults.autoCloseDelay);
				};
			};

			scope.$watch('message', function (newMsg, oldMsg) {
				newMsg = angular.merge(defaults, newMsg);
				if (newMsg && newMsg.show === true) {
					showMessage(newMsg);
				}
			});
		};

		return {
			restrict: 'E',
			link: linkFunction,
			template: '<div align="center" ng-show="message.show">' +
					'<div class="alert alert-{{message.type}}">' + 
					// '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
					'{{message.text}}' + 
					'</div>' +
				'</div>',
			scope: {
				message: '='
			}
		};
	}]);