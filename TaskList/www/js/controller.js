'use strict'

app.controller('mainCtrl', function($scope, $ionicModal, servTaskList){

  $scope.formTaskList = [];

  $scope.taskLists = [];

  $scope.addTaskList = function(){
    $scope.taskLists.push(servTaskList.addTaskList($scope.formTaskList.task));
    $scope.modal.hide();
    $scope.formTaskList.task = '';
  };

  $ionicModal.fromTemplateUrl('templates/task.html',{
    scope:$scope
  }).then(function(modal){
    $scope.modal = modal;
  });

});
