'use strict'

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('menu', {
      url: '/',
      templateUrl: 'templates/menu.html',
      controller: 'menuCtrl'
    })
    .state('cep', {
      url: '/cep',
      templateUrl: 'templates/cep.html',
      controller: 'cepCtrl'
    })
    .state('logradouro', {
      url: '/logradouro',
      templateUrl: 'templates/logradouro.html',
      controller: 'logradouroCtrl'
    });
  $urlRouterProvider.otherwise("/");
});