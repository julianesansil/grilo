app.controller('ConveniosController', function ($scope,$rootScope, $location, $mdDialog, Services, SessionStorage) {
    var idProponente = $location.search().id_proponente;
    var corEstrela = 'color:#FFFC77; text-shadow: 0px 0px 1px #000;';

    var getSession = function() {
        $scope.areaAtuacao = SessionStorage.getSession("areaAtuacao");
        $scope.proponentes = SessionStorage.getSession("proponentes");
        $scope.proponente = SessionStorage.getSession("proponente");
        $scope.convenios = SessionStorage.getSession("convenios");

        $scope.proponentesFavoritos = SessionStorage.getSession("proponentesFavoritos");
        if (!$scope.proponentesFavoritos) {
            $scope.proponentesFavoritos = [];
        } else if ($scope.proponentes) {
            pintarEstrelas($scope.proponentes, $scope.proponentesFavoritos, corEstrela);
        }

        $scope.conveniosFavoritos = SessionStorage.getSession("conveniosFavoritos");
        if (!$scope.conveniosFavoritos) {
            $scope.conveniosFavoritos = [];
        } else if ($scope.convenios) {
            pintarEstrelas($scope.convenios, $scope.conveniosFavoritos, corEstrela);
        }
    };

    var removeDadosPassados = function() {
        SessionStorage.removeSession("gastos");
    };

    
    $scope.carregarConvenios = function(idProponente, idPrograma) {
        Services.listarConvenios(idProponente).then(
            function(response) {
                if (response.data.success) {
                    $scope.convenios = response.data.data;
                    pintarEstrelas($scope.convenios, $scope.conveniosFavoritos, corEstrela);

                    $scope.conveniosPesquisa = carregarArrayPesquisaNumero($scope.convenios);
                    $scope.conveniosTela = carregarArrayTela($scope.conveniosPesquisa);

                    SessionStorage.setSession("convenios", $scope.convenios);
                    $rootScope.carregado = true;
                } else {
                    delete scope.convenios;
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

    $scope.pesquisarQuery = function(queryConvenio) {
        return pesquisar(queryConvenio, $scope.conveniosPesquisa);
    };

    $scope.acharQuery = function(convenio) {
        if (convenio) {
            $scope.conveniosTela = carregarArrayTela(convenio);
        } else {
            $scope.conveniosTela = carregarArrayTela($scope.conveniosPesquisa);
        }
    };

    $scope.favoritarOuDesfavoritarProponente = function(proponente) {
        favoritarOuDesfavoritar(proponente, $scope.proponentesFavoritos, corEstrela);
        SessionStorage.setSession("proponentesFavoritos", $scope.proponentesFavoritos);

        atualizarArrayPai(proponente, $scope.proponentes);
        SessionStorage.setSession("proponente", proponente); 
        SessionStorage.setSession("proponentes", $scope.proponentes);
    };

    $scope.favoritarOuDesfavoritarConvenio = function(convenio) {
        favoritarOuDesfavoritar(convenio, $scope.conveniosFavoritos, corEstrela);
        SessionStorage.setSession("conveniosFavoritos", $scope.conveniosFavoritos);

        atualizarArrayPai(convenio, $scope.convenios);
        SessionStorage.setSession("convenios", $scope.convenios); 
    };


    var carregarView = function(idProponente) {
        $rootScope.carregado = false;
        $rootScope.erro = false;
        removeDadosPassados();
        getSession();

        if (!$scope.convenios) {
            $scope.carregarConvenios(idProponente);
        } else {
            $rootScope.carregado = true;

            $scope.conveniosPesquisa = carregarArrayPesquisaNumero($scope.convenios);
            $scope.conveniosTela = carregarArrayTela($scope.conveniosPesquisa);
        }
    };

    // Navegacao na rota
    $scope.go = function (path, convenio) {
        $location.path(path).search({id_convenio: convenio.id});
        SessionStorage.setSession("convenio", convenio);
    };
    
    carregarView(idProponente);
	
	
	$scope.comentar = function() {
        $mdDialog.show({
            controller: DialogTextoController,
            templateUrl: 'app/pages/dialogs/comentario.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

    $scope.denunciar = function() {
        $mdDialog.show({
            controller: DialogTextoController,
            templateUrl: 'app/pages/dialogs/denuncia.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };

	$scope.compartilhar = function() {
		
	};
});


function DialogTextoController($scope, $mdDialog) {
    $scope.pessoaLogada = "Nome da pessoa logada";
    $scope.anonimo = "Anônimo";
	
    $scope.fechar = function() {
        $mdDialog.cancel();
    };
};

