
var favoritarOuDesfavoritar = function(item, arrayFavoritos, corEstrela) {
    if (!isFavoritado(item, arrayFavoritos)) {
        // Favorita
        arrayFavoritos.push(item);
        item.corEstrela = corEstrela;
    } else {
        // Desfavorita
        arrayFavoritos.splice(indexFavoritado(item, arrayFavoritos), 1);
        item.corEstrela = null;
    }
};

var isFavoritado = function(item, arrayFavoritos) {
    return arrayFavoritos.some(function(element) {
        return element.id == item.id;
    });
};

var indexFavoritado = function(item, arrayFavoritos) {
    return arrayFavoritos.filter(function (element) { 
        return element.id == item.id;
    });
};

//Procura o item no array
//Atualiza esse item no array
var atualizarArrayPai = function(item, array) {
    array.forEach(function(element, index) {
        if (element.id == item.id) {
            array[index] = item;
        }
    });
}

//Procura os elements do array que estao favoritados, ou seja, que estao presentes no arrayFavoritos
//Pinta esses elements
var pintarEstrelas = function(array, arrayFavoritos, corEstrela) {
    array.forEach(function(element) {
        if (isFavoritado(element, arrayFavoritos)) {
            element.corEstrela = corEstrela;
        }
    });
};
