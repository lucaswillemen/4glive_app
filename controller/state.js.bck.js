app.config(function($routeProvider, $urlRouterProvider) {

    $routeProvider
        .when('app', {
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
        .when('login', {
            url: "/login",
            views: {
                "root": {
                    templateUrl: "template/login.html?" + window.version,
                   controller: "login"
                }
            }
        })
        .when('register', {
            url: "/register",
            views: {
                "root": {
                    templateUrl: "template/register.html?" + window.version,
                   controller: "register"
                }
            }
        })
        .when('app.home', {
            url: "/home",
            views: {
                "view": {
                    templateUrl: "template/home.html?" + window.version,
                    controller: "home"
                }
            }
        })
        
        .when('app.add', {
            url: "/add",
            views: {
                "view": {
                    templateUrl: "template/add.html?" + window.version,
                    controller: "add"
                }
            }
        })
        .when('app.fatura', {
            url: "/fatura",
            views: {
                "view": {
                    templateUrl: "template/fatura.html?" + window.version,
                    controller: "fatura"
                }
            }
        })
        .when('app.extrato', {
            url: "/extrato",
            views: {
                "view": {
                    templateUrl: "template/extrato.html?" + window.version,
                    controller: "extrato"
                }
            }
        })
        .when('app.indicados', {
            url: "/indicados",
            views: {
                "view": {
                    templateUrl: "template/indicados.html?" + window.version,
                    controller: "indicados"
                }
            }
        })
        .when('app.revenda', {
            url: "/revenda",
            views: {
                "view": {
                    templateUrl: "template/revenda.html?" + window.version,
                    controller: "revenda"
                }
            }
        })
        $urlRouterProvider.otherwise("/login")
})