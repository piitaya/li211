(function () {
	'use strict';

	angular
	.module('app')
	.component('jobNew', {
		templateUrl: 'app/job/job.new.html',
		controller: JobNewComponent,
		controllerAs: "vm"
	});

	JobNewComponent.$inject = ['Job', '$state'];

	function JobNewComponent(Job, $state) {
		var vm = this;

    vm.job = {
    }

    vm.create = create;

		vm.$onInit = function() {
		}

    function create() {
      Job.create(vm.job).$promise.then(function(job) {
        $state.go("main.jobs");
      })
    }
	}
})();
