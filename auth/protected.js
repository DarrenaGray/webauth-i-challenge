const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

function protected(req, res, next) {
    const { username, password } = req.headers;
    if (username && password) {
        Users
            .findUserBy({ username })
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next()
                } else {
                    res.status(401).json({ message: "Username and/or password are invalid." })
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else {
        res.status(400).json({ message: "Please provide valid username and password." });
    };
};

module.exports = protected;