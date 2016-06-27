(function () {
	'use strict';

	angular
	.module('app')
	.component('login', {
		templateUrl: 'app/login/login.html',
		controller: LoginComponent,
		controllerAs: "vm"
	});

	LoginComponent.$inject = [];

	function LoginComponent() {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
