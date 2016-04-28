'use strict'

app.controller('menuCtrl', function($scope, serviceCorreios) {

})
.controller('logradouroCtrl', function($scope, serviceCorreios) {
    $scope.formData = {};
    $scope.ConsultarLogradouro = function () {
        if ($scope.formData.inputCep == undefined)
            serviceCorreios.showAlert('Erro','Necessário informar o CEP.');
        else {
            serviceCorreios.showLoading();
            serviceCorreios.getLogradouro($scope.formData.inputCep)
                .success(function(data){
                    if (data.erro)
                        serviceCorreios.showAlert('Erro','CEP não encontrado.');
                    else
                        $scope.dadosLogradouro = data;
                })
                .error(function(data, status){
                    serviceCorreios.showAlert('Erro',status);
                }).finally(function() {
                    serviceCorreios.hideLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    };
})
.controller('cepCtrl', function ($scope, serviceCorreios) {
    $scope.formData = {};
    $scope.UF = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PR','PB','PA','PE','PI','RJ','RN','RS','RO','RR','SC','SE','SP','TO'];
    $scope.ConsultarCEP = function () {
        if ($scope.formData.inputUF == undefined) {
            serviceCorreios.showAlert('Erro','Necessário informar a UF.');
            $scope.$broadcast('scroll.refreshComplete');
        } else if ($scope.formData.inputCidade == undefined) {
            serviceCorreios.showAlert('Erro','Necessário informar a cidade.');
            $scope.$broadcast('scroll.refreshComplete');
        } else if ($scope.formData.inputLogradouro == undefined) {
            serviceCorreios.showAlert('Erro','Necessário informar o logradouro.');
            $scope.$broadcast('scroll.refreshComplete');
        } else {
            serviceCorreios.showLoading();
            serviceCorreios.getCEP($scope.formData.inputUF, $scope.formData.inputCidade, $scope.formData.inputLogradouro)
                .success(function(data){
                    $scope.dadosCEP = data;
                })
                .error(function(data, status){
                    serviceCorreios.showAlert('Erro',status);
                }).finally(function() {
                    serviceCorreios.hideLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }
    };
});