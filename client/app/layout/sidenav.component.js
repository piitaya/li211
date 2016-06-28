(function () {
	'use strict';
	angular
	.module('app')
	.component('sidenav', {
		templateUrl: 'app/layout/sidenav.html',
		controller: SidenavComponent,
		controllerAs: "vm",
		bindings: {
			user: "<"
		}
	});

	SidenavComponent.$inject = ["$mdSidenav", "$state"];

	function SidenavComponent($mdSidenav, $state) {
		var vm = this;

		vm.closeSidenav = closeSidenav;

		vm.links = [{
			label: "Accueil",
			route: 'main.home',
		}, {
			label: "Emploi",
			route: 'main.jobs',
		}];

		vm.$onInit = function() {
		};

		function closeSidenav() {
			$mdSidenav('sidenav').close();
		}
	}
})();
