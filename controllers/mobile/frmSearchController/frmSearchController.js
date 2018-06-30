define({  
  fetchData: function() {
    const self = this;
    let objSvc = getObjectService();
    let dataObject = new kony.sdk.dto.DataObject("cities");    
    let inp = this.view.inputSearch.text;

    function getFilterStartWith(str) {
      if (str !== "") {
      	let new_str = str.slice(0,str.length-1) + String.fromCharCode(str.charCodeAt(str.length-1)+1);
        return "$filter=nm ge " + str + " and nm lt " + new_str;      
      } else {
        str = "a";
        let new_str = str.slice(0,str.length-1) + String.fromCharCode(str.charCodeAt(str.length-1)+1);
        return "$filter=nm ge " + str + " and nm lt " + new_str;   
        
      }
      
    }

    let odataUrl = getFilterStartWith(inp);
    dataObject.odataUrl = odataUrl;
    let options = {"dataObject":dataObject};

    objSvc.fetch(options, function(res) {
         self.bindData(res.records);
    }, function(err){
         alert("Failed to fetch this : \n" + JSON.stringify(err));
       });
  },

  searchDataTimer: function() {
    let timerName = 'searchCitiesTimer';
    try 
    {
      kony.timer.cancel(timerName);
    }
    catch(err)
    {}
    kony.timer.schedule(timerName,this.fetchData, 1, false);
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
    const cityData = this.view.lstSearch.selectedRowItems;
    
    // this will avoid multiple choice of the same row in segment list
    this.view.lstSearch.removeAll();
    
    let objSvc = getObjectService();
    let dataObject = new kony.sdk.dto.DataObject("locations");
    let odataUrl = "$filter=userID eq " + getAppUserID();
    dataObject.odataUrl = odataUrl;
    let options = {"dataObject":dataObject};

    objSvc.fetch(options, function(res) {
      function equalCityID(location) {
        return location.cityID == cityData[0].id;
      }
      if (res.records.find(equalCityID)) {
        alert("Sorry, but city was added");
//         this.view.inputSearch.text = "";
//         this.searchDataTimer();
        
      } else {
        dataObject.addField("userID", getAppUserID());
        dataObject.addField("cityID", cityData[0].id);
        dataObject.addField("cityName", cityData[0].nm);
        let options = {"dataObject":dataObject};

        objSvc.create(options, function(res) {
             kony.application.destroyForm('frmSearch');
             navigateTo("frmCities");
        }, function(err){
             alert("Error in city creation");
        });     
      }
    }, function(err) {
         alert("Failed to fetch : \n" + JSON.stringify(err));
    });
  }
  
  
});
