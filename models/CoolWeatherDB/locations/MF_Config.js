define([],function(){
	var mappings = {
		"cityID" : "cityID",
		"cityName" : "cityName",
		"id" : "id",
		"userID" : "userID",
	};
	Object.freeze(mappings);
	
	var typings = {
		"cityID" : "string",
		"cityName" : "string",
		"id" : "number",
		"userID" : "string",
	}
	Object.freeze(typings);
	
	var primaryKeys = [
					"id",
	];
	Object.freeze(primaryKeys);
	
	var config = {
		mappings : mappings,
		typings : typings,
		primaryKeys : primaryKeys,
		serviceName : "CoolWeatherDB",
		tableName : "locations"
	};
	Object.freeze(config);
	
	return config;
})
