(function() {
    'use strict';

    angular
        .module('app')
        .factory('AccountService', AccountService);

    AccountService.$inject = ['$q', 'User'];

    /* @ngInject */
    function AccountService($q, User) {
        var account = {};

        var service = {
            setAccount: setAccount,
            getAccount: getAccount
        };

        return service;

        function setAccount() {
          var deferred = $q.defer();

          User.getCurrent().$promise.then(function(user) {
            account = user;
            deferred.resolve();
          }).catch(function(err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }

        function getAccount() {
          return account;
        }
    }
})();
