const User = require("../../../models/User");

class AuthService {
    static async store(firstName, lastName, email,  password, role){
        let user = await User.create({ firstName: firstName, lastName: lastName, email: email, password:password, role: role });
        return user;
    }

    static async users(){
        let user = await User.findAll();
        return user;
    }

    static async findByRole(role){
        let userRole = await User.findOne({where: {role: role}});
        return userRole;
    }
}
module.exports= AuthService;