const __userData = {
  userID: undefined
};

function getAppUserID() {
  return __userData.userID;
}

function setAppUserID(userId){
  __userData.userID = userId;
}

const celciusSymbol = "\u2103";
