app.controller('register', function($scope, $http, $httpParamSerializerJQLike, $state) {

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
                },
                'nascimento': {
                    validators: {
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'Data inválida'
                        }
                    }
                }
            }
        }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();
	        var send = {
	            data: $scope.data,
	            action: "create",
	            type: "loja"
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
	                $scope.FormError = false
	                localStorage.uid = data.row.id
	                localStorage.nome = data.row.nome
	                $state.go("app.home")
	            }
	        })
		})
        $('.datepicker').on('dp.change dp.show', function(e) {
            $('#meetingForm').formValidation('revalidateField', 'meeting');
        });
    });
});