define({
	login: function(){
      LoginService.getInstance().loginMod();
    },
  	logout: function(){
      LoginService.getInstance().logoutMod();
    },
 	getProfile: function(){
      LoginService.getInstance().getProfileMod();
    },
  	loginSuccess: function(){
  	  LoginService.getInstance().loginSuccessMod();
	}
});