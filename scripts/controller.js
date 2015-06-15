var controller = (function($, provider){

	var publicScope = {};

	var container = null;
	var paisesLista = [];

	var countryCode = '';
	var nombreCountry = ''

	var cityCode = '';
	var cityName = '';
	
	var searchString = '';

	var buscarPaises = function(){
		return provider.buscarPaises(searchString).then(function(dataRaw){
			return dataRaw;
		});

	};
	var obtenerPaises = function(){
		return provider.obtenerPaises().then(function(dataRaw){
			return dataRaw;
		});
	};
	var obtenerTerritorioPorPais = function(){
		return provider.obtenerTerritorioPorPais (countryCode).then(function(dataRaw){
			return dataRaw;
		});

	};
	var buscarEstado = function(){
		return  provider.buscarEstado(countryCode, searchString).then(function(dataRaw){
			return dataRaw;
		});

	};
	var buscarClima = function(){
		return  provider.buscarClima(nombreCountry, cityName).then(function(dataRaw){
			return dataRaw;
		});

	};

	var crearDropDown = function( lista, label, value, id){
		var select = $('#' + id).size() > 0 ? $('#' + id) : $('<select id=\'' + id + '\'></select>');
		if(lista.length === 0){
			select.find('option').remove()
		}else{
			for(var i = 0; i < lista.length; i++){
				var item = lista[i];
				select.append($('<option value=\''+item[value]+'\'>'+item[label]+'</option>'));
			};
		}
		return select;
	};
	var crearDropDownPaises = function(){
		/*creo un dropdown con la lista de paises*/
		var select = crearDropDown(paisesLista, 'name', 'alpha3_code' , 'country-dropdown');
		/*Cuando el evento change se dispara me fijo que elemento fue seleccionado en el dropdown*/
		select.change(function(e){
			countryCode = select.val();
			nombreCountry = select.find("option:selected").text();
			publicScope.listarRegiones();
		});

		/*agrego el dropdown al documento*/
		container.append(select);
	};
	/**
		devuelve una lista de objetos como este : 
		{
			abbr: "AP"
			area: "160205SKM"
			capital: "Hyderabad, India"
			country: "IND"
			largest_city: "Visakhapatnam"
			name: "Andhra Pradesh"
		}
	**/
	var mostrarClima = function(){
		buscarClima(nombreCountry, cityCode).then(function(e){
			$('#climatable',container).remove();	
			var table = $('<table id="climatable"></table>');
			var header = $('<tr></tr>');
			var body = $('<tr></tr>');
			for(n in e){
				if(e.hasOwnProperty(n)){
					var headerTitle = $('<th></th>');
					headerTitle.html(n);
					header.append(headerTitle);
					var bodyCol = $('<td></td>');
					bodyCol.html(e[n]);
					body.append(bodyCol);
				}
			}
			table.append(header);
			table.append(body);
			container.append(table);
		});
	};
	publicScope.listarRegiones = function(){
		obtenerTerritorioPorPais().then(function(regiones){
			console.info(regiones)
			var select = crearDropDown(regiones, 'name', 'abbr' ,'region-dropdow');
			/*Cuando el evento change se dispara me fijo que elemento fue seleccionado en el dropdown*/
			select.change(function(e){
				cityCode = select.val();
				cityName = select.find("option:selected").text();
				mostrarClima();
			});

			/*agrego el dropdown al documento*/
			container.append(select);

		});
	};
	$(document).ready(function(){
		 
		 container = $('.information-container');
		 
		 obtenerPaises().then(function(data){
		 		paisesLista = data;
		 		console.info(paisesLista)
		 		crearDropDownPaises();
		 });

	});
	return publicScope;
})(jQuery, provider);