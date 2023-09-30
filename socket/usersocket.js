const { updateDbWithNewLocation } = require("./helpers");
const Geolocation = require("../models/Geolocation");
const UserHandler = (io, socket) => {

  const userLocation = async(payload)=> {
    console.log(
      `user-move event has been received with ${JSON.stringify(payload)} 🍅🍋`
    );
    const isOnline = await Geolocation.findByPk(payload.id);
    if (isOnline.dataValues.online) {
      const recipient = await updateDbWithNewLocation(payload, isOnline);
      if (recipient.trackerID) {
        const deliverTo = await Geolocation.findOne({
          where: { trackerID: recipient.trackerID },
        });
        console.log("user-move");
        console.log(deliverTo);
        const { socketID } = deliverTo.dataValues.id;

        io.emit("user:move", {
          location: recipient.location,
        });
        // io.to(socketID).emit("user:move", {
        //   location: recipient.location,
        // });

      }
    }
  }
  socket.on("user-move", userLocation)
};
module.exports = { UserHandler };