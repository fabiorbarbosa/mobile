'use strict'

app.value('config', {
    baseUrlLogradouro : 'http://viacep.com.br/ws/{0}/json/',
    baseUrlCEP : 'http://viacep.com.br/ws/{0}/{1}/{2}/json/'
})
.service('serviceCorreios', function ($http, $ionicPopup, $ionicLoading, config) {
    this.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>'
        });
    };
    this.hideLoading = function(){
        $ionicLoading.hide();
    };

    this.getLogradouro = function (cep) {
        return $http.get(String.format(config.baseUrlLogradouro, cep));
    }
    this.getCEP = function (uf, cidade, logradouro) {
        return $http.get(String.format(config.baseUrlCEP, uf, cidade, logradouro));
    }
    this.showAlert = function(tit, msg) {
        var alertPopup = $ionicPopup.alert({
            title: tit,
            template: msg
        });
    };
});