(function () {
	'use strict';

	angular
	.module('app')
	.component('articleDetail', {
		templateUrl: 'app/article/article.detail.html',
		controller: ArticleDetailComponent,
		controllerAs: "vm",
		bindings: {
			article: "<"
		}
	});

	ArticleDetailComponent.$inject = ['Article', 'Comment'];

	function ArticleDetailComponent(Article, Comment) {
		var vm = this;

		vm.comments = [];
		vm.addComment = addComment;
		vm.comment = "";

		vm.$onInit = function() {
			Article.comments({
				id: vm.article.id,
				filter: {
					include: "author"
				}
			}).$promise.then(function(comments) {
				vm.comments = comments;
			});
		}

		function addComment() {
			Article.comments.create({id: vm.article.id}, {content: vm.comment}).$promise.then(function(comment) {
				return Comment.findOne({
					filter: {
						where: {
							id: comment.id
						},
						include: "author"
					}
				}).$promise;
			}).then(function(comment) {
				vm.comments.push(comment);
				vm.comment = "";
			});
		}
	}
})();
