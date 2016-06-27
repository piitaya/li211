(function () {
	'use strict';

	angular
	.module('app')
	.component('header', {
		templateUrl: 'app/layout/header.html',
		controller: HeaderComponent,
		controllerAs: "vm"
	});

	HeaderComponent.$inject = ["$mdSidenav"];

	function HeaderComponent($mdSidenav) {
		var vm = this;

		vm.toggleSidenav = toggleSidenav;

		vm.$onInit = function() {
		};
		
		function toggleSidenav() {
			$mdSidenav('sidenav').toggle();
			console.log("test"æ);
		};
	}
})();
