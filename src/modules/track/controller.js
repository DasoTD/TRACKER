const AuthService = require("../auth/service");
const TrackService = require("./service");

class TrackController {
    static async bookRide(req, res){
        try {
            const { location  } = req.body;
            const user = req.user;
            const user2 = await AuthService.findByRole("driver");
            if(!user2){
                return res.status(404).send({
                    success: false,
                    message,
                  });
            }
            await TrackService.updateGeo( user2.id, user.id );
            await TrackService.updateGeo( user.id, user2.id );
            await TrackService.updateGeoL(user.id, user2.id, location.longitude, location. latitude);
              return res.status(200).send({
                success: true,
                message: "You have successfully been assigned a driver",
              });
        } catch (error) {
            return error;
        }
    }
}

module.exports =TrackController;