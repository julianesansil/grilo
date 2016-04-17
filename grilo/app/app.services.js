app.factory("Services", function($http) {
    function _get(url) {
        return $http.get("http://cpro26850.publiccloud.com.br/grilo-ws/" + url);   
        // return $http.get("http://localhost/grilo/grilo-ws" + url);
    };

    function _listarEstados() {
        return _get("/get_uf.php");
    };

    function _listarMunicipios(uf) {
        return _get("/get_municipio.php?uf=" + uf);
    };

    function _listarAreasAtuacao(idMunicipio) {
        return _get("/get_areas.php?id_municipio=" + idMunicipio);
    };

    function _listarRankingMunicipal(idMunicipio) {
        return _get("/get_ranking.php?id_municipio=" + idMunicipio);
    };

    function _listarRankingNacional() {
        return _get("/get_ranking.php");
    };

    function _listarOBsMunicipal(idMunicipio) {
        return _get("/get_ultimas_ob.php?id_municipio=" + idMunicipio);
    };

    function _listarOBsNacional() {
        return _get("/get_ultimas_ob.php");
    };

    function _listarProponentes(idMunicipio, idArea) {
        return _get("/get_proponentes_by_area.php?id_municipio=" + idMunicipio + "&id_area=" + idArea);
    };

    function _listarConvenios(idProponente) {
        return _get("/get_convenios.php?id_proponente=" + idProponente);
    };

    function _listarGastos(idConvenio) {
        return _get("/get_gastos.php?id_convenio=" + idConvenio);
    };

    return {
        listarEstados: _listarEstados,
        listarMunicipios: _listarMunicipios,
        listarAreasAtuacao: _listarAreasAtuacao,
        listarRankingMunicipal: _listarRankingMunicipal,
        listarRankingNacional: _listarRankingNacional,
        listarOBsMunicipal: _listarOBsMunicipal,
        listarOBsNacional: _listarOBsNacional,
        listarProponentes: _listarProponentes,
        listarConvenios: _listarConvenios,
        listarGastos: _listarGastos
    }
});