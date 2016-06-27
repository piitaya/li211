(function () {
	'use strict';

	angular
	.module('app')
	.component('articleDetail', {
		templateUrl: 'app/article/article-detail.html',
		controller: ArticleDetailComponent,
		controllerAs: "vm",
		bindings: {
			article: "<"
		}
	});

	ArticleDetailComponent.$inject = ['Article'];

	function ArticleDetailComponent(Article) {
		var vm = this;

		vm.comments = [];
		vm.addComment = addComment;
		vm.comment = "";

		vm.$onInit = function() {
			Article.comments({
				id: vm.article.id,
				filter: {
					include: {
						relation: "author",
						scope: {
							fields: {
								"lastname": true,
								"firstname": true
							}
						}
					}
				}
			}).$promise.then(function(comments) {
				vm.comments = comments;
			});
		}

		function addComment() {
			Article.comments.create({id: vm.article.id}, {content: vm.comment}).$promise.then(function(comment) {
				vm.comments.push(comment);
			});
		}
	}
})();
