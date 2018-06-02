define({

 login: function() {
   var self = this;
   let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
   this.setBrowserVisibility(true);
   let browser = this.view.browser;
   ids.login({
     browserWidget: browser,
     success_url: 'cityweather://com.orgname.cityWeather'
   }, function(response) {
     self.setBrowserVisibility(false);
     alert('Success\n\n' + JSON.stringify(response));
   }, function(error) {
     self.setBrowserVisibility(false);
     alert('Failure\n\n' + JSON.stringify(error));
   });
 },
  
  /*
 loginSuccess:function(response){
  var navObj = new kony.mvc.Navigation("profileScreen");
  navObj.navigate();
  
},
*/
  
logout: function() {
  var self = this;
  let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
  this.setBrowserVisibility(true);
  var browser = this.view.browser;
  ids.logout(function () {
     alert('Success');
   }, function () {
     alert('Fuck');
   }, {browserWidget: browser});
},

showProfile: function () {
 
  let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
  ids.getProfile(false,
function(response) {
       alert('User profile is  :' + JSON.stringify(response));
   }, function(error) {
       alert('Failed to fetch profile : ' + JSON.stringify(error));
   });
},
  setBrowserVisibility: function(visible) {
    this.view.browser.setVisibility(visible);
  }
});