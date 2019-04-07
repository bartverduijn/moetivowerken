const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const admin = require('firebase-admin');

require('dotenv').config({ path: 'variables.env' });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const initializeFirebase = admin.initializeApp(
    {
        /* eslint-disable-next-line global-require */
        credential: admin.credential.cert(require('./credentials/serverCreds')),
        databaseURL: 'https://moetivowerken.firebaseio.com',
    },
    'server'
);

app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());
    server.use(
        session({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: true,
            store: new FileStore({ path: '/tmp/sessions', secret: process.env.SESSION_SECRET }),
            resave: false,
            rolling: true, // add to each resoibse
            cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // week
        })
    );
    /* eslint-disable-next-line no-shadow */
    server.use((req, res, next) => {
        req.firebaseServer = initializeFirebase;
        next();
    });

    server.get('*', (req, res) => {
        return handle(req, res); // pass routes to next
    });

    server.listen(port, err => {
        if (err) console.error(err);
        console.log(`💻  Server is now running on port http://localhost:${port}`);
    });
});
