const Geolocation = require("../../../models/Geolocation");

class TrackService {
    static async updateGeo( tID, userId){
        let geo = await Geolocation.update(
            {trackerID: tID, online: true},
            {where : {
                id: userId
            } }
        );

        return geo;
    }

    static async updateGeoL( tID, userId, longitude, latitude){
        let geo = await Geolocation.update(
            {trackerID: tID, online: true, location: {
                type: "Point",
                coordinates: [longitude, latitude],
              }},
            {where : {
                id: userId
            } }
        );

        return geo;
    }

    static async createId(userId){
        let HiDee = await Geolocation.create({id: userId});
        return HiDee;
    }
}

module.exports = TrackService;