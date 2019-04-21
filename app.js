const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//LOAD ROUTES
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const events = require("./routes/api/events");
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//  Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("ERROR connecting to MongoDb -> ", err));

//Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);
app.use("/api/events", events);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening on port ${port}`));
