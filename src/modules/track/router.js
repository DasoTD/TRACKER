const { handleJwt } = require("../../middlewares/handleJwt");
const TrackController = require("./controller");

const router = require("express").Router();

router.post("/book-ride", 
handleJwt.verifyToken,
TrackController.bookRide
);

module.exports = router;