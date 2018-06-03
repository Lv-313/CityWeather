let LoginService = (function(){
  let instantiate;
  
  function init(){
    return {
      
        loginMod: function() {
         var self = this;
         let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
         this.setBrowserVisibility(true);
         let browser = this.view.browser;
         ids.loginMod({
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

       loginSuccessMod: function(response){
        var navObj = new kony.mvc.Navigation("test");
        navObj.navigate();
       },

       logoutMod: function() {
        var self = this;
        let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
        this.setBrowserVisibility(true);
        var browser = this.view.browser;
        ids.logoutMod(function () {
           alert('Success');
         }, function () {
           alert('Failure');
         }, {browserWidget: browser});
       },

       getProfileMod: function () {

        let ids = kony.sdk.getCurrentInstance().getIdentityService('CoolWeatherAuthGoogle');
        ids.getProfileMod(false,
        function(response) {
             alert('User profile is  :' + JSON.stringify(response));
         }, function(error) {
             alert('Failed to fetch profile : ' + JSON.stringify(error));
         });
       },

       setBrowserVisibility: function(visible) {
          this.view.browser.setVisibility(visible);
       }
    };
  }
  
 return {
   getInstance: function(){
     if(!instantiate){
       instantiate = init();
     }
     return instantiate;
   }
 };
 
})();
