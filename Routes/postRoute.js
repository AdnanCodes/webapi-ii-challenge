const express = require("express");
const DataBase = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
  DataBase.find()
    .then(posts => res.status(200).json(posts))
    .catch(() =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (title || contents) {
    DataBase.insert(req.body)
      .then(post => res.status(201).json(post))
      .catch(() => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

//POST ENDPOINT for adding comments on to posts

router.post("/:id/comments", (req, res) => {
  const { text } = req.body;

  if (text) {
    DataBase.insertComment(req.body)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the comment to the database"
        })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
});

//GET Request for posts

//GET Request by id of post

router.get("/:id", (req, res) => {
  DataBase.findById(req.params.id)
    .then(post => {
      if (post) {
        //Post returns empty array if post id doesnt match the database - WATCH OUT
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//Get request for getting all comments for specific post
router.get("/:id/comments", (req, res) => {
  DataBase.findPostComments(req.params.id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

//Delete request for specific post

router.delete("/:id", (req, res) => {
  DataBase.remove(req.params.id)
    .then(posts => {
      if (posts > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

//Updating a post
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (title || contents) {
    DataBase.update(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(() =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

module.exports = router;
