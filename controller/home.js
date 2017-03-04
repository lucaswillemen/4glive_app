app.controller('home', function($scope, $rootScope, $state, $http) {
    $http({
        method: 'jsonp',
        url: window.api + "api/home.php?callback=JSON_CALLBACK&token="+localStorage.security_token,
        
    }).success(function(data) {
        $scope.data = data.data[0]
        console.log($scope.data)
	    open()
    })
    $scope.today = new Date().toISOString().substring(0, 10)
});