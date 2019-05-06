
exports.up = function (knex, Promise) {
    return knex.schema.createTable('register', tbl => {
        tbl.increments();

        tbl
            .string('username', 128)
            .notNullable()
            .unique();

        tbl
            .string('password', 128)
            .notNullable()
            .unique();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('register');
};
