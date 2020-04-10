const express = require("express");
const yearLevelController = require("./controller");
const passport = require("passport");

const router = express.Router();

router.post("/create", yearLevelController.create);
router.put("/update/:yearLevelId", yearLevelController.update);
router.get("/getAll", yearLevelController.getAll);
router.get("/getSingle/:yearLevelId", yearLevelController.getSingle);
router.delete("/delete/:yearLevelId", yearLevelController.delete);

module.exports = router;
