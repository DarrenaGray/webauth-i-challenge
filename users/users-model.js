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
        .where(filter)
        .first();
};

async function addUser(user) {
    const [id] = await db('users')
        .insert(user);
    return findUserById(id);
}

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}
