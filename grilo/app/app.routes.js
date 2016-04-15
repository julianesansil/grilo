var componentsPath = "app/components/";
var pagesPath = "app/pages/";
var sharedPath = "app/shared/";
var routes = {
    "/": {
        "config": {
            "templateUrl": pagesPath + "home/home.html",
            "controller": "HomeController"
        },
        "layout": {
            "show_back_menu": false,
            "backMessage": "",
            "topMessage": "Home",
            "show_top_menu": true
        }
    },
    "/proponentes": {
        "config": {
            "templateUrl": pagesPath + "proponentes/proponentes.html",
            "controller": "ProponentesController"
        },
        "layout": {
            "show_back_menu": true,
            "backMessage": "Proponentes",
            "topMessage": "",
            "show_top_menu": false
        }
    },
    "/convenios": {
        "config": {
            "templateUrl": pagesPath + "convenios/convenios.html",
            "controller": "ConveniosController"
        },
        "layout": {
            "show_back_menu": true,
            "backMessage": "Convênios",
            "topMessage": "",
            "show_top_menu": false
        }
    },

    "/gastos": {
        "config": {
            "templateUrl": pagesPath + "gastos/gastos.html",
            "controller": "GastosController"
        },
        "layout": {
            "show_back_menu": true,
            "backMessage": "Prestação de Contas",
            "topMessage": "",
            "show_top_menu": false
        }
    }
};


app.config(function ($routeProvider) {
    for (path in routes) {
//        console.log(routes[path].config);
        $routeProvider.when(path, routes[path].config);
    }
    $routeProvider
            .when('/', {
                templateUrl: 'app/pages/home/home.html',
//                controller: 'mainController'
            })
            .otherwise({redirectTo: '/'});
});

app.run(['$rootScope', '$location', '$mdDialog', '$routeParams', function ($rootScope, $location, $mdDialog, $routeParams) {
        $rootScope.$on('$locationChangeStart', function () {
            document.body.style.minHeight = "100%";
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            var path = $location.path();
            // console.log(path);
            $rootScope.displayHeader = routes[path].layout.show_top_menu;
            $rootScope.showBackMenu = routes[path].layout.show_back_menu;
            $rootScope.backMessage = routes[path].layout.backMessage;
            $rootScope.topMessage = routes[path].layout.topMessage;
            //fecha qualquer dialog ao navegar
            $mdDialog.cancel();
        });
    }]);