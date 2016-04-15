app.filter('camelCase', function() {
    return function(input) {
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
    }
});

app.filter('primeiraMaiuscula', function() {
    return function(input) {

        if (!!input) {
            input = input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
            return input;
        }
    }
});

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
