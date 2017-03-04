app.controller('cliente', function($scope, $rootScope, $state, $http, $filter) {

    $("#datatable").DataTable({
        responsive: true,
        "autoWidth": false,
        "language": {
            "url": "../assets/json/datatable.json?!"
        },
        "ajax": {
            "url": window.api + "api/cliente.php?type=list&token=" + localStorage.security_token,
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
                data: "senha_con"
            },
            {
                data: "vencimento"
            },
            {
                data: "id",
                "render": function(data, type, full, meta) {
                    return "<button class='btn btn-danger btn-xs'><i class='fa fa-trash'></i></button>"+
                    " <a class='btn btn-primary btn-xs'><i class='fa fa-edit'></i></a>"+
                    " <a class='btn btn-success btnAdd btn-xs' data-toggle='modal' data-target='#modalAdd'><i class='fa fa-plus'></i></a>"+
                    " <a class='btn btn-warning btn-xs'><i class='fa fa-refresh'></i></a>"+
                    " <a class='btn btn-info btnSaldo btn-xs' data-toggle='modal' data-target='#modalSaldo'><i class='fa fa-money'></i></a>";
                }
            }
        ],
        "columnDefs": [{
            targets: 4,
            render: $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD/MM/YYYY')
        }],
    })
    $scope.$on('$viewContentLoaded', function() {

        //Script Ativar
        //Puxar dados da tabela
        var table = $('#datatable tbody')
        table.on('click', '.btnAdd', function() {
            var table = $('#datatable').DataTable();
            console.log(table.row($(this).parents('tr')).data())
            $scope.data_to_add = table.row($(this).parents('tr')).data()
            $scope.$apply()
        });
        //Ao fechar modal
        $('#modalAdd').on('hide.bs.modal', function(e) {
            $scope.completeAtivar = false
            $scope.$apply()
            $("#formAtivar").data('formValidation').resetForm();
        })
        //Ao abrir modal
        $('#modalAdd').on('show.bs.modal', function(e) {
            $scope.ativar_overlay = false
            $scope.completeAtivar = false
            $('#formAtivar')[0].reset()
            $http({
                method: 'jsonp',
                url: window.api + "../api/pacotes.php?callback=JSON_CALLBACK"        
            }).success(function(data) {
                $scope.pacotes = data.data
                $("#ativar_nome").select2({
                    placeholder: 'Selecione um pacote',
                    allowClear: true,
                    theme: "bootstrap",
                    data: $scope.pacotes,
                    width: '100%'
                }).change(function(e) {
                    $('#formAtivar').formValidation('revalidateField', 'ativar_pacote');
                })
            })
        })
        //Ao submeter modal
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
            var send = {
                user_id: $scope.data_to_add.id,
                pacote: $("#ativar_nome").val()
            }         
            console.log(send)
            $scope.ativar_overlay = true
            $http({
                method: 'jsonp',
                url: window.api + "api/ssh/ativar.php?callback=JSON_CALLBACK",
                params: send,
                paramSerializer: '$httpParamSerializerJQLike'
            }).success(function(data) {
                $scope.ativar_overlay = false
                $scope.completeAtivar = true
                $scope.data_ativar = data
            })
        })



        //Script Adicionar
        //Puxar dados da tabela
        var table = $('#datatable tbody')
        table.on('click', '.btnSaldo', function() {
            var table = $('#datatable').DataTable();
            console.log(table.row($(this).parents('tr')).data())
            $scope.data_to_add = table.row($(this).parents('tr')).data()
            $scope.$apply()
        });
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
                url: window.api + "api/saldo/adicionar_saldo.php?callback=JSON_CALLBACK",
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