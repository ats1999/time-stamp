import mongoose from "mongoose";
const TimerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  timerTags: {
    type: [{}],
    default: [],
  },
});

module.exports = mongoose.models
  ? mongoose.models.Timer || mongoose.model("Timer", TimerSchema)
  : mongoose.model("Timer", TimerSchema);
