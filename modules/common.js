// User data
const __userData = {
  userID: undefined
};

function getAppUserID() {
  return __userData.userID;
}

function setAppUserID(userId){
  __userData.userID = userId;
}
/////////////////////////////////

// All services
const service = {
  identity: undefined,
  integration: undefined,
  object: undefined,
};

function setServices () {
  service.identity = kony.sdk.getCurrentInstance().getIdentityService("userstore");
  service.integration = kony.sdk.getCurrentInstance().getIntegrationService("CoolWeatherListApi");
  service.object = kony.sdk.getCurrentInstance().getObjectService("CoolWeatherDB");
}

function getIdentityService() {
  return service.identity;
}
function getIntegrationService() {
  return service.integration;
}
function getObjectService() {
  return service.object;
}
///////////////////////////////////

// Navigation to form
function navigateTo(formName) {
  let target = new kony.mvc.Navigation(formName);
  target.navigate();
}




