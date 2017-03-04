app.controller('login', function($scope, $http, $httpParamSerializerJQLike, $state, $rootScope) {
    if (localStorage.uid) {
        $state.go("app.home")
    } else {
        open()
    }
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
                url: window.api + "api/login.php",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(function(res) {
                var data = res.data
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
            $http({
                method: 'jsonp',
                url: window.api + "api/login.php",
                params: "facebook_id=" + response.authResponse.userID + "&type=facebook"
            }).then(function(res) {
                var data = res.data
                console.log(data)
                var res = data.data[0]
                if (data.data.length === 0) {
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
            })
        }, {
            scope: 'public_profile,email'
        });
    })
});