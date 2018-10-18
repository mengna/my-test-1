const people = require('./routes/people');
const messages = require('./routes/messages');

module.exports = (app) => {
    app.get('/myapp/check', messages.checkStatus);

    app.post(
        '/myapp/v1.0/newpersopn',
        people.createPerson
    );

    app.post(
        '/myapp/v1.0/import',
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
};
