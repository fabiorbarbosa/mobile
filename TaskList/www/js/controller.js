'use strict'

var db = null;

app.controller('configCtrl', function($scope, $ionicPlatform, $ionicLoading, $location, $ionicHistory, $cordovaSQLite){
  $ionicHistory.nextViewOptions({
    disableAnimate : true,
    disableBack : true
  });
  $ionicPlatform.ready(function(){
    $ionicLoading.show({template:'Aguarde...'});
    if (window.cordova)
    {
      try {
        db = $cordovaSQLite.openDB({name: 'tasklist.db', iosDatabaseLocation: 'default', location: 2, createFromLocation: 1});
        db.transaction(function(tx){
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategoria (id integer primary key, nome text)");
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblListaTarefa (id integer primary key, categoria_id integer, nome text)");
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblTarefa (id integer primary key, listaTarefa_id integer, nome text)");
        }, function(err){
          alert(err.message);
          console.error(err);
        });
      } catch (e) {
        alert(e.message);
      }
      $location.path('/categoria');
      $ionicLoading.hide();
    } else {
      if (!window.openDatabase) {
	      alert('Databases are not supported in this browser.');
	    } else {
        db = window.openDatabase('tasklist.db', '1.0', 'DB TaskList', 2 * 1024 * 1024);
        db.transaction(function(tx){
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategoria (id integer primary key, nome text)");
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblListaTarefa (id integer primary key, categoria_id integer, nome text)");
          tx.executeSql("CREATE TABLE IF NOT EXISTS tblTarefa (id integer primary key, listaTarefa_id integer, nome text)");
        }, function(err){
          console.log(err);
        });
      }
      $location.path('/categoria');
      $ionicLoading.hide();
    }
  });
});

app.controller("categoriaCtrl", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite) {
  $scope.categorias = [];
  try {
    var query = 'SELECT id, nome FROM tblCategoria';
    $cordovaSQLite.execute(db, query, [])
      .then(function(result){
        if (result.rows.length > 0)
        {
          for (var i = 0; i < result.rows.length; i++) {
            $scope.categorias.push({id:result.rows.item(i).id, nome:result.rows.item(i).nome});
          }
        }
      }, function(err){
        console.log(err.message);
      });
  } catch (e) {
    alert(e.message);
    console.log(e.message);
  };
  $scope.insereCategoria = function() {
    $ionicPopup.prompt({
      title:'Nova categoria',
      inputType:'text'
    }).then(function(result) {
      if (result !== undefined) {
        var query = 'INSERT INTO tblCategoria (nome) VALUES (?)';
        $cordovaSQLite.execute(db, query, [result]).then(function(res){
          $scope.categorias.push({id:res.insertId, nome: result});
        }, function(err){
          console.error(err);
        });
      } else {
        console.log('Erro ocorrido.');
      }
    });
  };
  $scope.excluir = function(categoria){
    var queryfilhafilha = 'DELETE FROM tblTarefa WHERE listaTarefa_id IN (SELECT id FROM tblListaTarefa WHERE categoria_id = ?)';
    var queryfilha = 'DELETE FROM tblListaTarefa WHERE categoria_id = ?';
    var query = 'DELETE FROM tblCategoria WHERE id = ?';
    $cordovaSQLite.execute(db, queryfilhafilha, [categoria.id]).then(function(res) {
      $cordovaSQLite.execute(db, queryfilha, [categoria.id]).then(function(res) {
        $cordovaSQLite.execute(db, query, [categoria.id]).then(function(res) {
          $scope.categorias.splice($scope.categorias.indexOf(categoria), 1);
        }, function(err) {
          console.error(err);
        });
      }, function(err) {
        console.error(err);
      });
    }, function(err) {
      console.error(err);
    });
  };
});

