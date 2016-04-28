'use strict'

app.controller('mainCtrl', function($scope, servTaskList){
  $scope.taskLists = [];
  $scope.addTaskList = function(){
    $scope.taskLists.push(servTaskList.addTaskList('testestes'));
  };
})
