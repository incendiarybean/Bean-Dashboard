module.exports = {
    "weather":{
        "method": "GET",
        "url": "https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/daily",
        "qs": {
            "includeLocationName": true,
            "latitude": process.env.latitude,
            "longitude": process.env.longitude
        },
        "headers": {
            "x-ibm-client-id": process.env.client_id,
            "x-ibm-client-secret": process.env.client_secret,
            "accept": "application/json"
        }
    },
    "googleOptions" : {
        "apiKey" : process.env.google_api_key,
        "cx" : process.env.google_cx,
        "num" : "10"
    },
    "MAC": process.env.mac_address,
    "mongoDB":{
        "host": process.env.mongo_host,
        "port": process.env.mongo_port
    }
}