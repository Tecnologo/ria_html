var provider = (function($){
	/**
		Endpoint reference
		http://www.groupkt.com/post/f2129b88/free-restful-web-services-to-consume-and-test.htm
	**/

	var ENDPOINTS = {
		baseURL: 'http://localHost:9000',
		BUSCAR_PAISES: '/searchContry?text={SEARCH_STRING}',
		OBTENER_PAISES: '/getAll',
		OBTENER_TERRITORIOS_POR_PAIS : '/getRegionsByCountry?country={COUNTRY_CODE}',
		BUSCAR_ESTADO: '/getStateByCountry?country={COUNTRY_CODE}&text={SEARCH_STRING}',
		OBTENER_CLIMA_POR_LUGAR: '/getWeather?cuidad={CUIDAD}&country={COUNTRY_NAME}'
	};
	var publicScope = {};
	publicScope.obtenerPaises = function(){
		return $.ajax({
		  url: ENDPOINTS.baseURL + ENDPOINTS.OBTENER_PAISES
		}).then(function(response){
			return response.RestResponse.result;
		});
	};
	publicScope.buscarPaises = function(searchString){
		return  $.ajax({
		  url: ENDPOINTS.baseURL + ENDPOINTS.BUSCAR_PAISES.replace('{SEARCH_STRING}', searchString)
		}).then(function(response){
			return response.RestResponse.result;
		});
	};
	publicScope.obtenerTerritorioPorPais = function(countryCode){
		return $.ajax({
		  url: ENDPOINTS.baseURL + ENDPOINTS.OBTENER_TERRITORIOS_POR_PAIS.replace('{COUNTRY_CODE}', countryCode)
		}).then(function(response){
			return response.RestResponse.result;
		});
	};
	publicScope.buscarEstado = function(countryCode, searchString){
		return $.ajax({
		  url: ENDPOINTS.baseURL + ENDPOINTS.BUSCAR_ESTADO.replace('{COUNTRY_CODE}', countryCode).replace('{SEARCH_STRING}', searchString)
		}).then(function(response){
			return response.RestResponse.result;
		});
	};
	publicScope.buscarClima = function(countryCode, cityCode){
		return $.ajax({
		  url: ENDPOINTS.baseURL + ENDPOINTS.OBTENER_CLIMA_POR_LUGAR.replace('{COUNTRY_NAME}', countryCode).replace('{CUIDAD}', cityCode)
		}).then(function(response){
			return response.RestResponse.result;
		});
	}; 
	return publicScope;

})(jQuery);