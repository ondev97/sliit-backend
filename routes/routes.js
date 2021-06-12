module.exports = (app) => {
    const auth = require('../controllers/authentication')

    app.post('/api/login', auth.login);
    app.post('/api/register', auth.register);
}