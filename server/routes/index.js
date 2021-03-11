const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    fetch = require('node-fetch'),
    path = require('path'),
    createProxyMiddleware = require('http-proxy-middleware'),
    https = require('https'),
    winston = require('winston'),
    clientIO = require('socket.io-client');

let time = new Date();

// USE JSON BODY PARSING //
const route = (app, serverhttp) => {

    app.use(express.static(path.join(__dirname, '../../build')))

    // INIT SOCKET //
    const io = require('socket.io')(serverhttp, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
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
        headers: {
            'x-api-key': 'swagger',
            'Content-Type': 'application/json'
        },
        logProvider: () => {
            return require('winston');
        }
    }));

    // DEFAULT ROOTS //
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'../../../build/index.html'));
    });

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
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
}

module.exports = { route };