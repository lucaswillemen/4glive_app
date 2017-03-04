app.controller('pacote', function($scope, $rootScope, $state, $http, $filter) {

    $("#datatable").DataTable({
        responsive: true,
        "autoWidth": false,
        "language": {
            "url": "../assets/json/datatable.json"
        },
        "ajax": {
            "url": window.api + "api/pacote.php?type=list&token=" + localStorage.security_token,
            "dataType": "jsonp",
            "callback": "callback"
        },
        columns: [
            {
                data: "validade"
            },
            {
                data: "nome"
            },
            {
                data: "preco",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "nv1",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "nv2",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "nv3",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "nv4",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "nv5",
                "render": function(data, type, full, meta) {
                    return $filter('currency')(data, 'R$ ')
                }
            },
            {
                data: "id",
                "render": function(data, type, full, meta) {
                    return "<button class='btn btn-danger btn-xs'><i class='fa fa-trash'></i></button>"+
                    " <a class='btn btn-primary btn-xs'><i class='fa fa-edit'></i></a>"
                }
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