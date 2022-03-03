const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No such user"})
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST(add) user 
router.post('/', (req, res) => {

// To insert data, we can use Sequelize's .create() method. Pass in key/value pairs
// where the keys are what we defined in the User model and the values are what we get from req.body

    User.create({
        //INSERT INTO users (username, password)
        username: req.body.username,
        password: req.body.password,
    })
    .then(dbUserData => {
        // create session
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
});

// POST sign in
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            // looks for matching username
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            // if no match, ask to sign up (create user)
            res.status(400).json({ message: 'No user found. Please sign up' })
            return;
        }
        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Password is incorrect' });
            return;
        }
        // create session
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'Successfully Signed In'});

        });

    })
});

// POST log out
router.post('/logout', (req, res) => {
    // checks to see if the session shows logged in
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT update user
router.put('/:id', (req, res) => {
      // pass in req.body to only update what's passed through
    User.update(req.body, {
        // requirement to use beforeUpdate hook in User model - hash password
        individualHooks: true,
        // selects user by id passed in
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No such user' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE destroy user
router.delete('/:id', (req, res) => {
    // user id used as identifier for destroy
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No such user' })
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// export 
module.exports = router;