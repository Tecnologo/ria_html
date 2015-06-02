var http = require('http');
var url = require('url');
console.log('server running');
var ENDPOINTS = {
	BUSCAR_PAISES: 'http://services.groupkt.com/country/search?text={SEARCH_STRING}',
	OBTENER_PAISES: 'http://services.groupkt.com/country/get/all',
	OBTENER_TERRITORIOS_POR_PAIS : 'http://services.groupkt.com/state/get/{COUNTRY_CODE}/all',
	BUSCAR_ESTADO: 'http://services.groupkt.com/state/search/{COUNTRY_CODE}?text={SEARCH_STRING}',
	OBTENER_CLIMA_POR_LUGAR: 'http://services.groupkt.com/weather?l={CUIDAD}+{PAIS}'
};
var hitThePosta = function(url , response){
	console.log(url);
	var dataBuffer = "";
		http.get(url, function(res) {
		  res.on('data', function(data){
			dataBuffer += data.toString();
			});
		  res.on('end', function(){
		  		response.end(dataBuffer);
		  });
		}).on('error', function(e) {
			response.end(e.message); 
		});
};
var server = http.createServer(function(request, response){

	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
	if ( request.method === 'OPTIONS' ) {
		response.writeHead(200);
		response.end();
		return;
	}
	if ( request.method === 'GET' ) {
		var decode = url.parse(request.url, true);

		response.writeHead(200, {'content-type': 'application/json'});

		if(decode.pathname === '/searchContry'){ 

			hitThePosta(ENDPOINTS.BUSCAR_PAISES.replace('{SEARCH_STRING}',decode.query.text), response);

		} else	if(decode.pathname === '/getAll'){

			hitThePosta(ENDPOINTS.OBTENER_PAISES, response);

		} else if(decode.pathname === '/getRegionsByCountry'){

			hitThePosta(ENDPOINTS.OBTENER_TERRITORIOS_POR_PAIS.replace('{COUNTRY_CODE}',decode.query.country), response);

		} else if(decode.pathname === '/getStateByCountry'){

			hitThePosta(ENDPOINTS.BUSCAR_ESTADO.replace('{COUNTRY_CODE}', decode.query.country).replace('{SEARCH_STRING}',decode.query.text), response);

		} else if(decode.pathname === '/getWeather'){
			var urlToHit = ENDPOINTS.OBTENER_CLIMA_POR_LUGAR.replace('{CUIDAD}',decode.query.cuidad).replace('{PAIS}',decode.query.country);
			console.log(urlToHit)
			hitThePosta(urlToHit, response);
		
		}else{
			response.writeHead(404, {'content-type':'utf-8'});
			response.end();
		}
	}
 
	
});
server.listen(9000);