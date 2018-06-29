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

      var service = kony.sdk.getCurrentInstance().getIntegrationService("CoolWeatherListApi");
      let citiesID = "";
      var records = res.records; 
      for(let i=0; i < records.length; i++){
        citiesID += records[i].cityID;
        if (i !== records.length -1){
          citiesID += ",";
        }
      }


      service.invokeOperation("getWeatherByCityId", null, {cityId: citiesID},
                              function(response){
        var responseData = response.weatherList;
        for(let i=0; i < responseData.length; i++){
          for(let j=0; j < records.length; j++){
            if(responseData[i].cityId==records[j].cityID){
              responseData[i].pk = records[j].id;    
            }
          }
        } 
        self.bindData(responseData);
      },
                              function(error){
        alert(JSON.stringify(error));
      });

    },
                 function(err) {
      alert("Failed to fetch : \n" + JSON.stringify(err));
    }
                );
  },

  bindData: function(data) {
    const list = this.view.lstCities;

    var dataInfo = [];
    for(let i=0; i < data.length; i++){
      var element = {
        weatherIcon: "http://openweathermap.org/img/w/" + data[i].weatherIcon + ".png",
        cityName: data[i].cityName + ", " + data[i].country,
        tempMin: data[i].tempMin,
        tempMax: data[i].tempMax,
        cityId: data[i].cityId,
        userPk: data[i].pk
      };
      dataInfo.push(element);
    }

    list.widgetDataMap = {
      lblName: 'cityName',
      imgWeather: "weatherIcon",
      lblMinTemp: "tempMin",
      lblMaxTemp: "tempMax"
    };

    list.setData(dataInfo);
  },

  navigate: function() {
    const target = new kony.mvc.Navigation('frmSearch');
    target.navigate();
  },

  deleteRecord: function(){
    var  self = this;
    function alertHandlerCallBck(value)
    {
      if(value===true) {
        var cityData = self.view.lstCities.selectedRowItems;
        var objSvc = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
        var dataObject = new kony.sdk.dto.DataObject("locations");
        dataObject.addField("userID", getAppUserID());
        dataObject.addField("cityID", cityData[0].cityId);
        dataObject.addField("id", cityData[0].userPk);
        var options = {"dataObject":dataObject};

        objSvc.deleteRecord(options,
                            function(res){
          alert('Records deleted!');
          self.fetchData();
        },
                            function(err){alert("Failed to deleting : \n" + JSON.stringify(err));}
                           ); 
      }

    }
    var alertBasic = {message:"Kony Alert",alertType:constants.ALERT_TYPE_CONFIRMATION, alertHandler:alertHandlerCallBck};
    var alertPSP = {};	
    var alertConfirm = new kony.ui.Alert(alertBasic, alertPSP);
  }

});

