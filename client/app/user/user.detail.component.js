(function () {
	'use strict';

	angular
	.module('app')
	.component('userDetail', {
		templateUrl: 'app/user/user.detail.html',
		controller: UserDetailComponent,
		controllerAs: "vm",
		bindings: {
			user: "<"
		}
	});

	UserDetailComponent.$inject = [];

	function UserDetailComponent() {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
