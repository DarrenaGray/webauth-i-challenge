const db = require('../data/dbConfig');

module.exports = {
    addUser,
    findUser,
    findUserBy,
    findUserById,
};

function findUser() {
    return db('users')
        .select('id', 'username', 'password');
};

function findUserBy(filter) {
    return db('users')
        .where(filter);
};

function addUser(user) {
    const [id] = db('users')
        .insert(user);
    return findUserBy(id);
}

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}
