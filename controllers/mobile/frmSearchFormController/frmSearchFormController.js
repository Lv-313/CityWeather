define({ 
 
  
getCity:function(){
 
  var integrationClient = null;
  var cities = this.view.rchText;
  var input = this.view.flxSearchBox.txtSearchBox;
  
  var serviceName = "GoogleCitySearch";
  var operationName = "getCities";
  var params = { "query" : input.text};
  var headers = null;
 

   integrationClient = kony.sdk.getCurrentInstance().getIntegrationService("GoogleCitySearch"); 
 
integrationClient.invokeOperation("getCities", headers, params , 
	function(result) {
  	cities.text = JSON.stringify(result.results);
     
	//alert("Integration Service Response is :" + JSON.stringify(result));
	}, 
	function(error) {
     alert("Integration Service Failure :" + JSON.stringify(error));
	}
);
  
  
  
}
  
  /*
  
  login: function() {
   var self = this;
   let ids = kony.sdk.getCurrentInstance().getIdentityService('ITAKonyAuth');
   this.setBrowserVisibility(true);
   let browser = this.view.browser;
   ids.login({
     browserWidget: browser,
     success_url: 'itafacebook://com.orgname.itaFacebook'
   }, function(response) {
     self.setBrowserVisibility(false);
     self.view.lblFacebook.text = "Success\n\n" + JSON.stringify(response);
     self.loginSuccess();
   }, function(error) {
     self.setBrowserVisibility(false);
     alert('Failure\n\n' + JSON.stringify(error));
   });
 },*/
 });