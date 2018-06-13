define({  
  fetchData: function() {
    const self = this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
    var dataObject = new kony.sdk.dto.DataObject("cities");    
    var inp = this.view.inputSearch.text;
    var odataUrl = "$filter=nm eq " + inp;
    dataObject.odataUrl = odataUrl;
    var options = {"dataObject":dataObject};

    objSvc.fetch(options,
      function(res) {
        self.bindData(res.records);
    },
      function(err){alert("Failed to fetch : \n" + JSON.stringify(err));}
    );
  },
  
  bindData: function(data) {
    const list = this.view.lstSearch;
    list.widgetDataMap = {
      lblSearchName: 'nm', 
      lblSearchCountry: 'countryCode'
    };
    
    list.setData(data);
  },
  
  create: function() {
    var cityData = this.view.lstSearch.data[0];
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
    var dataObject = new kony.sdk.dto.DataObject("locations");
    
    if(cityData.id == dataObject.getRecord('cityID')) {
      
      alert('Sorry, but city has been added');
      
    } else {
      
    dataObject.addField("userID", getAppUserID());
    dataObject.addField("cityID", cityData.id);
    dataObject.addField("cityName", cityData.nm);
    var options = {"dataObject":dataObject};

    objSvc.create(options,
      function(res) {
      	kony.application.destroyForm('frmSearch');
      	const target = new kony.mvc.Navigation('frmCities');
        target.navigate();
    },
      function(err){
      	alert("Error in city creation");
        }
    );
   }
  }
});
