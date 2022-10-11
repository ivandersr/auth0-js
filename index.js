const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv/config');

const app = express();
const port = process.env.PORT || 3333;

app.use(auth({
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    authRequired: false,
    auth0Logout: true,
}));

app.get('/', (request, response) => {
    response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Unauthorized');
});

app.get('/profile', requiresAuth(), (request, response) => {
    response.send(JSON.stringify(request.oidc.user));
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});