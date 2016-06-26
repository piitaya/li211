(function () {
	'use strict';

	angular
		.module('app')
		.component('loginRedirect', {
			template: '',
			controller: LoginRedirectComponent,
			controllerAs: "vm"
		});

	LoginRedirectComponent.$inject = ['$location', '$state', 'LoopBackAuth', 'User'];

	function LoginRedirectComponent($location, $state, LoopBackAuth, User) {
		var vm = this;

		vm.$onInit = function() {
            var params = $location.search();
			LoopBackAuth.currentUserId = params.userId;
			LoopBackAuth.accessTokenId = params.accessToken;
			LoopBackAuth.rememberMe = true;
			LoopBackAuth.save();

			$state.go('main.home');
		}
	}
})();
