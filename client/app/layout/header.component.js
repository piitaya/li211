(function () {
	'use strict';

	angular
	.module('app')
	.component('header', {
		templateUrl: 'app/layout/header.html',
		controller: HeaderComponent,
		controllerAs: "vm"
	});

	HeaderComponent.$inject = ["$mdSidenav", "User", "$state"];

	function HeaderComponent($mdSidenav, User, $state) {
		var vm = this;

		vm.toggleSidenav = toggleSidenav;
		vm.logout = logout;

		vm.$onInit = function() {
		};

		function toggleSidenav() {
			$mdSidenav('sidenav').toggle();
		}

		function logout() {
			User.logout().$promise.then(function(result) {
				$state.go("login")
			});
		}
	}
})();
