const { updateDbWithNewLocation } = require("./helpers");
const Geolocation = require("../models/Geolocation");
const DriverHandler = (io, socket) => {
  const driverLocation = async(payload)=> {
    console.log(`driver-move event has been received with ${payload} 🐥🥶`);
    const isOnline = await Geolocation.findByPk(payload.id);
    if (isOnline.dataValues.online) {
      const recipient = await updateDbWithNewLocation(payload, isOnline);
      if (recipient.trackerID) {
        const deliverTo = await Geolocation.findOne({
          where: { trackerID: recipient.trackerID },
        });
        const { socketID } = deliverTo.dataValues;
        io.emit("driver:move", {
          location: recipient.location,
        })
        // io.to(socketID).emit("driver:move", {
        //   location: recipient.location,
        // });
      }
    };
    
  }
  socket.on("driver-move", driverLocation);
  
};
module.exports = { DriverHandler };