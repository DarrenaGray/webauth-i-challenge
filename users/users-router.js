const router = require('express').Router();
const bcrypt = require('bcryptjs');

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

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users
        .addUser(user)
        .then(userAdded => {
            res.status(201).json(userAdded);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;