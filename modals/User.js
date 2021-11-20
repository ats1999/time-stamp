import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  tags: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.models ? mongoose.models.User || mongoose.model('User', UserSchema):mongoose.model('User', UserSchema)