window.api = "https://4glive.com.br/app/"
window.version = "0.1"
var app = angular.module('StartApp', ['ngMessages','ui.router','ngStorage','ui.utils.masks']);

//App principal
app.controller('Main', function($scope, $rootScope, $state) {
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
});
