'use strict'

app.controller('CalcCtrl', function ($scope) {
    $scope.formData = {};
    $scope.mostraVisor = function (valor) {
        if (valor != '') {
            if ($scope.formData.visor == undefined)
                $scope.formData.visor = '';
            if (valor == '=')
                $scope.formData.visor = parseFloat(eval($scope.formData.visor));
            else if (valor == 'CE')
                $scope.formData.visor = '';
            else if (valor == '<=')
                $scope.formData.visor = $scope.formData.visor.substring(0, $scope.formData.visor.length-1);
            else if (!isNaN($scope.formData.visor) && $scope.formData.visor != '')
                $scope.formData.visor += valor;
            else if ((!isNaN(valor) && $scope.formData.visor.length == 0) || 
                ($scope.formData.visor.length > 1 && isNaN($scope.formData.visor.substring(0, $scope.formData.visor.length-1))))
                $scope.formData.visor += valor;
            else if (!isNaN(valor))
                $scope.formData.visor += valor;
        }
    };
});
