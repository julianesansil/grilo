app.factory("SessionStorage", function() {

	var _setSession = function(chave, valor) {
		sessionStorage.setItem(chave, JSON.stringify(valor));
	};

	var _getSession = function(chave) {
		return JSON.parse(sessionStorage.getItem(chave));
	};

	var _removeSession = function(chave) {
		sessionStorage.removeItem(chave);
	};

	return {
		setSession: _setSession,
		getSession: _getSession,
		removeSession: _removeSession
	};

});