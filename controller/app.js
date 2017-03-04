
var app = angular.module('StartApp', ['ngMessages','ui.router','ngStorage','ui.utils.masks']);
function open (){
	$("body").removeClass("loading-overlay-showing")
}
//App principal
app.controller('Main', function($scope, $rootScope, $state, $http) {
	$http.jsonp(window.api + "api/version.php", {jsonpCallbackParam: 'callback'}).then(function(res) {
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
	     event.preventDefault();
	})
	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    $("body").addClass("loading-overlay-showing")
	})
})

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://4glive.com.br/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
});
