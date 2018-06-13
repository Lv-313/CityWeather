define([],function(){
	var BaseModel = kony.mvc.Data.BaseModel;
	
	var setterFunctions = {
		cityID : function(val, state){
			state['cityID'] = val;
		},
		cityName : function(val, state){
			state['cityName'] = val;
		},
		id : function(val, state){
			state['id'] = val;
		},
		userID : function(val, state){
			state['userID'] = val;
		},
	};
	
	
	//Create the Model Class
	function locations(defaultValues){
		var privateState = {};
			privateState.cityID = defaultValues?(defaultValues["cityID"]?defaultValues["cityID"]:null):null;
			privateState.cityName = defaultValues?(defaultValues["cityName"]?defaultValues["cityName"]:null):null;
			privateState.id = defaultValues?(defaultValues["id"]?defaultValues["id"]:null):null;
			privateState.userID = defaultValues?(defaultValues["userID"]?defaultValues["userID"]:null):null;
		//Using parent contructor to create other properties req. to kony sdk	
			BaseModel.call(this);

		//Defining Getter/Setters
			Object.defineProperties(this,{
				"cityID" : {
					get : function(){return privateState.cityID},
					set : function(val){
						setterFunctions['cityID'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"cityName" : {
					get : function(){return privateState.cityName},
					set : function(val){
						setterFunctions['cityName'].call(this,val,privateState);
					},
					enumerable : true,
				},
				"id" : {
					get : function(){return privateState.id},
					set : function(val){throw Error("id cannot be changed."); },
					enumerable : true,
				},
				"userID" : {
					get : function(){return privateState.userID},
					set : function(val){
						setterFunctions['userID'].call(this,val,privateState);
					},
					enumerable : true,
				},
			});

	}
	
	//Setting BaseModel as Parent to this Model
	BaseModel.isParentOf(locations);
	
	//Create new class level validator object
	BaseModel.Validator.call(locations);
	
	var registerValidatorBackup = locations.registerValidator;
	
	locations.registerValidator = function(){
		var propName = arguments[0];
		if(!setterFunctions[propName].changed){
			var setterBackup = setterFunctions[propName];
			setterFunctions[arguments[0]] = function(){
				if( locations.isValid(this, propName, val) ){
					return setterBackup.apply(null, arguments);
				}else{
					throw Error("Validation failed for "+ propName +" : "+val);
				}
			}
			setterFunctions[arguments[0]].changed = true;
		}
		return registerValidatorBackup.apply(null, arguments);
	}
	
	//Extending Model for custom operations
	
	var relations = [
	];
	
	locations.relations = relations;
	
	locations.prototype.isValid = function(){
		return locations.isValid(this);
	};
	
	locations.prototype.objModelName = "locations";
	
	return locations;
});