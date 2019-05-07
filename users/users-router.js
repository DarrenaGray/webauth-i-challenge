const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');
const protected = require('../auth/protected');

router.get('/users', protected, (req, res) => {
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
            res.status(201).json({ userAdded });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users
        .findUserBy({ username })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({ user, message: `${user.username} has logged in!` });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send(`Can't end session.`);
            } else {
                res.send('Session ended.');
            }
        });
    } else {
        res.send('Session already ended.');
    }
});

module.exports = router;