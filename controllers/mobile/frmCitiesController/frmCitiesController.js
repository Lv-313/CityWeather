define({ 
  fetchData: function(){
  	const self = this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
    var dataObject = new kony.sdk.dto.DataObject("locations");
    
    var odataUrl = "$filter=userID eq " + getAppUserID();
    dataObject.odataUrl = odataUrl;
    
    var options = {"dataObject":dataObject};

    objSvc.fetch(options,
      function(res) {
        self.bindData(res.records);
      },
      function(err) {
          alert("Failed to fetch : \n" + JSON.stringify(err));
      }
    );
  },
  
  bindData: function(data) {
    const list = this.view.lstCities;
    list.widgetDataMap = {
      lblName: 'cityName',
      userName: 'userID'
    };
    
    list.setData(data);
  },
  
  navigate: function() {
    const target = new kony.mvc.Navigation('frmSearch');
    target.navigate();
  }
  
});