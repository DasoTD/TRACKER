const { Router } = require("express");
const db = require("../../models");
const { handleJwt } = require("../../utils/handleJwt");
const trackerRouter = Router();
trackerRouter.post(
  "/book-ride",
  handleJwt.verifyToken,
  async (req, res, next) => {
    // search for user that is offline
    // assign the booker id to the
    const {
      user,
      body: { location },
    } = req;
    //returns the first user that meets the criteria
    const user2 = await db.User.findOne({
      where: { role: "driver" },
    });
    db.Geolocation.update(
      {
        trackerID: user2.id,
        online: true,
      },
      { where: { id: user.id }, returning: true }
    );
    db.Geolocation.update(
      {
        trackerID: user.id,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
        online: true,
      },
      { where: { id: user2.id }, returning: true }
    );
    if (!user2)
      return res.status(404).send({
        success: false,
        message,
      });
    return res.status(200).send({
      success: true,
      message: "You have successfully been assigned a driver",
    });
  }
);
module.exports = { route: trackerRouter, name: "track" };