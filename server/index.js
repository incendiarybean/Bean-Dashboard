const express = require('express');
const fs = require('fs');
const app = express();
let time = new Date();

require('dotenv').config();

const routes = require('./routes/index.js').route;

const p = 8000;

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV:'development';
console.log(`[${time}] ENV: ${process.env.NODE_ENV}`);
let hmm;
try{
    let file = fs.readFileSync('./cert/certificate.pfx');
    hmm = true;
} catch (e){
    hmm = false;
}

let serverhttp;
if(hmm){
    const serverhttp = require('https')
    .createServer({
        pfx: fs.readFileSync('./cert/certificate.pfx'),
        passphrase: process.env.PFX_KEY
    }, app)
    .listen(p, (err) => {
        if (err) throw err;
        console.log(`[${time}] Server is active on port: ${p}`);
    });
} else {
    const serverhttp = require('http')
    .createServer(app)
    .listen(p, (err) => {
        if (err) throw err;
        console.log(`[${time}] Server is active on port: ${p}`);
    });
}


// INITIATE ROUTES

routes(app, serverhttp);


