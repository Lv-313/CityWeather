define({ 
  login: function () {
    const ids = kony.sdk.getCurrentInstance().getIdentityService('userstore');
    data = {
		"userid": this.view.txtUser.text,
		"password": this.view.txtPassword.text
	};
    ids.login(data,
      function(response) {
      	setAppUserID(data.userid);
        const target = new kony.mvc.Navigation('frmCities');
        target.navigate();
	}, function(error) {
		alert("Login failure!\n" + JSON.stringify(error));
    });
  }
});