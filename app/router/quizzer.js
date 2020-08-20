const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");
const QuizzerController = require("../controller/QuizzerController");

router.get("/data", AuthController.verifyToken, async (req, res, next) => {
  await QuizzerController.findAll(req, res, next);
});

// get quizzer profile
router.get("/:id", AuthController.verifyToken, async (req, res, next) => {
  await QuizzerController.get(req, res, next);
});

module.exports = router;
