'use strict'

var app = angular.module('appBuscaCep', ['ionic','ngMask'])
.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(window.Connection)
    {
        if(navigator.connection.type == Connection.NONE)
        {
            $ionicPopup.confirm({
                title: "Internet desconectada",
                content: "Não existe conexão com a internet ativa."
            })
            .then(function(result) {
                if(!result) {
                    navigator.app.exitApp();
                }
            });
        }
    }
  });
})
