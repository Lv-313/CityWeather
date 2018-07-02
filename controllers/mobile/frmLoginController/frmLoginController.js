define({   
  login: function () {
	const idSvc = getIdentityService();
    data = {
      "userid": this.view.txtUser.text,
      "password": this.view.txtPassword.text
    };
    idSvc.login(data,
              function(response) {
      setAppUserID(data.userid);
      
      navigateTo("frmCities");
//    const target = new kony.mvc.Navigation('frmCities');
//    target.navigate();
    }, function(error) {
      alert("Login failure!\n" + JSON.stringify(error));
    });
  }
});