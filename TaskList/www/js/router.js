app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('config',{
      url : '/config',
      templateUrl : 'templates/config.html',
      controller : 'configCtrl'
    })
    .state('categoria',{
      url : '/categoria',
      templateUrl : 'templates/categoria.html',
      controller : 'categoriaCtrl'
    })
    .state('listaTarefa',{
      url : '/listaTarefa/:categoriaId',
      templateUrl : 'templates/listaTarefa.html',
      controller : 'listaTarefaCtrl'
    })
    .state('tarefa',{
      url : '/tarefa/:listaTarefaId',
      templateUrl : 'templates/tarefa.html',
      controller : 'tarefaCtrl'
    });
    $urlRouterProvider.otherwise('/config');
});
