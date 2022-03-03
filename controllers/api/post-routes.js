const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
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
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/:id', (req, res) => {
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
            res.status(404).json({ message: 'Blog Post not found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST create a blog post (requires user to be signed in)
// router.post('/', withAuth, (req, res) => {
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.body.user_id
        // user_id: req.session.user_id
    }) 
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update blog post
// router.put('/:id', withAuth, (req, res) => {
router.put('/:id', (req, res) => {
    Post.update (
        {
            title: req.body.title,
            post_text: req.body.post_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Blog Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE destroy a post by id
// router.delete('/:id', withAuth, (req, res) => {
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: 'Blog Post not found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;