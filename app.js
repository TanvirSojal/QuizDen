const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv/config");

app.use(
  cors({
    exposedHeaders: ["auth-token"],
  })
);
app.use(express.json());

// serving static files from react
app.use(express.static(path.join(__dirname, "client", "build")));

// import routes
const routes = require("./app/router");

// route middleware
app.use(routes);

// fallback for react routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "", "client", "build", "index.html"));
});

app.listen(process.env.PORT || 5000, () =>
  console.log("QuizDen server is up!")
);
