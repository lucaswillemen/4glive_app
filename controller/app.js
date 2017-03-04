window.api = ""
window.version = "0.6"
var app = angular.module('StartApp', ['ngMessages','ui.router','ngStorage','ui.utils.masks']);
function open (){
	$("body").removeClass("loading-overlay-showing")
}
//App principal
app.controller('Main', function($scope, $rootScope, $state, $http) {
	$http.jsonp(window.api + "api/version.php").then(function(res) {
        if (res.data.v != window.version) {
        	$("#modalAtualizar").modal("show")
        }
    })
	$rootScope.logout = function(){
		localStorage.clear()
		$state.go("login")
	} 
	if (localStorage.security_token) {
		$rootScope.nome = localStorage.nome
	}else{
		$state.go("login")
	}
	$rootScope.$on('$stateChangeSuccess', 
	function(event, toState, toParams, fromState, fromParams){ 
	    $("html").removeClass("sidebar-left-opened")
	})
	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    $("body").addClass("loading-overlay-showing")
	})
});
