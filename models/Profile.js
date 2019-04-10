const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  declaration_of_victory: {
    type: String
  },
  district: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
