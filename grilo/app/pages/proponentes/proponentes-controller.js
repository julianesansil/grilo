app.controller('ProponentesController', function ($scope,$rootScope, $q, $location, $mdDialog, Services, SessionStorage, $timeout, $log) {
    var idMunicipio = $location.search().id_municipio;
	var idArea = $location.search().id_area;
    var corEstrela = 'color:#FFFC77; text-shadow: 0px 0px 1px #000;';

    var getSession = function() {
        $scope.areaAtuacao = SessionStorage.getSession("areaAtuacao");
        $scope.proponentes = SessionStorage.getSession("proponentes");
        
        $scope.proponentesFavoritos = SessionStorage.getSession("proponentesFavoritos");
        if (!$scope.proponentesFavoritos) {
            $scope.proponentesFavoritos = [];
        } else if ($scope.proponentes) {
            pintarEstrelas($scope.proponentes, $scope.proponentesFavoritos, corEstrela);
        }
    };

    var removeDadosPassados = function() {
        SessionStorage.removeSession("convenios");
    };


	$scope.carregarProponentes = function(idMunicipio, idArea) {
        Services.listarProponentes(idMunicipio, idArea).then(
            function(response) {
                if (response.data.success) {
                    $scope.proponentes = response.data.data;
                    pintarEstrelas($scope.proponentes, $scope.proponentesFavoritos, corEstrela);

                    $scope.proponentesPesquisa = carregarArrayPesquisa($scope.proponentes);
                    $scope.proponentesTela = carregarArrayTela($scope.proponentesPesquisa);

                    SessionStorage.setSession("proponentes", $scope.proponentes);
                    $rootScope.carregado = true;
                } else {
                    delete $scope.proponentes;
                    $rootScope.carregado = true;
                    console.log("Erro:", response.data.message);    
                }
            },            

            function(error) {
                $rootScope.erro = true;
                console.log("Aviso:", error.status, error.message);
            }
        );
    };

    $scope.pesquisarQuery = function(queryProponente) {
        return pesquisar(queryProponente, $scope.proponentesPesquisa);
    };

    $scope.acharQuery = function(proponente) {
        if (proponente) {
            $scope.proponentesTela = carregarArrayTela(proponente);
        } else {
            $scope.proponentesTela = carregarArrayTela($scope.proponentesPesquisa);
        }
    };

    $scope.favoritarOuDesfavoritarProponente = function(proponente) {
        favoritarOuDesfavoritar(proponente, $scope.proponentesFavoritos, corEstrela);
        SessionStorage.setSession("proponentesFavoritos", $scope.proponentesFavoritos);

        atualizarArrayPai(proponente, $scope.proponentes);
        SessionStorage.setSession("proponentes", $scope.proponentes);
    };


    var carregarView = function(idMunicipio, idArea) {
        $rootScope.carregado = false;
        $rootScope.erro = false;
        removeDadosPassados();
        getSession();

        if (!$scope.proponentes) {
            $scope.carregarProponentes(idMunicipio, idArea);
        } else {
            $rootScope.carregado = true;

            $scope.proponentesPesquisa = carregarArrayPesquisa($scope.proponentes);
            $scope.proponentesTela = carregarArrayTela($scope.proponentesPesquisa);
        }
    };

    //Navegacao na rota
    $scope.go = function (path, proponente) {
        $location.path(path).search({id_proponente: proponente.id});
        SessionStorage.setSession("proponente", proponente);
    };

    carregarView(idMunicipio, idArea);
	
	
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
