const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
  res.json({ msg: "events works" });
});

// Load Validation
const validateEventInput = require("../../validation/events");

// @route   Get api/events
// @desc    Get events
// @access  Public
router.get("/", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: "No events found" }));
});

// @route   Get api/events/:id
// @desc    Get event by id
// @access  Public
router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err =>
      res.status(404).json({ noeventfound: "No event found with that id" })
    );
});

// @route   POST api/events
// @desc    Create event
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Destructuring
    const { errors, isValid } = validateEventInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors
      return res.status(400).json(errors);
    }
    const newEvent = new Event({
      location: req.body.location,
      eventDate: req.body.eventDate,
      text: req.body.text,
      name: req.body.name,
      image: req.body.image,
      user: req.user.id
    });
    newEvent.save().then(event => res.json(event));
  }
);

// @route   Delete api/events:id
// @desc    Delete event by id
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (event.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          event.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ noeventfound: "No event found with that id" })
        );
    });
  }
);

// @route   POST api/events/like/:id
// @desc    Like event
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (
            event.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadliked: "User already liked this post" });
          }

          // Add user id to likes array
          event.likes.unshift({ user: req.user.id });

          event.save().then(event => res.json(event));
        })
        .catch(err =>
          res.status(404).json({ noeventfound: "No event found with that id" })
        );
    });
  }
);

// @route   POST api/events/unlike/:id
// @desc    unLike event
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (
            event.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this event" });
          }

          // Get remove index
          const removeIndex = event.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          event.likes.splice(removeIndex, 1);

          // Save
          event.save().then(event => res.json(event));
        })
        .catch(err =>
          res.status(404).json({ noeventfound: "No event found with that id" })
        );
    });
  }
);

// @route   POST api/events/comment/:id
// @desc    Add comment to event
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Destructuring
    const { errors, isValid } = validateEventtInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors
      return res.status(400).json(errors);
    }

    Event.findById(req.params.id)
      .then(event => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };

        // Add to comments array
        event.comments.unshift(newComment);

        // Save
        event.save().then(event => res.json(event));
      })
      .catch(err => res.json({ noeventnofound: "No event found" }));
  }
);

// @route   DELETE api/events/comment/:id/:comment_id
// @desc    Remove comment from event
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findById(req.params.id)
      .then(event => {
        // Check to see if comment exists
        if (
          event.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentexistfalse: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = event.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        event.comments.splice(removeIndex, 1);

        // Save
        event.save().then(event => res.json(event));
      })
      .catch(err => res.json({ noeventnofound: "No event found" }));
  }
);

module.exports = router;
