app.service('servTaskList', function($ionicPopup){
  this.addTaskList = function(descricao){
    return { Descricao: descricao, Finalizada: false };
  };
  this.modalNewTask = function(){
    $ionicPopup.prompt({
      title: 'Nova Tarefa',
      template: ' Template',
    }).then(function(res) {
      console.log('Your password is', res);
    });
  };
});
