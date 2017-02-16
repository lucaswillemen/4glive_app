app.controller('revenda', function($scope, $rootScope, $state, $http) {
    $http({
        method: 'jsonp',
        url: window.api + "api/home.php?callback=JSON_CALLBACK&token="+localStorage.security_token        
    }).success(function(data) {
        $scope.data = data.data[0]
        $scope.revenda_link = "https://4glive.com.br/app/#/indicador/"+$scope.data.email
        console.log($scope.data)
    })
    $http({
        method: 'jsonp',
        url: window.api + "api/pacotes.php?callback=JSON_CALLBACK"        
    }).success(function(data) {
        $scope.pacotes = data.data
        console.log(data.data)
        $("#ativar_nome").select2({
            placeholder: 'Selecione um pacote',
            allowClear: true,
            theme: "bootstrap",
            data: $scope.pacotes,
            width: '100%'
        })
    })
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
        })
    })
    $scope.$on('$viewContentLoaded', function() {
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
                invalid: 'fa fa-close',
                validating: 'fa fa-refresh'
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



        $("#btnAtivar").click(function() {
            $('#formAtivar')[0].reset()
                        $scope.complete=false
        })
        $('#modalAtivar').on('hide.bs.modal', function(e) {
            $("#formAtivar").data('formValidation').resetForm();
        })
        $('#formAtivar').formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-close',
                validating: 'fa fa-refresh'
            },
            row: {
                valid: 'has-success',
                invalid: 'has-error'
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();

            var send = {
                data: $scope.data,
                action: "create"
            }
            send.data.indicador_id = localStorage.uid
            send.data.senha = '123456'

            $http({
                method: 'jsonp',
                url: window.api + "api/cadastro.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data, status, header, config) {
                console.log(data);
            })
        })
    })
});