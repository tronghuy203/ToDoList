const userController = require("../controller/userController");

const router = require("express").Router();

router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);

module.exports = router;
