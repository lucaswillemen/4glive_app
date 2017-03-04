app.controller('home', function($scope, $rootScope, $state, $http) {
    $http.jsonp(window.api + "api/home.php?token="+localStorage.security_token).then(function(res) {
    	var data = res.data
        $scope.data = data.data[0]
        console.log($scope.data)
	    open()
    })
    $scope.today = new Date().toISOString().substring(0, 10)
});