const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
