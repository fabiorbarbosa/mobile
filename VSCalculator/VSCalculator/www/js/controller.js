'use strict'

app.controller('CalcCtrl', function ($scope) {
    $scope.formData = {};
    $scope.digitoAtual = '';
    $scope.digito1 = '';
    $scope.digito2 = '';
    $scope.operacao = '';
    $scope.mostraVisor = function (valor) {
      if ($scope.formData.visor == undefined)
        $scope.formData.visor = '';
      if (($scope.formData.visor != '' && isNaN(valor)) || (!isNaN(valor)))
      {
        if ($scope.operacao != '')
          $scope.addNumero(2, valor);
        else
          $scope.addNumero(1, valor);
        $scope.formData.visor += valor;
      }
    };
    $scope.limparVar = function() {
      $scope.digito1 = '';
      $scope.digito2 = '';
      $scope.operacao = '';
    }
    $scope.limparVisor = function(){
      $scope.formData.visor = '';
      $scope.limparVar();
    };
    $scope.limparDigitoVisor = function(){
      if ($scope.formData.visor.toString().length > 1)
        $scope.formData.visor = $scope.formData.visor.toString().substring(0, $scope.formData.visor.toString().length-1);
      $scope.delNumero();
    };
    $scope.addNumero = function(d, valor){
      if (d == 1)
        $scope.digito1 += valor;
      else
        $scope.digito2 += valor;
    };
    $scope.delNumero = function(){
      if ($scope.operacao == '')
        $scope.digito1 = $scope.digito1.substring(0, $scope.digito1.toString().length-1);
      else
        $scope.digito2 = $scope.digito2.substring(0, $scope.digito2.toString().length-1);
    };
    $scope.addOperacao = function(){
      $scope.formData.visor += $scope.operacao;
    };
    $scope.somar = function(){
      if ($scope.formataValor($scope.digito1) > 0)
      {
        $scope.operacao = '+';
        $scope.addOperacao();
      }
    };
    $scope.subtrair = function(){
      if ($scope.formataValor($scope.digito1) > 0)
      {
        $scope.operacao = '-';
        $scope.addOperacao();
      }
    };
    $scope.dividir = function(){
      if ($scope.formataValor($scope.digito1) > 0)
      {
        $scope.operacao = '/';
        $scope.addOperacao();
      }
    };
    $scope.multiplicar = function(){
      if ($scope.formataValor($scope.digito1) > 0)
      {
        $scope.operacao = '*';
        $scope.addOperacao();
      }
    };
    $scope.percentual = function(){
      if ($scope.formataValor($scope.digito2) > 0)
      {
        $scope.digito2 = (($scope.formataValor($scope.digito1) / 100) * $scope.formataValor($scope.digito2));
        $scope.resultado();
      } else if ($scope.formataValor($scope.digito1) > 0){
        $scope.operacao = '%';
        $scope.addOperacao();
      }
    };
    $scope.formataValor = function(campo){
      return campo.toString()
                   .replace('.','')
                   .replace(',','.');
    };
    $scope.resultado = function(){
      if ($scope.formataValor($scope.digito1) > 0 && $scope.formataValor($scope.digito2) > 0)
      {
        switch ($scope.operacao) {
          case '+':
            $scope.formData.visor = parseFloat($scope.formataValor($scope.digito1)) + parseFloat($scope.formataValor($scope.digito2));
            break;
          case '-':
            $scope.formData.visor = parseFloat($scope.formataValor($scope.digito1)) - parseFloat($scope.formataValor($scope.digito2));
            break;
          case '*':
            $scope.formData.visor = parseFloat($scope.formataValor($scope.digito1)) * parseFloat($scope.formataValor($scope.digito2));
            break;
          case '/':
            $scope.formData.visor = parseFloat($scope.formataValor($scope.digito1)) / parseFloat($scope.formataValor($scope.digito2));
            break;
          case '%':
            $scope.formData.visor = ((parseFloat($scope.formataValor($scope.digito2)) / 100) * parseFloat($scope.formataValor($scope.digito1)));
            break;
          default:
            $scope.formData.visor = '';
        }
        $scope.limparVar();
        $scope.addNumero(1, $scope.formData.visor);
      }
    };
});
