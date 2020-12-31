const express = require('express');
const fs = require('fs');
const app = express();
let time = new Date();

const routes = require('./routes/index.js').route;

const p = 8080;

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV:"development";
console.log(`[${time}] ENV: ${process.env.NODE_ENV}`)

const options = {
    key: fs.readFileSync('./cert/localhost.key'), 
    cert: fs.readFileSync('./cert/localhost.pem')
}

const serverhttp = require('https')
.createServer(options, app)
.listen(8080, (err) => {
	if (err) throw err;
	console.log(`[${time}] Server is active on port: ${p}`)
});

// INITIATE ROUTES

routes(app, serverhttp);


