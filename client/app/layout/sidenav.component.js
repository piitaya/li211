(function () {
	'use strict';
	angular
		.module('app')
		.component('sidenav', {
		    templateUrl: 'app/layout/sidenav.html',
		    controller: SidenavComponent,
		    controllerAs: "vm"
		});

	SidenavComponent.$inject = ["$mdSidenav", "$state"];

	function SidenavComponent($mdSidenav, $state) {
		var vm = this;

        vm.closeSidenav = closeSidenav;

        vm.links = [{
            label: "Home",
            route: 'main.home',
        }, {
            label: "Login",
            route: 'login',
        }];

        vm.$onInit = function() {
        };

        function closeSidenav() {
           $mdSidenav('sidenav').close();
        }
	}
})();
