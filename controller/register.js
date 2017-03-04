app.controller('register', function($scope, $http, $httpParamSerializerJQLike, $state, $rootScope) {
    open()
    $scope.data = {}
    $scope.$on('$viewContentLoaded', function() {
        $('#form').formValidation({
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-close',
                validating: 'fa fa-refresh'
            },
            fields: {
                'celular': {
                    validators: {
                        notEmpty: {
                            message: 'Informe o celular'
                        },

                        regexp: {
                            regexp: /^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/,
                            message: 'Informe um número de celular válido'
                        }
                    }
                }
            }
        }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();
	        var send = {
	            data: $scope.data,
	            action: "create"
	        }
	        $http({
	            method: 'jsonp',
	            url: window.api + "api/cadastro.php?callback=JSON_CALLBACK",
	            params: send,
	            paramSerializer: '$httpParamSerializerJQLike'
	        }).success(function(data, status, header, config) {
	            console.log(data);
	            if (data.error) {
	                $scope.FormError = true
	            }
	            if (data.row) {
                    res = data.row
	                $scope.FormError = false
                    localStorage.uid = res.id
                    localStorage.nome = res.nome
                    $rootScope.nome = localStorage.nome
                    localStorage.security_token = res.token
                    $scope.overlay = true
                    $http({
                        method: 'get',
                        url: window.api + "api/ssh/cadastro.php?callback=JSON_CALLBACK&token="+res.token+"&email="+res.email
                    }).success(function(){
                        $state.go("app.home")
                        $scope.$apply()
                    })
	            }
	        })
		})
        $('.datepicker').on('dp.change dp.show', function(e) {
            $('#meetingForm').formValidation('revalidateField', 'meeting');
        });
    });
    $("#face_login").click(function() {
        FB.login(function(response) {
            console.log(response)
            FB.api('/me', {fields: 'name,email'}, function(response) {
              console.log(response);
              $scope.data.nome = response.name
              $scope.data.email = response.email
              $scope.data.facebook_id = response.id
              $scope.data.facebook_loaded = true
              $scope.$apply()

            });
            FB.api('/me/picture', function(response) {
              console.log(response);
              $scope.data.facebook_picture = response.data.url

            });
        }, {
            scope: 'public_profile,email'
        });
    })
});