const mongoose = require("mongoose");

// TODO
// ADD a field for adding profile photo of a profile-holder

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
  },
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  profile_photo: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
