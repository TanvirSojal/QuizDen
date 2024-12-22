const express = require("express");
const router = express.Router();

// import
const DBConnection = require("../../database/DBConnection");
const auth = require("./auth");
const quizzer = require("./quizzer");
const quiz = require("./quiz");

// {base API URL}
const api_uri = process.env.API_URI;

router.get(api_uri, (req, res) => {
  res.send("Hello to QuizDen Backend System");
});

// connect to database
DBConnection.dbConnect();

// route middleware
router.use(api_uri + "/auth", auth);
router.use(api_uri + "/quizzers", quizzer);
router.use(api_uri + "/quizzes", quiz);

module.exports = router;
