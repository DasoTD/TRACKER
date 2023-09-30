const router = require('express').Router();
// const router = express.Router();
const AuthController = require("./controller");
// const {handleRequest} = require("../../middlewares")
// const AuthValidator = require("./validator")

router.post("/signup", 
// handleRequest, 
// AuthValidator.validateSignUpForm(),
// AuthValidator.validate,
AuthController.signup
)
module.exports = router;