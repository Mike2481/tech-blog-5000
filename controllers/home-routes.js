const router = require("express").Router();
const { Post, User, Comment } = require("../models");


router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_text',
      'user_id',
      'created_at'
  ],
  include: [
      {
          model: Comment,
          // gets comment, the creator's username, and date created
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          // gets username for post
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      // serialize the entire array by mapping over it
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      // pass the object into the homepage template
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'user_id',
      'created_at'
  ],
  include: [
      {
          model: Comment,
          // gets comment, the creator's username, and date created
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username']
          }
      },
      {
          model: User,
          // gets username for post
          attributes: ['username']
      }
  ]
})
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("blog-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
