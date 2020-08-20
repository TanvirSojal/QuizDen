const mongoose = require("mongoose");
const { date } = require("@hapi/joi");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const quizSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  questions: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      options: [
        {
          id: {
            type: Number,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      answer: {
        type: Number,
        required: true,
      },
    },
  ],
  participated: {
    type: Number,
    default: 0,
  },
  flawless: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
