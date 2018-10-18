const people      = require('./routes/people');
const messages    = require('./routes/messages');
const user        = require('./routes/user');
const verifyToken = require('./services/jwtVerify');

module.exports = (app) => {
    app.get('/myapp/check', messages.checkStatus);

    app.post(
        '/myapp/v1.0/newpersopn',
        people.createPerson
    );

    app.post(
        '/myapp/v1.0/import',
        verifyToken,
        people.import
    );

    app.get(
        '/myapp/v1.0/tags',
        people.getTags
    );

    app.get(
        '/myapp/v1.0/person/:id',
        people.getPersonById
    );

    app.get(
        '/myapp/v1.0/people',
        people.getPeopleByGender
    );

    app.post(
        '/myapp/v1.0/login',
        user.login
    );
};
