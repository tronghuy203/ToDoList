const authController = require("../controller/authController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.requsetRefreshToken);
router.post("/logout", middleware.verifyToken ,authController.logout);


module.exports = router;