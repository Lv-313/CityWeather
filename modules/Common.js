 
	login: function() {
     var self = this;
     let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
     this.setBrowserVisibility(true);
     let browser = this.view.browser;
     ids.login({
       browserWidget: browser,
       success_url: 'cityWeather://com.orgname.cityWeatherApp'
     }, function(response) {
       self.setBrowserVisibility(false);
       alert('Success\n\n' + JSON.stringify(response));
     }, function(error) {
       self.setBrowserVisibility(false);
       alert('Failure\n\n' + JSON.stringify(error));
     });
 } 
