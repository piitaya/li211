(function () {
	'use strict';

	angular
	.module('app')
	.component('userList', {
		templateUrl: 'app/user/user.list.html',
		controller: UserListComponent,
		controllerAs: "vm",
		bindings: {
			users: "<"
		}
	});

	UserListComponent.$inject = [];

	function UserListComponent() {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
