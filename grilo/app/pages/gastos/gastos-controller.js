app.controller('GastosController', function ($scope, $rootScope, $location, $mdDialog, $mdMedia, Services, SessionStorage) {
    var idConvenio = $location.search().id_convenio;
    var corEstrela = 'color:#FFFC77; text-shadow: 0px 0px 1px #000;';

    var getSession = function() {
        $scope.areaAtuacao = SessionStorage.getSession("areaAtuacao");
        $scope.proponente = SessionStorage.getSession("proponente");
        $scope.convenios = SessionStorage.getSession("convenios");
        $scope.convenio = SessionStorage.getSession("convenio");
        $scope.gastos = SessionStorage.getSession("gastos");

        $scope.conveniosFavoritos = SessionStorage.getSession("conveniosFavoritos");
        if (!$scope.conveniosFavoritos) {
            $scope.conveniosFavoritos = [];
        } else if ($scope.convenios) {
            pintarEstrelas($scope.convenios, $scope.conveniosFavoritos, corEstrela);
        }
    };


    $scope.carregarGastos = function(idConvenio) {
        Services.listarGastos(idConvenio).then(
            function(response) {
                if (response.data.success) {
                    $scope.gastos = response.data.data;

                    SessionStorage.setSession("gastos", $scope.gastos); 
                    $rootScope.carregado = true;           
                } else {
                    delete $scope.gastos;
                    $rootScope.carregado = true;
                    console.log("Aviso:", response.data.message);    
                }
            },

            function(error) {
                $rootScope.erro = true;
                console.log("Erro:", error.status, error.message);
            }
        );
    };

    $scope.mostrarObjetoConvenio = function() {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/pages/dialogs/convenio-objeto.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {convenio: $scope.convenio}
        });
    };

    $scope.favoritarOuDesfavoritarConvenio = function(convenio) {
        favoritarOuDesfavoritar(convenio, $scope.conveniosFavoritos, corEstrela);
        SessionStorage.setSession("conveniosFavoritos", $scope.conveniosFavoritos);

        atualizarArrayPai(convenio, $scope.convenios);
        SessionStorage.setSession("convenio", convenio); 
        SessionStorage.setSession("convenios", $scope.convenios); 
    };


    var carregarView = function(idConvenio) {
        $rootScope.carregado = false;
        $rootScope.erro = false;
        getSession();

        if (!$scope.gastos) {
            $scope.carregarGastos(idConvenio);
        } else {
            $rootScope.carregado = true;
        }
    };

    carregarView(idConvenio);
});

function DialogController($scope, $mdDialog, convenio) {
    $scope.convenio = convenio;

    $scope.fechar = function() {
        $mdDialog.cancel();
    };
}