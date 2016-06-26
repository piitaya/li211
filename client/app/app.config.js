(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ["$urlRouterProvider", "$stateProvider", "$httpProvider", "$mdIconProvider", "$mdThemingProvider", "LoopBackResourceProvider"];

    function config($urlRouterProvider, $stateProvider, $httpProvider, $mdIconProvider, $mdThemingProvider, LoopBackResourceProvider) {

        // Material angular
        $mdIconProvider.defaultFontSet('material-icons');

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink');

        // Routes
        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get("$state");
            $state.go('main.home');
        });

        // Use a custom auth header instead of the default 'Authorization'
        LoopBackResourceProvider.setAuthHeader('Authorization');

        // Change the URL where to access the LoopBack REST API server
        LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

        $stateProvider
            .state('loginRedirect', {
                url: '/login/redirect',
                component: 'loginRedirect'
            })

            .state('login', {
                url: '/login',
                component: 'login'
            })

            .state ('main', {
                abstract: true,
                component: 'main'
            })

            .state('main.home', {
                url: '/',
                component: 'home'
            });
    }

    angular.module("app")
        .run(run);

    run.$inject = ['$transitions'];

    function run($transitions) {
        $transitions.onStart({}, function($state, $transition$) {
            console.log("go to " + $transition$.$to().name);
        });
    }

})();
