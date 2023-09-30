const Geolocation = require("../models/Geolocation");
const data = async(socketID) =>{
  console.log(socketID);
  return socketID
};
const updateDbWithNewLocation = async (payload, oldGeoLocationInfo) => {
  
  const isOnline = await Geolocation.findByPk(payload.id);
  
  if(!isOnline){
    return 
  }
  const [, [newLocation]] = await Geolocation.update(
    {
      online: oldGeoLocationInfo.online,
      socketID: payload.socketID,
      trackerID: oldGeoLocationInfo.trackerID,
      location: {
        type: "Point",
        coordinates: [payload.longitude, payload.latitude],
        // coordinates: [payload.coords.longitude, payload.coords.latitude],
      },
    },
    { where: { id :isOnline.dataValues.id}, returning: true }
  );
  return newLocation;
};
module.exports = { updateDbWithNewLocation, data };




// "id":4
// "coords": {
//              "accuracy": 7299.612787273156,
//              "altitude": null,
//              "altitudeAccuracy": null,
//              "heading": null,
//              "latitude": 6.5568768,
//              "longitude": 3.3488896,
//              "speed": null
//  },
// "timestamp": 1665474267691
