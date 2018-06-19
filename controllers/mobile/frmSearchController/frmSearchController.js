define({  
  fetchData: function() {
    const self = this;
    var objSvc = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
    var dataObject = new kony.sdk.dto.DataObject("cities");    
    var inp = this.view.inputSearch.text;

    function getFilterStartWith(str) {
      var new_str = str.slice(0,str.length-1) + String.fromCharCode(str.charCodeAt(str.length-1)+1);
      return "$filter=nm ge " + str + " and nm lt " + new_str;
    }

    var odataUrl = getFilterStartWith(inp);
    dataObject.odataUrl = odataUrl;
    var options = {"dataObject":dataObject};

    objSvc.fetch(options,
                 function(res) {
      self.bindData(res.records);
    },
                 function(err){alert("Failed to fetch : \n" + JSON.stringify(err));}
                );
  },

  searchDataTimer: function() {
    var timerName = 'searchCitiesTimer';
    try 
    {
      kony.timer.cancel(timerName);
    }
    catch(err)
    {}
    kony.timer.schedule(timerName,this.fetchData, 2, false);
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
    var odataUrl = "$filter=userID eq " + getAppUserID();
    dataObject.odataUrl = odataUrl;
    var options = {"dataObject":dataObject};

    objSvc.fetch(options,
                 function(res) {
      function equalCityID(location) {
        return location.cityID == cityData.id;
      }
      if (res.records.find(equalCityID)) {
        alert("Sorry, but city was added");
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
    },
                 function(err) {
      alert("Failed to fetch : \n" + JSON.stringify(err));
    }
                );
  }
});
