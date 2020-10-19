const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { check, validationResult } = require("express-validator");

// @route   GET ./api/posts/
// @desc    Get latest posts
// @access  public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route   POST ./api/posts/
// @desc    add a post

router.post(
  "/",
  [check("name", "Please enter a name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, link, description, team, coverURL } = req.body;
    try {
      const newPost = new Post({
        name,
        link,
        description,
        team,
        coverURL,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT ./api/posts/:id
// @desc    update a post
router.put("/:id", async (req, res) => {
  const { name, link, description, team, coverURL } = req.body;
  console.log(req.body);
  let updates = {};
  if (name) updates.name = name;
  if (link) updates.link = link;
  if (description) updates.description = description;
  if (team) updates.team = team;
  if (coverURL) updates.coverURL = coverURL;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "post does not exist" });

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE ./api/posts/:id
// @desc    update a post
router.delete("/:id", async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "post does not exist" });

    post = await Post.findByIdAndRemove(req.params.id);

    res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
