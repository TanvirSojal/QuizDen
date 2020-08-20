const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const quizzerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  quizCurated: {
    type: Number,
    default: 0,
  },
  quizAttended: {
    type: Number,
    default: 0,
  },
  quizFlawless: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Quizzer", quizzerSchema);
