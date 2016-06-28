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

    // Login Page
    .state('login', {
      url: '/login',
      component: 'login'
    })

    // Main State
    .state ('main', {
      abstract: true,
      component: 'main',
      data: {
        requireLogin: true
      },
      resolve: {
        user: function(AccountService) {
          return AccountService.setAccount().then(function() {
            return AccountService.getAccount();
          });
        }
      }
    })

    // Account
    .state('main.account', {
      url: '/account',
      component: 'account',
      resolve: {
        user: function(AccountService) {
          return AccountService.getAccount();
        }
      }
    })

    // user
    .state('main.users', {
      url: '/users',
      component: 'userList',
      resolve: {
        users: function(User) {
          return User.find().$promise;
        }
      }
    })

    .state('main.user', {
      url: '/users/:slug',
      component: 'userDetail',
      resolve: {
        users: function(User, $stateParams) {
          var slug = $stateParams.slug;
          return User.findOne({
            filter: {
              where: {
                slug: slug
              }
            }
          }).$promise;
        }
      }
    })

    // Home
    .state('main.home', {
      url: '/',
      component: 'home'
    })

    // Articles
    .state('main.article-new', {
      url: '/articles/new',
      component: 'articleNew'
    })

    .state('main.article', {
      url: '/articles/:slug',
      component: 'articleDetail',
      resolve: {
        article: function(Article, $stateParams) {
          var slug = $stateParams.slug;
          return Article.findOne({
            filter: {
              where: {
                slug: slug
              },
              include: "author"
            }
          }).$promise;
        }
      }
    })

    // Jobs
    .state('main.jobs', {
      url: '/jobs',
      component: 'jobList',
      resolve: {
        jobs: function(Job) {
          return Job.find({
            filter: {
              include: "author"
            }
          }).$promise;
        }
      }
    })

    .state('main.job-new', {
      url: '/jobs/new',
      component: 'jobNew'
    })

    .state('main.job', {
      url: '/jobs/:slug',
      component: 'jobDetail',
      resolve: {
        job: function(Job, $stateParams) {
          var slug = $stateParams.slug;
          return Job.findOne({
            filter: {
              where: {
                slug: slug
              },
              include: "author"
            }
          }).$promise;
        }
      }
    });
  }

  angular.module("app")
  .run(run);

  run.$inject = ['$transitions', 'User'];

  function run($transitions, User) {
    $transitions.onStart({}, function($state, $transition$) {
      console.log("go to " + $transition$.$to().name);
      if (!User.isAuthenticated() && $transition$.$to().data && $transition$.$to().data.requireLogin) {
        $state.go('login');
      }
    });
  }

})();
