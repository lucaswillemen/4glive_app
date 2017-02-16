app.controller('extrato', function($scope, $rootScope, $state, $http) {

    $("#datatable").DataTable({
        responsive: true,
        "autoWidth": false,
        "language": {
            "url": "assets/json/datatable.json"
        },
        "ajax": {
            "url": window.api + "api/extrato.php?type=list&uid=" + localStorage.uid,
            "dataType": "jsonp",
            "callback": "callback"
        },
        columns: [{
                data: "dataregistro"
            },
            {
                data: "valor",
                "render": function(data, type, full, meta) {
                    return "R$ "+data;
                }
            },
            {
                data: "ponto"
            },
            {
                data: "des"
            }
        ],
    })
    $scope.$on('$viewContentLoaded', function() {
        $('#form').formValidation({
            framework: 'bootstrap',
            icon: {
                valid: 'fa fa-check',
                invalid: 'fa fa-close',
                validating: 'fa fa-refresh'
            },
            row: {
                valid: 'has-success',
                invalid: 'has-error'
            },
            fields: {
                'data[host]': {
                    validators: {
                        ip: {
                            message: 'Insira um IP válido'
                        }
                    }
                }
            }
        }).on('success.form.fv', function(e) {
            e.preventDefault();

            var send = {
                data: $scope.data,
                action: "create"
            }
         
            $http({
                method: 'jsonp',
                url: window.api + "api/servidores.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data) {
                console.log(data)
                if (data.data.length == 0) {
                    $scope.AddPaciente = "cadastro"
                }
                if (data.data.length == 1) {
                    res = data.data[0]
                    $scope.AddPaciente = "adicionar"
                }
            })
        })
    })
});