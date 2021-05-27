const express = require('express'),
    fetch = require('node-fetch'),
    cors = require('cors'),
    path = require('path'),
    createProxyMiddleware = require('http-proxy-middleware'),
    https = require('https'),
    clientIO = require('socket.io-client'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session');

// USE JSON BODY PARSING //
const route = (app, serverhttp) => {

    const sessionManager = session({
        secret: 'keyboard cat',
        cookie: {},
        saveUninitialized: true,
        resave: false
    });

    app.use(sessionManager);
    app.use(express.json());
    app.use('/static', express.static(path.join(__dirname, '../../build/static')));

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    app.use(cors({
        origin: ['https://localhost:8080', 'https://localhost:8000', 'https://localhost:3000'],
        'Access-Control-Allow-Origin': '*'
    }));

    // INIT SOCKET //
    const io = require('socket.io')(serverhttp, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        socket.on('STICKY_UPDATE', () => {
            socket.broadcast.emit('STICKY');
        });
    });

    // INIT CLIENT SOCKET FOR DISCORD //
    const IOClient = clientIO(process.env.DISCORD, { reconnect: true });

    IOClient.on('connect', () => {
        console.log(`[${new Date()}] Client connected to API SOCKET...`);
    });

    IOClient.on('DISCORD_CONNECTED', (data) => {
        io.emit('DISCORD_CONNECTED', data);
    });

    IOClient.on('DISCORD_MUTE', (data) => {
        io.emit('DISCORD_MUTE', data);
    });

    IOClient.on('DISCORD_UPDATE_USERS', () => {
        io.emit('DISCORD_UPDATE_USERS');
    });

    // START PROXY //
    const APIURL = process.env.APIURL;
    app.use('/api/v0', createProxyMiddleware({
        target: APIURL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            [`^/`]: '/',
        },
        onProxyReq: (proxyReq, req, res) => {
            if (!req.body || !Object.keys(req.body).length) {
                return;
            }
        
            const contentType = proxyReq.getHeader('Content-Type');
            const writeBody = (bodyData) => {
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                proxyReq.write(bodyData);
            };
        
            if (contentType === 'application/json') {
                writeBody(JSON.stringify(req.body));
            }
        },
        onError: (err, req, res, target) => {
            console.log(err);
        },
        headers: {
            'x-api-key': 'swagger',
            'Content-Type': 'application/json'
        },
        logProvider: () => {
            return require('winston');
        }
    }));
    
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true
    },
    (username, password, done) => {
        fetch(`${APIURL}api/v0/auth`, {
            agent: httpsAgent,
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.APIKEY
            }
        })
        .then(data => data.json())
        .then(data => {
            if (!data.user) { return done(null, false); }
            return done(null, data.user);
        })
        .catch(e => {
            return done(null, false);
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.route('/login')
    .post(passport.authenticate('local'),
    (req,res) => {
        res.json({message: 'Success logging in.', user: req.user});
    });

    app.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.route('/user')
        .get((req, res) => {
            if(req.user) res.json(req.user);
            else return res.json({message: 'No user logged in.'});
        });

    // DEFAULT ROOTS //
    app.get('*', (req, res) => {
        if(!req.user && req.path !== '/') return res.redirect('/');
        return res.sendFile(path.join(__dirname+'../../../build/index.html'));
    });

    if(process.env.NODE_ENV !== 'development'){

        // SET TIMER TO AUTOMATE THE WEATHER MODULES //
        console.log(`[${new Date()}] Weather & News intitialising...`);
        setTimeout(() => {
            fetch(`${APIURL}api/v0/sync`, {
                agent: httpsAgent,
                headers: {
                    'x-api-key': process.env.APIKEY
                }
            })
            .then(data => data.json())
            .then(data => {
                console.debug(`[${new Date()}] Weather & News intitialised.`);
                io.emit('WEATHER');
                io.emit('NEWS');
            })
            .catch(e => {
                console.debug(`[${new Date()}] Weather & News failed to intitialise.` , `\n ${e.toString()}`);
                io.emit('FAILED', { message:e.toString() });
            });

            setInterval(() => {
                fetch(`${APIURL}api/v0/sync`, {
                    agent: httpsAgent,
                    headers: {
                        'x-api-key': process.env.APIKEY
                    }
                })
                .then(data => data.json())
                .then(data => {
                    console.log(`[${new Date()}] Weather & News synced`);
                    io.emit('WEATHER');
                    io.emit('NEWS');
                })
                .catch(e => {
                    console.debug(`[${new Date()}] Weather & News failed to update.` , `\n ${e.toString()}`);
                    io.emit('FAILED', { message:e.toString() });
                });
            }, 620000);
        });
    }
};

module.exports = { route };