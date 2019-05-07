const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

function protected(req, res, next) {
    const { username, password } = req.headers;
    if (req.session && req.session.username) {
        if (username && password) {
            Users
                .findUserBy({ username })
                .then(user => {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        next();
                    } else {
                        res.status(401).json({ message: "Credentials are invalid." })
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            res.status(400).json({ message: "Valid username and password are required." });
        }
    } else {
        res.status(401).json({ message: "You shall not pass!" });
    }
};

module.exports = protected;