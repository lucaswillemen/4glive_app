app.controller('indicados', function($scope, $rootScope, $state, $http) {
    open()
    console.log(localStorage.uid)
    $("#datatable").DataTable({
        responsive: true,
        "autoWidth": false,
        "language": {
            "url": "assets/json/datatable.json"
        },
        "ajax": {
            "url": window.api + "api/indicados.php?&id=" + localStorage.uid,
            "dataType": "jsonp",
            "callback": "callback"
        },
        columns: [{
                data: "nome"
            },
            {
                data: "email"
            },
            {
                data: "telefone"
            },
            {
                data: "dataregistro"
            },
            {
                data: "vencimento"
            }
        ],
        "columnDefs": [{
            targets: 4,
            render: $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD/MM/YYYY')
        },{
            targets: 3,
            render: $.fn.dataTable.render.moment('YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY HH:mm')
        }],
    })
    $scope.$on('$viewContentLoaded', function() {
        $("#btnNovo").click(function() {
        })
        $('#modalCadastrar').on('hide.bs.modal', function(e) {
            $scope.complete=false
            $scope.overlay = false
            $scope.$apply()
            $('#form')[0].reset()
            $("#form").data('formValidation').resetForm();
        })
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
            e.preventDefault();
            $scope.data.email = $scope.data.email.toLowerCase()

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
                if (data.error) {
                    $scope.FormError = true
                }
                if (data.row) {                    
                    res = data.row
                    $scope.FormError = false
                    $scope.overlay = true
                    $http({
                        method: 'jsonp',
                        url: window.api + "api/ssh/cadastro.php?callback=JSON_CALLBACK&token=" + res.token + "&email=" + res.email
                    }).success(function(res) {
                        $scope.overlay = false
                        $scope.res
                        data.row.vencimento = res.vencimento
                        $('#datatable').DataTable().row.add(data.row).draw()
                        $scope.complete=true
                        $scope.res=res
                        //$scope.$apply()
                    })
                }
            })
        })
    })
});