const todolistController = require("../controller/todolistController");
const middleware = require("../middleware/middleware");

const router = require("express").Router();

router.post("/addtask", middleware.verifyToken,todolistController.addTask);
router.get("/", middleware.verifyToken, todolistController.getAllTask);
router.put("/:id", middleware.verifyToken, todolistController.updateTask);
router.delete("/:id", middleware.verifyToken, todolistController.deleteTask);


module.exports = router;