(function () {
	'use strict';

	angular
		.module('app')
		.component('loginRedirect', {
			template: '',
			controller: LoginRedirectComponent,
			controllerAs: "vm"
		});

	LoginRedirectComponent.$inject = ['$location', '$state'];

	function LoginRedirectComponent($location, $state) {
		var vm = this;

		activate();

		function activate() {
            var params = $location.search();
            console.log(params);
			$state.go('main.home')
		}
	}
})();
