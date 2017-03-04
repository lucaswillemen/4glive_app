app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            abstract: true,
            url: "/app",
            views: {
                "menu": {
                    templateUrl: "template/menu.html?" + window.version,
                    controller : "menu"
                },
                "header": {
                    templateUrl: "template/header.html?" + window.version
                },
                "root": {
                    template: ' <ng-view ui-view="view"></ng-view>'
                }
            }
        })
        .state('login', {
            url: "/login",
            views: {
                "root": {
                    templateUrl: "template/login.html?" + window.version,
                   controller: "login"
                }
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "root": {
                    templateUrl: "template/register.html?" + window.version,
                   controller: "register"
                }
            }
        })
        .state('app.home', {
            url: "/home",
            views: {
                "view": {
                    templateUrl: "template/home.html?" + window.version,
                    controller: "home"
                }
            }
        })
        
        .state('app.cliente', {
            url: "/cliente",
            views: {
                "view": {
                    templateUrl: "template/cliente.html?1" + window.version,
                    controller: "cliente"
                }
            }
        })
        .state('app.revendedor', {
            url: "/revendedor",
            views: {
                "view": {
                    templateUrl: "template/revendedor.html?1" + window.version,
                    controller: "revendedor"
                }
            }
        })
        .state('app.servers', {
            url: "/servers",
            views: {
                "view": {
                    templateUrl: "template/servers.html?" + window.version,
                    controller: "servers"
                }
            }
        })
        .state('app.caixa', {
            url: "/caixa",
            views: {
                "view": {
                    templateUrl: "template/caixa.html?" + window.version,
                    controller: "caixa"
                }
            }
        })
        .state('app.pacote', {
            url: "/pacote",
            views: {
                "view": {
                    templateUrl: "template/pacote.html?" + window.version,
                    controller: "pacote"
                }
            }
        })
        $urlRouterProvider.otherwise("/login")
})