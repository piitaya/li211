(function () {
	'use strict';

	angular
	.module('app')
	.component('jobDetail', {
		templateUrl: 'app/job/job.detail.html',
		controller: JobDetailComponent,
		controllerAs: "vm",
		bindings: {
			job: "<"
		}
	});

	JobDetailComponent.$inject = ['Job'];

	function JobDetailComponent(Job) {
		var vm = this;

		vm.$onInit = function() {
		}
	}
})();
