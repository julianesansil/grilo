app.controller('HomeController', function ($scope, $rootScope, $location, $mdDialog, $sce, Services, SessionStorage) {
    var cores = ['#FF8A80', '#82B1FF', '#B9F6CA', '#FFFF8D', '#FF9E80', '#A7FFEB', '#EA80FC'];
    var coresUsadas = [];

    var getEstadoMunicipio = function () {
        $scope.estado = SessionStorage.getSession("estado");
        $scope.municipio = SessionStorage.getSession("municipio");
    };

    var getDadosHome = function () {
        $scope.areasAtuacao = SessionStorage.getSession("areasAtuacao");
        $scope.rankingMunicipal = SessionStorage.getSession("rankingMunicipal");
        $scope.rankingNacional = SessionStorage.getSession("rankingNacional");
        $scope.obsMunicipal = SessionStorage.getSession("obsMunicipal");
        $scope.obsNacional = SessionStorage.getSession("obsNacional");

        $scope.proponentesFavoritos = SessionStorage.getSession("proponentesFavoritos");
        if (!$scope.proponentesFavoritos) {
            $scope.proponentesFavoritos = [];
        }

        $scope.conveniosFavoritos = SessionStorage.getSession("conveniosFavoritos");
        if (!$scope.conveniosFavoritos) {
            $scope.conveniosFavoritos = [];
        }
    };

    $scope.removeDadosHome = function () {
        SessionStorage.removeSession("areasAtuacao");
        SessionStorage.removeSession("rankingMunicipal");
        SessionStorage.removeSession("rankingNacional");
        SessionStorage.removeSession("obsMunicipal");
        SessionStorage.removeSession("obsNacional");
    };

    var removeDadosPassados = function () {
        SessionStorage.removeSession("proponentes");
    };


    $scope.mostrarDialogLocalizacao = function () {
        $mdDialog.show({
            controller: DialogLocalizacaoController,
            templateUrl: 'app/pages/dialogs/filtro-localizacao.html',
            scope: $scope.$new(),
            clickOutsideToClose: false
        });
    };
    $rootScope.carregado = true;

    $scope.mostrarDialogSobre = function () {
        $mdDialog.show({
            controller: DialogTextoController,
            templateUrl: 'app/pages/dialogs/sobre.html',
            scope: $scope.$new(),
            clickOutsideToClose: false
        });
    };

    $scope.carregarAreasAtuacao = function (idMunicipio) {
        delete $scope.areasAtuacao;

        Services.listarAreasAtuacao(idMunicipio).then(
            function (response) {
                $scope.aviso = response.data.message;

                if (response.data.success) {
                    $scope.areasAtuacao = {};
                    $scope.areasAtuacao.lista = response.data.data;

                    var totalProponentes = 0;
                    var valorTotalAreas = 0;
                    $scope.areasAtuacao.lista.forEach(function (element) {
                        element.cor = randomCor();
                        totalProponentes += parseInt(element.total);
                        valorTotalAreas += parseFloat(element.valor_total);
                    });

                    $scope.areasAtuacao.total = {};
                    $scope.areasAtuacao.total.totalProponentes = totalProponentes;
                    $scope.areasAtuacao.total.valorTotalAreas = valorTotalAreas;

                    SessionStorage.setSession("areasAtuacao", $scope.areasAtuacao);
                    $scope.carregadoArea = true;
                } else {
                    delete $scope.areasAtuacao;
                    $scope.carregadoArea = true;
                    console.log("Aviso:", response.data.message);
                }
            },

            function (error) {
                $scope.erroArea = true;
                console.log("Erro:", error.status, error.message);
            }
        );
    };

    $scope.carregarRankingMunicipal = function (idMunicipio) {
        delete $scope.rankingMunicipal;

        Services.listarRankingMunicipal(idMunicipio).then(
            function (response) {
                if (response.data.success) {
                    $scope.rankingMunicipal = response.data.data;

                    SessionStorage.setSession("rankingMunicipal", $scope.rankingMunicipal);
                    $scope.carregadoRankingMunicipal = true;
                } else {
                    delete $scope.rankingMunicipal;
                    $scope.carregadoRankingMunicipal = true;
                    console.log("Aviso:", response.data.message);
                }
            },

            function (error) {
                $scope.erroRankingMunicipal = true;
                console.log("Erro:", error.status, error.message);
            }
        );
    };

    $scope.carregarRankingNacional = function () {
        delete $scope.rankingNacional;

        Services.listarRankingNacional().then(
            function (response) {
                if (response.data.success) {
                    $scope.rankingNacional = response.data.data;

                    SessionStorage.setSession("rankingNacional", $scope.rankingNacional);
                    $scope.carregadoRankingNacional = true;
                } else {
                    delete $scope.rankingNacional;
                    $scope.carregadoRankingNacional = true;
                    console.log("Aviso:", response.data.message);
                }
            },

            function (error) {
                $scope.erroRankingNacional = true;
                console.log("Erro:", error.status, error.message);
            }
        );
    };

    $scope.carregarOBs = function (idMunicipio) {
        delete $scope.obsMunicipal;

        Services.listarOBsMunicipal(idMunicipio).then(
            function (response) {
                if (response.data.success) {
                    $scope.obsMunicipal = response.data.data;
                    SessionStorage.setSession("obsMunicipal", $scope.obsMunicipal);
                } else {
                    delete $scope.obsMunicipal;
                    console.log("Aviso:", response.data.message);
                }
            },

            function (error) {
                console.log("Erro:", error.status, error.message);
            }
        );


        delete $scope.obsNacional;
        
        Services.listarOBsNacional().then(
            function (response) {
                if (response.data.success) {
                    $scope.obsNacional = response.data.data;

                    SessionStorage.setSession("obsNacional", $scope.obsNacional);
                    $scope.carregadoOBs = true;
                } else {
                    delete $scope.obsNacional;
                    $scope.carregadoOBs = true;
                    console.log("Aviso:", response.data.message);
                }
            },

            function (error) {
                $scope.erroOBs = true;
                console.log("Erro:", error.status, error.message);
            }
        );
    };

    $scope.desfavoritarProponente = function(proponente) {
        favoritarOuDesfavoritar(proponente, $scope.proponentesFavoritos, null);
        SessionStorage.setSession("proponentesFavoritos", $scope.proponentesFavoritos);
    };

    $scope.desfavoritarConvenio = function(convenio) {
        favoritarOuDesfavoritar(convenio, $scope.conveniosFavoritos, null);
        SessionStorage.setSession("conveniosFavoritos", $scope.conveniosFavoritos);
    };
    
    var randomCor = function () {
        var cor;
        if (coresUsadas.length == 0 || coresUsadas.length == cores.length)
            coresUsadas = [];

        do {
            cor = cores[Math.floor(Math.random() * cores.length)];
        } while (coresUsadas.indexOf(cor) >= 0);
        coresUsadas.push(cor);

        return cor;
    };


    $scope.init = function () {
        removeDadosPassados();
        getEstadoMunicipio();

        if (!$scope.estado && !$scope.municipio) {
            $scope.carregadoArea = true;
            $scope.mostrarDialogLocalizacao();
        }
        else {
            getDadosHome();

            if (!$scope.areasAtuacao ||
                !$scope.obsMunicipal ||
                !$scope.obsNacional) {
                $scope.carregarView($scope.municipio);
            }
            $scope.carregadoArea = true;
            $scope.carregadoOBs = true;

            if (!$scope.rankingMunicipal) {
                $scope.carregarRankingMunicipal($scope.municipio.id);
            }
            $scope.carregadoRankingMunicipal = true;

            if (!$scope.rankingNacional) {
                $scope.carregarRankingNacional();
            }
            $scope.carregadoRankingNacional = true;
        }
    };

    $scope.carregarView = function (municipio) {
        $rootScope.erro = false;
        $scope.carregadoArea = false;
        $scope.carregadoRankingMunicipal = false;
        $scope.carregadoRankingNacional = false;
        $scope.carregadoOBs = false;

        $scope.erroArea = false;
        $scope.erroRankingMunicipal = false;
        $scope.erroRankingNacional = false;
        $scope.erroOBs = false;

        getEstadoMunicipio();

        $scope.carregarAreasAtuacao(municipio.id);
        $scope.carregarRankingMunicipal(municipio.id);
        $scope.carregarRankingNacional();
        $scope.carregarOBs(municipio.id);
    };

    //Navegacao na rota
    $scope.goArea = function (path, areaAtuacao) {
        if (areaAtuacao.id == 'T') {
            areaAtuacao = {
                id: "T",
                descricao: "Todas",
                total: $scope.areasAtuacao.total.totalProponentes,
                valor_total: $scope.areasAtuacao.total.valorTotalAreas,
                cor: '#FF8A80'
            };
        }

        $location.path(path).search({id_municipio: $scope.municipio.id, id_area: areaAtuacao.id});
        SessionStorage.setSession("areaAtuacao", areaAtuacao);
    };

    //Navegacao na rota
    $scope.goConveniosFavoritos = function (path, item) {
        $location.path(path).search({id_proponente: item.id});
        SessionStorage.removeSession("convenios");
        SessionStorage.setSession("proponente", item);
    };

    //Navegacao na rota
    $scope.goGastosFavoritos = function (path, item) {
        $location.path(path).search({id_convenio: item.id});
        SessionStorage.removeSession("gastos");
        SessionStorage.setSession("convenio", item);
    };

    //Navegacao na rota
    $scope.goGastos = function (path, item) {
        var convenio = {
            numero_interno: item.numero_interno_convenio,
            valor_global: item.valor_global,
            objeto: item.objeto_convenio,
            justificativa: item.justificativa,
            nome_orgao_concendente: item.orgao_concedente
        };

        $location.path(path).search({id_convenio: item.id_conveio});
        SessionStorage.removeSession("gastos");
        SessionStorage.setSession("convenio", convenio);
    };

    	
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


function DialogLocalizacaoController($scope, $mdDialog, Services, SessionStorage) {

    $scope.fechar = function () {
        $mdDialog.hide();
    };

    $scope.filtrar = function (municipio) {
        $mdDialog.hide();
        SessionStorage.setSession("estado", $scope.filtro.estado);
        SessionStorage.setSession("municipio", $scope.filtro.municipio);

        $scope.mostrarDialogSobre();

        $scope.removeDadosHome();
        $scope.carregarView(municipio);
    };

    $scope.carregarEstados = function () {
        Services.listarEstados().then(
                function (response) {
                    $scope.estados = response.data;
                },
                function (error) {
                    $scope.erroLocalizacao = true;
                    console.log("Erro:", error.status, error.message);
                }
        );
    };

    $scope.carregarMunicipios = function (uf) {
        delete $scope.filtro.municipio;
        
        Services.listarMunicipios(uf).then(
                function (response) {
                    $scope.municipios = response.data;

                    if ($scope.municipios.length == 1) {
                        $scope.filtro.municipio = $scope.municipios[0];
                    }

                },
                function (error) {
                    $scope.erroLocalizacao = true;
                    console.log("Erro:", error.status, error.message);
                }
        );
    };


    $scope.erroLocalizacao = false;
    $scope.carregarEstados();

    //APAGAR DEPOIS
    $scope.filtro = {estado: "DF"};
    $scope.carregarMunicipios($scope.filtro.estado);
    $scope.filtro.municipio = {id: 14292};
};


function DialogTextoController($scope, $mdDialog) {
    $scope.pessoaLogada = "Nome da pessoa logada";
    $scope.anonimo = "Anônimo";
	
    $scope.fechar = function() {
        $mdDialog.cancel();
    };
};
