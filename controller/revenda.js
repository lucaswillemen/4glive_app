app.controller('revenda', function($scope, $rootScope, $state, $http) {

    //Load data home
    $http({
        method: 'jsonp',
        url: window.api + "api/home.php?callback=JSON_CALLBACK&token="+localStorage.security_token        
    }).success(function(data) {
        $scope.data = data.data[0]
        $scope.revenda_link = "https://4glive.com.br/app/#/indicador/"+$scope.data.email
        console.log($scope.data)
    })

    //Load pacotes
    $http({
        method: 'jsonp',
        url: window.api + "api/pacotes.php?callback=JSON_CALLBACK"        
    }).success(function(data) {
        $scope.pacotes = data.data
        console.log(data.data)
        $("#ativar_pacote").select2({
            placeholder: 'Selecione um pacote',
            allowClear: true,
            theme: "bootstrap",
            data: $scope.pacotes,
            width: '100%'
        }).change(function(e) {
            $('#formAtivar').formValidation('revalidateField', 'ativar_pacote');
        })
    })

    //Load indicados
    $http({
        method: 'jsonp',
        url: window.api + "api/indicados.php?callback=JSON_CALLBACK&id=" + localStorage.uid        
    }).success(function(data) {
        $scope.indicados = data.data
        console.log(data.data)
        $("#ativar_email").select2({
            placeholder: 'Selecione um cliente',
            allowClear: true,
            theme: "bootstrap",
            data: $scope.indicados,
            width: '100%'
        }).change(function(e) {
            $('#formAtivar').formValidation('revalidateField', 'ativar_email');
        })
    })
    $scope.$on('$viewContentLoaded', function() {

        //Solicitar saque
        $("#btnSaque").click(function() {
            $('#formSaque')[0].reset()
        })
        $('#modalSaque').on('hide.bs.modal', function(e) {
            $scope.FormSaqueComplete = false
            $scope.$apply()
            $("#formSaque").data('formValidation').resetForm();
        })
        $('#formSaque').formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-close'
            },
            row: {
                valid: 'has-success',
                invalid: 'has-error'
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();

            var send = {
                data: $scope.data_saque,
                action: "create"
            }
            send.data.token = localStorage.security_token

            $http({
                method: 'jsonp',
                url: window.api + "api/saldo/solicitar_saque.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data, status, header, config) {
                if (data.status) {
                	$scope.FormSaqueComplete = true
                	$scope.FormSaqueStatus = data.status
                	var valor = parseFloat(data.valor)
                	console.log(valor)
                	console.log($scope.data.saldo)
                	console.log($scope.data.saldo - valor)
                	$scope.data.saldo -= valor
            	}else{
                	$scope.FormSaqueComplete = true   
                	$scope.FormSaqueStatus = data.status         		
            	}
            })
        })


        //Solicitar ativação
        $("#btnAtivar").click(function() {
            $('#formAtivar')[0].reset()
        })
        $('#modalAtivar').on('hide.bs.modal', function(e) {
            $("#formAtivar").data('formValidation').resetForm();
            $scope.overlayAtivar = false
            $scope.completeAtivar = false
            $scope.$apply()
        })
        $('#formAtivar').formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-close'
            },
            row: {
                valid: 'has-success',
                invalid: 'has-error'
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();
            $scope.overlayAtivar = true

            var send = {
                pacote: $("#ativar_pacote").val(),
                indicado: $("#ativar_email").val(),
                token: localStorage.security_token
            }

            $http({
                method: 'jsonp',
                url: window.api + "api/ssh/ativar.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data, status, header, config) {
                console.log(data);
                if (data.status) {
                    $scope.data_ativar = data
                    $scope.completeAtivar = true
                    $scope.FormAtivarStatus = false
                    $scope.overlayAtivar = false
                    $scope.data.saldo -= data.valor
                }else{
                    $scope.FormAtivarStatus = true
                    $scope.overlayAtivar = false
                }
            })
        })
    })
});