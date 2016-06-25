(function () {
	'use strict';

	angular
		.module('app')
		.component('authRedirect', {
			template: '',
			controller: AuthRedirectComponent,
			controllerAs: "vm"
		});

	AuthRedirectComponent.$inject = ['$location', '$state'];

	function AuthRedirectComponent($location, $state) {
		var vm = this;

		activate();

		function activate() {
            var params = $location.search();
            console.log(params);
			$state.go('main.home')
		}
	}
})();
