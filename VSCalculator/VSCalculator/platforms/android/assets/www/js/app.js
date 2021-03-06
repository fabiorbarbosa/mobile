'use strict'

var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});