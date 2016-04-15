
var pesquisar = function(query, arrayPesquisa) {
    var arrayResultado = query ? arrayPesquisa.filter(filtrarPor(query)) : arrayPesquisa;
    return arrayResultado;
};

var filtrarPor = function(query) {
    var lowercaseQuery = query.toLowerCase();
    
    return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
    };
};

var carregarArrayPesquisa = function(array) {
    return array.map(function(element) {
        return {
            value: element.nome.toLowerCase(),
            display: camelCase(element.nome),
            data: element
        }
    });
};

var carregarArrayPesquisaNumero = function(array) {
    return array.map(function(element) {
        return {
            value: element.numero_interno.toLowerCase(),
            display: element.numero_interno,
            data: element
        }
    });
};

var carregarArrayTela = function(arrayPesquisa) {
    arrayPesquisa = [].concat(arrayPesquisa);

    return arrayPesquisa.map(function(element) {
        return element.data;
    });
};

var camelCase = function(input) {
    var palavras;
    var palavra = " ";

    if (!!input) {
        palavras = input.toLowerCase().split(" ");

        palavras.forEach( function(element, index) {
            if (element.length > 2)
                palavras[index] = element.charAt(0).toUpperCase() + element.substr(1).toLowerCase();
            palavra += palavras[index] + " ";
        });

        return palavra.trim();
    }
    return input;
};