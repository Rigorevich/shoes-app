const Router = require("express");
const shoesController = require("../controllers/shoesController");
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware");
const router = new Router();

router.post("/", checkRoleMiddleware("ADMIN"), shoesController.create);
router.get("/", shoesController.getAll);
router.get("/:id", shoesController.getOne);

module.exports = router;
