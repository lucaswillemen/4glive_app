app.controller('home', function($scope, $rootScope, $state, $http) {
    $http.jsonp(window.api + "api/home.php?token="+localStorage.security_token).then(function(res) {
    	var data = res.data
        $scope.data = data.data[0]
	    open_overlay()
    })
    $scope.today = new Date().toISOString().substring(0, 10)
    	if (localStorage.security_token) {
		$rootScope.nome = localStorage.nome
	}else{
		$state.go("login")
	}
});