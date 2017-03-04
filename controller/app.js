window.api = "https://4glive.com.br/app/"
window.version = "0.5"
var app = angular.module('StartApp', ['ngMessages', 'ui.router', 'ngStorage', 'ui.utils.masks', 'ngCordova']);

function open() {
    $("body").removeClass("loading-overlay-showing")
}
//App principal
app.controller('Main', function($scope, $rootScope, $state, $http) {
    $http({
        method: 'jsonp',
        url: window.api + "api/version.php?callback=JSON_CALLBACK"
    }).success(function(data) {
        if (data.v != window.version && location.pathname == "/android_asset/www/index.html") {
            $("#modalAtualizar").modal("show")
        }
    })
    $rootScope.logout = function() {
        localStorage.clear()
        $state.go("login")
    }
    if (localStorage.security_token) {
        $rootScope.nome = localStorage.nome
    } else {
        $state.go("login")
    }
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            $("html").removeClass("sidebar-left-opened")
        })
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
            console.log("carregou")
            $("body").addClass("loading-overlay-showing")
        })
    $scope.open_link_update = function() {
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        document.addEventListener("deviceready", function() {
            $cordovaInAppBrowser.open('market://details?id=glive.com.br', '_system', options)
                .then(function(event) {
                    // success
                })
                .catch(function(event) {
                    // error
                });


            //$cordovaInAppBrowser.close();

        }, false);
    }
});