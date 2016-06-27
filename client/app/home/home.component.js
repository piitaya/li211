(function () {
	'use strict';

	angular
	.module('app')
	.component('home', {
		templateUrl: 'app/home/home.html',
		controller: HomeComponent,
		controllerAs: "vm"
	});

	HomeComponent.$inject = ['Article'];

	function HomeComponent(Article) {
		var vm = this;

		vm.articles = [];

		vm.$onInit = function() {
			Article.find({
				filter: {
					include: "author",
					counts: "comments"
				}
			}).$promise.then(function(articles) {
				vm.articles = articles;
			});
		}
	}
})();
