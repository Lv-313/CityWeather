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
//         alert(JSON.stringify(response));
        //         self.bindDataToViews(response);
        self.bindData(response);
      },
                              function(error){
        alert(JSON.stringify(error));
      });


      self.bindData(res.records);
    },
                 function(err) {
      alert("Failed to fetch : \n" + JSON.stringify(err));
    }
                );
  },

  bindData: function(data) {
    const list = this.view.lstCities;



    //      service.invokeOperation("getWeatherByCityId", null, {cityId: 702550},
    //        function(response){
    //              //alert(JSON.stringify(response));
    //              self.bindDataToViews(response);
    //        },
    //        function(error){
    //              alert(JSON.stringify(error));
    //        });
 	
//     var element = {
//       weatherIcon: "http://openweathermap.org/img/w/" + data.weatherList[0].weatherIcon + ".png",
//       cityName: data.weatherList[0].cityName + ", " + data.weatherList[0].country,
//       tempMin: data.weatherList[0].tempMin,
//       tempMax: data.weatherList[0].tempMax,
//     };
   	var dataInfo = [];
    for(let i=0; i < data.weatherList.length; i++){
        var element = {
          weatherIcon: "http://openweathermap.org/img/w/" + data.weatherList[i].weatherIcon + ".png",
          cityName: data.weatherList[i].cityName + ", " + data.weatherList[i].country,
          tempMin: Math.round(data.weatherList[i].tempMin).toString() + " " + "\u2103",
          tempMax: Math.round(data.weatherList[i].tempMax).toString() + " " + "\u2103",
    	};
    	dataInfo.push(element);
    }

    list.widgetDataMap = {
      lblName: 'cityName',
      imgWeather: "weatherIcon",
      lblMinTemp: "tempMin",
      lblMaxTemp: "tempMax"
    };

    list.setData(dataInfo); //in case of real id's use addData();
  },

  navigate: function() {
    const target = new kony.mvc.Navigation('frmSearch');
    target.navigate();
  }

});


//    list.setData([dataInfo]); //in case of real id's use addData();

