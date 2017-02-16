app.controller('login', function($scope, $http, $httpParamSerializerJQLike, $state, $rootScope) {

    $scope.$on('$viewContentLoaded', function() {
        $('#form').formValidation({
            
        }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();
	        var send = {
                data: $scope.data,
                type: "email"
            }
            $http({
                method: 'jsonp',
                url: window.api + "api/login.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data) {
                if (data.data.length == 0) {
                    $scope.FormError = true
                    $scope.$apply()
                }
                if (data.data.length == 1) {
                    res = data.data[0]
                    localStorage.uid = res.id
                    localStorage.nome = res.nome
                    $rootScope.nome = localStorage.nome
                    localStorage.security_token = res.token
                    $scope.FormError = false
                    $state.go("app.home")
                }
            })
		})
    });
    $("#face_login").click(function() {
        FB.login(function(response) {
            $.ajax({
            dataType: "jsonp",
            callback: "callback",
            url: window.api+"api/login.php",
            data: "facebook_id="+response.authResponse.userID+"&type=facebook",
            success: function(data) {
                console.log(data)
                var res = data.data[0]
                if( data.data.length === 0 ){
                    $scope.FormError = true
                    $scope.$apply()
                } else {
                    res = data.data[0]
                    localStorage.uid = res.id
                    localStorage.nome = res.nome
                    $rootScope.nome = localStorage.nome
                    localStorage.security_token = res.token
                    $scope.FormError = false
                    $scope.$apply()
                    $state.go("app.home")
                    
                }
            }
        });
        }, {
            scope: 'public_profile,email'
        });
    })
});