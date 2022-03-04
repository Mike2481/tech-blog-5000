const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
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
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/new', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
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
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('new-post', { posts, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




router.get('/edit/:id', withAuth, (req, res) => {
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
        ],
        })
        .then((dbPostData) => {
            if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
            }

            // serialize the data
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: true
            });
    })
});



module.exports = router;