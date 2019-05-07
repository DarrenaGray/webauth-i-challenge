const sessionConfig = {
    name: 'gatekeeper',
    secret: 'Approved users only',
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 2,
        secure: false,
    },
    resave: false,
    saveUninitialized: true,
};

module.exports = sessionConfig;