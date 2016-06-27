(function () {
	'use strict';

	angular
	.module('app')
	.component('main', {
		templateUrl: 'app/layout/main.html',
		controller: MainComponent,
		controllerAs: "vm",
		bindings: {
			user: "<"
		}
	});

	MainComponent.$inject = [];

	function MainComponent() {
		var vm = this;

		vm.$onInit = function() {
		};
	}
})();
