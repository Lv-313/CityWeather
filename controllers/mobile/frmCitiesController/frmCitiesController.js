define({ 
  
  fetchData: function(){
    const self = this;
	let objSvc = getObjectService();
    let dataObject = new kony.sdk.dto.DataObject("locations");

    let odataUrl = "$filter=userID eq " + getAppUserID();
    dataObject.odataUrl = odataUrl;

    let options = {"dataObject":dataObject};

    objSvc.fetch(options, function(res) {
      let intSvc = getIntegrationService();
      let citiesID = "";
      let records = res.records; 
      for(let i=0; i < records.length; i++){
        citiesID += records[i].cityID;
        if (i !== records.length -1){
          citiesID += ",";
        }
      }

      intSvc.invokeOperation("getWeatherByCityId", null, {cityId: citiesID},
              function(response){
                let responseData = response.weatherList;
                for(let i=0; i < responseData.length; i++){
                  for(let j=0; j < records.length; j++){
                    if(responseData[i].cityId==records[j].cityID){
                      responseData[i].pk = records[j].id;    
                    }
                  }
                } 
                self.bindData(responseData);
      	  }, function(error){
        	   alert("Integration service error" + JSON.stringify(error));
      });

    }, function(err) {
         alert("Failed to fetch : \n" + JSON.stringify(err));
       }
    );
  },

  bindData: function(data) {
    const list = this.view.lstCities;

    let dataInfo = [];
    for(let i=0; i < data.length; i++){
      let element = {
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
    navigateTo("frmSearch");
//  const target = new kony.mvc.Navigation('frmSearch');
//  target.navigate();
  },

  deleteRecord: function(){
    const self = this;
    function alertHandlerCallBck(value) {
      if(value === true) {
        let cityData = self.view.lstCities.selectedRowItems;
		let objSvc = getObjectService();
        let dataObject = new kony.sdk.dto.DataObject("locations");
        dataObject.addField("userID", getAppUserID());
        dataObject.addField("cityID", cityData[0].cityId);
        dataObject.addField("id", cityData[0].userPk);
        let options = {"dataObject":dataObject};

        objSvc.deleteRecord(options, 
          function(res){
            alert('City was removed!');
            self.fetchData();
          },function(err){
              alert("Failed to deleting : \n" + JSON.stringify(err));
          }
        ); 
      }
    }
    let alertBasic = {
      message:"Remove this city",
      alertType:constants.ALERT_TYPE_CONFIRMATION,
      alertHandler:alertHandlerCallBck};
    let alertPSP = {};	
    let alertConfirm = new kony.ui.Alert(alertBasic, alertPSP);
  }

});

