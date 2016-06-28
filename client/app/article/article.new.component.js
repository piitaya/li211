(function () {
	'use strict';

	angular
	.module('app')
	.component('articleNew', {
		templateUrl: 'app/article/article.new.html',
		controller: ArticleNewComponent,
		controllerAs: "vm"
	});

	ArticleNewComponent.$inject = ['Article', '$state'];

	function ArticleNewComponent(Article, $state) {
		var vm = this;

    vm.article = {
      status: "draft"
    }

    vm.create = create;

		vm.$onInit = function() {
		}

    function create() {
      Article.create(vm.article).$promise.then(function(article) {
        $state.go("main.home");
      })
    }
	}
})();
