define({ 
  
  cityArr : undefined,
  
  searchCity: function() {
    var query = this.view.flxSearchBox.txtSearchBox.text;
    var CitySeg = this.view.flxSearch.segSearchCity;
    
    if (query.length >= 3) {
      this.getCity(query);
      this.view.flxSearch.lblMessage.isVisible = false;
    } else{
      CitySeg.isVisible = false;
      this.view.flxSearch.lblMessage.isVisible = true;
    }
  },
 
  
  getCity:function(query){

    var integrationClient = null;
    var data = null;
    var self = this;
    var input = this.view.flxSearchBox.txtSearchBox;
    var CitySeg = this.view.flxSearch.segSearchCity;
    var params = { "query" : query};
    var headers = null;


     CitySeg.widgetDataMap = {
      lblSearchCity:"cityName",
      cityId:"cityId"

    };

     integrationClient = kony.sdk.getCurrentInstance().getIntegrationService("GoogleCitySearch"); 

     integrationClient
        .invokeOperation("getCities", headers, params, 
                      function(result) {
                        
						CitySeg.isVisible = true;
        				
                        data =  JSON.stringify(result.results);
                        data = JSON.parse(data);
                        
       					CitySeg.setData(data);
						self.cityArr = data;
                      }, 
                      function(error) {
                       	alert("Integration Service Failure :" + JSON.stringify(error));
                      }
  );
    
 
},
  
  choiseCity: function( data) { 
    alert( this.cityArr[data].cityName+' was succesfully added to the list');
    newCity.push(this.cityArr[data]);
  },
 
  showNewCity: function(){
  	alert(newCity);
}
 
 });