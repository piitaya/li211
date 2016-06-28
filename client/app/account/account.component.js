(function () {
	'use strict';

	angular
	.module('app')
	.component('account', {
		templateUrl: 'app/account/account.html',
		controller: AccountController,
		controllerAs: "vm",
		bindings: {
			user: "<"
		}
	});

	AccountController.$inject = [];

	function AccountController() {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
