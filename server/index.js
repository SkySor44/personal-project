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

app.post('/finish_employee', function(req, res, next){
    const {company, role, id, supervisor} = req.body;
    const db = app.get('db')

    db.finish_employee([company, role, supervisor, id]).then( user => {
        res.status(200).send(user)
    }).catch( () => res.status(500).send())
})

app.get('/userprojects', function(req, res, next){
    const db = app.get('db');
    db.get_user_projects([req.user.id]).then( projects => {
        res.status(200).send(projects)
    }).catch( () => res.status(500).send())
})

app.post('/clickedproject', function (req, res, next){
    const {project_id, user_id} = req.body;
    const db = app.get('db');
    db.get_project([user_id, project_id]).then( project => {
        res.status(200).send(project[0])
    }).catch( () => res.status(500).send())
})

app.post('/progress', function(req, res, next){
    const {project_id} = req.body;
    const db = app.get('db');
    db.get_progress([project_id]).then( progress => {
        res.status(200).send(progress)
    }).catch ( () => res.status(500).send())
})

app.delete('/deleteprogress', function(req, res, next){
    const {progress_id, project_id} = req.body;
    const db = app.get('db');
    db.delete_project_progress([progress_id, project_id]).then( () => {
        db.delete_progress([progress_id]).then( () => {
            db.get_progress([project_id]).then( progress => {
                res.status(200).send(progress)
            }).catch( () => res.status(500).send())
        })
    })
    
})

app.post('/newlog', function(req, res, next){
    const {content, time_stamp, project_id, user_id} = req.body
    const db = app.get('db');
    db.new_log([content, user_id, project_id, time_stamp]).then( log_id => { 
       db.new_log_junction([project_id, log_id[0].max]).then( () => {
        db.get_progress([project_id]).then( progress => {
            res.status(200).send(progress)
        }).catch( () => res.status(500).send())
       })
       
    })
})

app.put('/updatelog', function(req, res, next){
    const {content, progress_id, project_id} = req.body;
    const db = app.get('db');
    db.update_log([content, progress_id]).then( () => {
        db.get_progress([project_id]).then(progress => {
            res.status(200).send(progress)
        }).catch( () => res.status(500).send())
    })
})

app.post('/phases', function (req, res, next){
    const {project_id} = req.body;
    const db = app.get('db');
    db.get_phases([project_id]).then( phases => {
        res.status(200).send(phases)
    }).catch( () => res.status(500).send())
})

app.post('/toggle_dropdown', function(req, res, next){
    const {id, project_id} = req.body;
    const db = app.get('db');
    db.toggle_dropdown([id]).then( () => {
        db.get_phases([project_id]).then( phases => {
            res.status(200).send(phases)
        }).catch( () => res.status(500).send())
    })
})

app.post('/toggle_done', function(req, res, next){
    const {id, project_id} = req.body;
    const db = app.get('db');
    db.toggle_done([id]).then( () => {
        db.get_phases([project_id]).then(phases => {
            res.status(200).send(phases)
        }).catch( () => res.status(500).send())
    })
})

app.put('/update_phase', function(req, res, next){
    const {phase_id, project_id, phase_name, due_date, description} = req.body;
    const db = app.get('db');
    db.update_phase([ phase_name, due_date, description, phase_id]).then( () => {
        db.get_phases([project_id]).then( phases => {
            res.status(200).send(phases)
        }).catch( () => res.status(500).send())
    })
})

app.post('/create_phase', function(req, res, next){
    const {project_id, phase_name, due_date, description} = req.body;
    console.log(project_id)
    const db = app.get('db');
    db.create_phase([phase_name, description, project_id, due_date]).then( () => {
        db.get_phases([project_id]).then( phases => {
            res.status(200).send(phases)
        }).catch( () => res.status(500).send())
    })
})

app.delete('/delete_phase', function(req, res, next){
    const {phase_id, project_id} = req.body;
    const db = app.get('db');
    db.delete_phase([phase_id]).then( () => {
        db.get_phases([project_id]).then( phases => {
            res.status(200).send(phases)
        }).catch( () => res.status(500).send())
    })
})

app.get('/logout', function(req, res, next) {       //===How to logout===//
    req.logOut();
    res.redirect('http://localhost:3000/#/');
})

app.post('/get_employees', function(req, res, next){
    const {user_id} = req.body;
    const db = app.get('db');
    db.get_employees([user_id]).then( employees => {
        res.status(200).send(employees)
    }).catch( () => res.status(500).send())
})

app.post('/get_employee_projects', function(req, res, next){
    const {employee_id} = req.body;
    const db = app.get('db');
    db.get_employee_projects([employee_id]).then( projects => {
        res.status(200).send(projects)
    }).catch( () => res.status(500).send())
})

app.post('/get_employee', function(req, res, next){
    const {employee_id} = req.body;
    const db = app.get('db');
    db.get_employee([employee_id]).then( employee => {
        res.status(200).send(employee[0])
    }).catch( () => res.status(500).send())
})

app.post('/assign_project', function(req, res, next){
    const {employee_id, project_id} = req.body;
    const {db} = app.get('db');
    db.assign_project([project_id, employee_id]).then( () => {
        db.get_employee_projects([employee_id]).then( projects => {
            res.status(200).send(projects)
        }).catch( () => res.status(500).send())
    })
})

app.post('/assign_phase', function(req, res, next){
    const {employee_id, phase_id} = req.body;
    const {db} = app.get('db');
    db.assign_phase([employee_id, phase_id]).then( () => {
        db.get_employee_projects([employee_id]).then( projects => {
            res.status(200).send(projects)
        }).catch(() => res.status(500).send())
    })
})

app.listen(SERVER_PORT, () => console.log(`I'm listening on port ${SERVER_PORT}`));