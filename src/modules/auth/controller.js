const AuthService = require("./service");
const {handleJwt} = require("../../middlewares/handleJwt");
const TrackService = require("../track/service");
const argon2 = require('argon2');

class AuthController {
    static async signup(req, res){
        try {
            const {firstName, lastName, email, password, role} = req.body;
            const hashPassword = await argon2.hash(password);
            let user = await AuthService.store(firstName, lastName, email,  hashPassword, role);
            await TrackService.createId(user.id); // db.Geolocation.create({ id: user.id });
            const token = handleJwt.signToken(user.dataValues);

            res.status(201).send({
                success: true,
                message: "user successfully created",
                user,
                token,
              });
            
        } catch (error) {
            return error
        }
    }
}

module.exports = AuthController;