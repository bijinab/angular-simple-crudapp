angular.module('crudApp')
	.directive('appLoader', [function() {

		var LinkFunction = function($scope, $el, attrs) {
            var title = attrs.name;
            $scope.title = (!!title) ? title.charAt(0).toUpperCase() + title.substr(1).toLowerCase() : '';			
		};

		return {
			restrict: 'E',
			link: LinkFunction,
            replace: true,
			template: '<div id="app-loader"><div class="loader-container">' + 
                '<h1 class="loader-title">{{title}}</h1>' +
                '<img class="loader-logo" src="https://upload.wikimedia.org/wikipedia/en/d/d2/Allegiantairlogo.png" alt=" "/>' +
                '<h3 class="loader-message">Loading... Please wait.</h3>' +
            '</div></div>'
		};
	}]);