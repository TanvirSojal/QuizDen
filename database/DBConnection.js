const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function connect() {
  mongoose.connect(
    process.env.DB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to Database.")
  );
}

const DBConnection = {
  dbconnect: () => {
    try {
      connect();
    } catch (err) {
      console.log("Error connecting database!");
    }
  },
};

module.exports = DBConnection;
