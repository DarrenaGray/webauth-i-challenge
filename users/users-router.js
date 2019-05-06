const router = require('express').Router();

const Users = require('./users-model');

router.get('/users', (req, res) => {
    Users
        .findUser()
        .then(users => {
            if (users.length !== 0) {
                res.status(200).json(users);
            } else {
                res.status(404).json({ message: "There are no users." });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// router.post('/register')

module.exports = router;