const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  location: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("event", EventSchema);
