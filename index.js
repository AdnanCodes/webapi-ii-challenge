const express = require("express");
const DataBase = require("./data/db");

const server = express();
server.use(express.json());

//Build Endpoints

//POST ENDPOINT for posts

server.post("/api/posts", (req, res) => {
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

server.post("/api/posts/:id/comments", (req, res) => {
  const { text } = req.body;

  if (text) {
    DataBase.insertComment(req.body)
      .then(comment => {
        if (comment) {
          res.status(201).json(comment);
        } else {
          res
            .status(404)
            .json({
              message: "The post with the specified ID does not exist."
            });
        }
      })
      .catch(() =>
        res
          .status(500)
          .json({
            error: "There was an error while saving the comment to the database"
          })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  }
});

const port = 3000;
server.listen(port, () => console.log(`\n API is running on Port ${port}\n`));