app.controller("listaTarefaCtrl", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams, $ionicHistory) {
  $scope.listaTarefas = [];
  $scope.voltar = function() {
    $ionicHistory.goBack();
  };
  try {
    var query = 'SELECT id, nome FROM tblListaTarefa where categoria_id = ?';
    $cordovaSQLite.execute(db, query, [$stateParams.categoriaId])
      .then(function(result){
        if (result.rows.length > 0)
        {
          for (var i = 0; i < result.rows.length; i++) {
            $scope.listaTarefas.push({id:result.rows.item(i).id, categoria_id:result.rows.item(i).categoria_id, nome:result.rows.item(i).nome});
          }
        }
      }, function(err){
        console.log(err.message);
      });
  } catch (e) {
    alert(e.message);
    console.log(e.message);
  };
  $scope.insereCategoria = function() {
    $ionicPopup.prompt({
      title:'Nova Lista de tarefas',
      inputType:'text'
    }).then(function(result) {
      if (result !== undefined) {
        var query = 'INSERT INTO tblListaTarefa (categoria_id, nome) VALUES (?, ?)';
        $cordovaSQLite.execute(db, query, [$stateParams.categoriaId, result]).then(function(res){
          $scope.listaTarefas.push({id:res.insertId, categoria_id: $stateParams.categoriaId, nome: result});
        }, function(err){
          console.error(err);
        });
      } else {
        console.log('Erro ocorrido.');
      }
    });
  };
  $scope.excluir = function(listaTarefa){
    var queryfilha = 'DELETE FROM tblTarefa WHERE listaTarefa_id = ?';
    var query = 'DELETE FROM tblListaTarefa WHERE id = ?';
    $cordovaSQLite.execute(db, queryfilha, [listaTarefa.listaTarefa_id]).then(function(res) {
      $cordovaSQLite.execute(db, query, [listaTarefa.id]).then(function(res) {
        $scope.listaTarefas.splice($scope.tarefas.indexOf(tarefa), 1);
      }, function(err) {
        console.error(err);
      });
    }, function(err) {
      console.error(err);
    });
  };
});

app.controller("tarefaCtrl", function($scope, $ionicPlatform, $ionicPopup, $cordovaSQLite, $stateParams, $ionicHistory) {
  $scope.tarefas = [];
  $scope.voltar = function() {
    $ionicHistory.goBack();
  };
  try {
    var query = 'SELECT id, nome FROM tblTarefa where listaTarefa_id = ? ';
    $cordovaSQLite.execute(db, query, [$stateParams.listaTarefaId])
      .then(function(result){
        if (result.rows.length > 0)
        {
          for (var i = 0; i < result.rows.length; i++) {
            $scope.tarefas.push({id:result.rows.item(i).id, listaTarefa_id: result.rows.item(i).listaTarefa_id, nome:result.rows.item(i).nome});
          }
        }
      }, function(err){
        console.log(err.message);
      });
  } catch (e) {
    alert(e.message);
    console.log(e.message);
  };
  $scope.insereCategoria = function() {
    $ionicPopup.prompt({
      title:'Nova tarefa',
      inputType:'text'
    }).then(function(result) {
      if (result !== undefined) {
        var query = 'INSERT INTO tblTarefa (listaTarefa_id, nome) VALUES (?, ?)';
        $cordovaSQLite.execute(db, query, [$stateParams.listaTarefaId, result]).then(function(res){
          $scope.tarefas.push({id:res.insertId, listaTarefa_id: $stateParams.listaTarefaId,nome: result});
        }, function(err){
          console.error(err);
        });
      } else {
        console.log('Erro ocorrido.');
      }
    });
  };
  $scope.excluir = function(tarefa){
    var query = 'DELETE FROM tblTarefa WHERE id = ?';
    $cordovaSQLite.execute(db, query, [tarefa.id]).then(function(res) {
      $scope.tarefas.splice($scope.tarefas.indexOf(tarefa), 1);
    }, function(err) {
      console.error(err);
    });
  };
});
