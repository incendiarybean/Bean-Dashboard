var wol = require('node-wol');
let config = require('./cfg/module-config');
let db_module = require('./db-module');
const request = require('request');
const fetch = require('node-fetch');
const HTMLparser = require('node-html-parser');

module.exports = {
    pc_on: ()=>{
        return new Promise((resolve, reject) => {
            try{
                let mac_config = config.MAC;
                wol.wake(mac_config, function(error) {
                    if(error) return reject({code:502, message:'Failed to boot.'});
                    return resolve({ code:200, message:'Power Request Sent' });
                });
            } catch (e) {
                console.log(e);
                return reject({code:400, message:'Couldn\'t access PC power module'});
            }       
        });
    },
    getWeather: ()=>{
        return new Promise( async (resolve, reject) => {
            let weather_config = config.weather;    

            request(weather_config, async (error, response, body) => {
                if (error) return reject({ code:400, message:error });
                body = JSON.parse(body);
                if(body.httpCode === '429'){
                    return reject({ code:400, message:body.httpMessage });
                } else {
                    try{
                        await db_module.drop('weatherDaily');
                    } catch (e) {
                        console.log('Couldn\'t drop Weather');
                    }
                    await db_module.insert('weatherDaily', { body });
                    return resolve({ code:200, message: 'Updated Weather' });
                }
            });
        });
    },
    getNews: () => {
        return new Promise( async (resolve, reject) => {
            try{
                fetch('https://www.pcgamer.com/uk/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(data => data.text())
                .then(async (data) => {
                    let check = await db_module.select('news');
                    let pages = [];
                    const page = HTMLparser.parse(data);
                    let links = page.querySelectorAll('.list-text-links-trending-panel');
                    links = HTMLparser.parse(links);
                    for (let link in links.childNodes[0].childNodes) {
                        let scrape = links.childNodes[0].childNodes[link].toString();
                        scrape = HTMLparser.parse(scrape);
                        scrape = scrape.childNodes[0].childNodes;
                        scrape = HTMLparser.parse(scrape);
                        let scraped = scrape.querySelector('a');
                        if (!!scraped && scraped !== undefined) {
                            pages.push(scraped.toString())
                        }
                    }
                    if (!check.response.length) return db_module.insert('news', { pages });
                    let response = await db_module.drop('news');
                    if(response.code !== 200) return console.log(response);
                    await db_module.insert('news', { pages });
                    return resolve({code:200, message:'Updated news!'})
                });
            } catch (e) {
                console.log(e)
                return reject({code:404, message:'Could not retrieve News...'})
            }
        });
    },
    setScore: (req, res) => {
        return new Promise(async (resolve, reject) => {
            try{
                let time = new Date();
                let newDay = time.toLocaleDateString();
                let win = 0;
                let loss = 0;
                let insert = {
                    date: newDay,
                    wins: win,
                    losses: loss
                }
                insert[req.body.type] = insert[req.body.type] + 1;
                let select = await db_module.select('friday', {date: newDay});
                select = select.response;
                let response;
                if(select.length === 0){
                    response = await db_module.insert('friday', insert);
                } else {
                    insert = {
                        date: newDay,
                        wins: select[0].wins,
                        losses: select[0].losses
                    }
                    if(req.body.type === 'wins'){
                        if(req.body.job === '+') {
                            insert.wins = insert.wins + 1;
                        } else {
                            insert.wins = insert.wins - 1;
                        }
                        response = await db_module.replace('friday', insert, {date: newDay});

                    } else if(req.body.type === 'losses') {
                        if(req.body.job === '+'){
                            insert.losses = insert.losses + 1;
                        } else {
                            insert.losses = insert.losses - 1; 
                        }
                        response = await db_module.replace('friday', insert, {date: newDay});
                    }
                }
                return resolve(response);
            } catch(e) {
                console.log(e);
                return reject({code:400, message:'Couldn\'t set score...'})
            }
        });
    },
    googleSearch: (item)=>{
        return new Promise((resolve, reject) => {
            try {
                const {google} = require('googleapis');
                const customsearch = google.customsearch('v1');

                const config = require('./cfg/module-config').googleOptions;
                const options = config;
                async function runSample(options) {
                    const res = await customsearch.cse.list({
                        cx: options.cx,
                        q: item,
                        auth: options.apiKey,
                        num: options.num,
                    });
                    if(res.data.status !== 429)
                    {
                        let gResult = [];
                        for(let i = 0; i < res.data.items.length; i++){
                            let gRes = res.data.items[i];
                            if(gRes.pagemap.cse_thumbnail !== undefined){
                                gResult.push(JSON.parse(`{'_id': null,'search':'${encodeURIComponent(gRes.htmlTitle)}','image': '${encodeURIComponent(gRes.pagemap.cse_thumbnail[0].src)}' , 'type':'search', 'url': '${encodeURIComponent(gRes.formattedUrl)}'}`));
                            }else{
                                gResult.push(JSON.parse(`{'_id': null,'search':'${encodeURIComponent(gRes.htmlTitle)}', 'type':'search', 'url': '${encodeURIComponent(gRes.formattedUrl)}'}`));
                            }
                        }
                        resolve(gResult);
                    }               
                }
                runSample(options).catch((e)=>{
                    return resolve(JSON.parse({'_id':null, 'search':'Google API is tired, try later.', 'url':'','type':''}));
                });
            } catch(e) {
                console.log(e);
                return reject({code:400, message:'Couldn\'t use the SEARCH api...'})
            }
        });
    }
}