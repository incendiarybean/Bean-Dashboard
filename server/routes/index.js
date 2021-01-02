const express = require('express');
const cors = require('cors');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;

const db_module = require('../modules/db-module');
const ext_functions = require('../modules/ext-functions');

const bodyParser = require('body-parser');

let time = new Date();

// USE JSON BODY PARSING //
const route = (app, serverhttp) => {
    app.use(
        bodyParser.urlencoded({
        extended: true
        })
    )
    app.use(cors())
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../../build')))

    // INIT SOCKET //
    const io = require('socket.io')(serverhttp, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // CREATE GOOGLE SEARCH/INTERNAL SEARCH ENDPOINTS //

    app.route('/search/:item?')
        .get(async (req, res) =>{
            switch(req.params.item){
                case 'mostSearched':
                    return res.json(await db_module.select('mostSearched'));
                default:
                    return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`});
            }
        })
        .post(async (req, res) =>{
            let searchValue = req.body.search;
            let addItem = req.body.addItem;
            switch(req.params.item){
                case undefined:
                    var regex = new RegExp([searchValue].join(''), 'i');
                    let s = await db_module.select('search', { 'search':regex});

                    let g = await ext_functions.googleSearch(searchValue);

                    if(typeof(g[Symbol.iterator]) === 'function')
                    {
                        let searchObj = [ ...s,...g];
                        return res.json(searchObj);
                    } else {
                        let searchObj = [ ...s, g];
                        return res.json(searchObj);
                    }
                case 'add':
                    let existing = await db_module.select('mostSearched', { url:addItem });
                    if(!existing){
                        return res.json(db_module.insert('mostSearched', { 'url':addItem, 'amountSearched': 1 }));
                    } else {
                        return res.json(db_module.update('mostSearched', { $inc: { 'amountSearched':1}}, { 'url':addItem }));
                    }
                default:
                    return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`})
            }
        });

    // CREATE ENDPOINTS FOR STICKY NOTE ENDPOINTS //
    app.param('id', async (req, res, next, id) => {
        try{
            let note = await db_module.selectOne('sticky', {_id:ObjectId(req.params.id)});
            if(note.response) {
                req.isActive = true;
                req.note = note.response;
            } else req.isActive = false;
            return next();
        } catch (e) {
            req.isActive = false;
            return next();
        }
    });

    app.route('/sticky/:id?/:action?')
        .get(async (req, res) =>{
            let date = new Date();
            switch(req.isActive){
                case true:
                    try{
                        switch(req.params.action){
                            case 'delete':
                                return res.json(await db_module.delete('sticky', { _id:ObjectId(req.note._id) }));
                            case 'view':
                                return res.json(req.note);
                            default:
                                return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`});
                        }
                    } catch(e) {
                        console.log(e)
                    }
                case false:
                    switch(req.params.id){
                        case 'create':
                            try{
                                return res.json(await db_module.insert('sticky', { 'dateTime':date, 'top':100, 'left':100, 'title':'', 'content':'', 'color':'blue', 'showColor':'hidden' }));
                            } catch (e) {
                                console.log(e)
                            }
                        default:
                    }
                default:
                    return res.json(await db_module.select('sticky'));
            }
        })
        .post(async (req, res) => {
            let date = new Date();
            switch(req.isActive){
                case true:
                    switch(req.params.action){
                        case 'update':
                            return res.json(await db_module.replace('sticky', { 'dateTime':date, 'top':req.body.top, 'left':req.body.left, 'title':req.body.title, 'content':req.body.content, 'color':req.body.color, 'showColor':'hidden' }, { _id:ObjectId(req.note._id) }));
                        default:
                            return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`});
                    }
                case false:
                    return res.json({ code:400, message: `ID wasn't valid.` });
                default:
                    return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`});
            }
        });

    app.route('/friday/:stat?')
        .get(cors(), async (req, res) => {
            let newDay = new Date().toLocaleDateString();
            switch(req.params.stat){
                case 'today':
                    return res.json(await db_module.select('friday', { date: newDay }));
                case 'clean':
                    return res.json(await db_module.delete('friday'));
                default:
                    return res.json(await db_module.select('friday'));

            }
        })
        .post(cors(), async (req, res) => {
            io.emit('FRIDAY');
            return res.json(await ext_functions.setScore(req, res));
        });


    // CREATES WEATHER ENDPOINTS FOR DAILY AND HOURLY //

    app.route('/weather/:date')
        .get(async (req, res) =>{
            try{
                let response;
                switch(req.params.date){
                    case 'daily':
                        response = await db_module.selectOne('weatherDaily');
                        try{
                            response.location = response.response.body.features[0].properties.location.name;
                            response.days = response.response.body.features[0].properties.timeSeries;
                            response.response = response.response.body;
                        } catch (e) {
                            response.response = false;
                        }
                        return res.json(response);
                    default:
                        return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`})
                }
            } catch (e) {
                return res.json({ code:502, message:e })
            }
        });


    // CREATE ENDPOINTS FOR TURNING THE PC ON //

    app.route('/pc/:power')
        .get(async (req, res) =>{
            switch(req.params.power) {
                case 'on':
                    return res.json(await ext_functions.pc_on());
                default:
                    return res.json({ code:400, message:`${req.method} is not defined on ${req.path}` })
            }
        });

    // CREATE ENDPOINTS FOR NEWS //

    app.route('/news/')
        .get(async (req, res) =>{
            let response;
            try{
                response = await db_module.select('news');
                response.response = response.response[0].pages;
                return res.json(response);
            } catch(e) {
                return res.json({ code:400, message:'Couldn\'t retrieve News.' });
            }

        });

    // INITIALISE BASIC INTERACTION POINTS //
    app.route('/')
        .get((req, res) => {
            return res.sendFile(path.join(__dirname, '../../build/index.html'))
        });

    // DEFAULT ROUTE IF NOT FOUND //

    app.route('*')
        .get((req,res) => {
            return res.sendFile(path.join(__dirname, '../../build/index.html'))
        })
        .post((req,res) => {
            return res.json({ code:400, message:`${req.method} is not defined on ${req.path}`});
        });


    // IF PROD, RUN CODE //

    if(process.env.NODE_ENV !== 'development'){

        // SET TIMER TO AUTOMATE THE WEATHER MODULES //
        console.log(`[${time}] Weather intitialised`);
        setTimeout(() => {
            ext_functions.getWeather().then(data => {
                io.emit('WEATHER');
            }).catch(e => {
                io.emit('FAILED', { message:e.message });
            });
            setInterval(() => {
                ext_functions.getWeather().then(data => {
                    io.emit('WEATHER');
                }).catch(e => {
                    io.emit('FAILED', { message:e.message });
                });
            }, 620000);
        });


        // CHECKS FOR VALID NEWS //

        console.log(`[${time}] News intitialised`);
        setTimeout(() => {
            ext_functions.getNews().then(data => {
                io.emit('NEWS');
            }).catch(e => {
                io.emit('FAILED', { message:e.message });
            });
            setInterval(() => {
                ext_functions.getNews().then(data => {
                    io.emit('NEWS');
                }).catch(e => {
                    io.emit('FAILED', { message:e.message });
                });
            }, 900000);
        });

    }
}

module.exports = { route };