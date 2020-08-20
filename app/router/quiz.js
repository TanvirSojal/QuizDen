const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");
const QuizzerController = require("../controller/QuizzerController");
const QuizController = require("../controller/QuizController");

router.post(
  "/create/:user_id",
  AuthController.verifyToken,
  async (req, res, next) => {
    await QuizController.createQuiz(req, res, next);
  }
);

router.get("/", AuthController.verifyToken, async (req, res, next) => {
  console.log("Get Quizzer Data");
  await QuizController.findAll(req, res, next);
});

router.get("/:quiz_id", AuthController.verifyToken, async (req, res, next) => {
  await QuizController.findById(req, res, next);
});

router.get(
  "/quizzer/:user_id",
  AuthController.verifyToken,
  async (req, res, next) => {
    await QuizController.findByUser(req, res, next);
  }
);

router.post(
  "/submit/:user_id",
  AuthController.verifyToken,
  async (req, res, next) => {
    await QuizController.submitQuizAnswer(req, res, next);
  }
);

module.exports = router;
