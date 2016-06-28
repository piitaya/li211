(function () {
	'use strict';

	angular
	.module('app')
	.component('jobList', {
		templateUrl: 'app/job/job.list.html',
		controller: JobListComponent,
		controllerAs: "vm",
		bindings: {
			jobs: "<"
		}
	});

	JobListComponent.$inject = ['Job', 'Comment'];

	function JobListComponent(Job, Comment) {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
