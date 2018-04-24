const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const cors = require('cors')


const app =  express();

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: "openid email profile"
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db');
    const {id, displayName, picture} = profile;
    db.find_user([id]).then(users => {
        if(users[0]){
            return done(null, users[0].id)
        } else {
            db.create_user([id, displayName]).then(createdUser => {
                return done(null, createdUser[0].id)
            })
        }
    })
}));

passport.serializeUser( (id, done) => {
    done(null, id);
});

passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0]);
    })
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `http://localhost:3000/#/loading`,
    failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/auth/me', function(req, res, next){
    if (req.user){
        res.status(200).send(req.user)
    } else {
        res.status(401).send('Nice Try Sucka')
    }
})

app.post('/finishprofile', function(req, res, next){
    const {company, role, id} = req.body;
    const db = app.get('db')

    db.finish_profile([company, role, id]).then( user => {
        res.status(200).send(user)
    }).catch(() => res.status(500).send())
    
})




app.listen(SERVER_PORT, () => console.log(`I'm listening on port ${SERVER_PORT}`));