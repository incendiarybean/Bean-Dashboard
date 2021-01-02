const MongoClient = require('mongodb').MongoClient;
const mongoDB = require('./cfg/module-config').mongoDB;

const url = mongoDB.host + mongoDB.port;

module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {
                useUnifiedTopology: true 
            },
            function (err, client) {
                if (err) return reject({code: 401, message: err});
                var db = client.db('intranet');
                return resolve({db, client});
            });
        });
    },
    insert: (collection, data) => {
        return new Promise(async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).insertOne(data, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({res, id:data._id});
                });
            });
        });        
    },
    delete: (collection, filter) => {
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).deleteOne(filter, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            });
        });
    },
    deleteMany: (collection, filter) => {
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).deleteMany(filter, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            });
        });
    },
    drop: async (collection) => {
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                    connection.db.collection(collection).drop((err, res) => {
                    if (err) return reject({code: 400, message:'Couldn\'t drop collection...'});
                    return resolve({code:200, message:'Dropped collection'});
                });
            });
        });
    },
    update: (collection, update, filter) => {
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).updateOne(filter, update, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            });
        });
    },
    replace: (collection, update, filter) => {
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).replaceOne(filter, update, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            });
        });
    },
    select: (collection, params) => {
        if(!params) params = {};
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).find(params).toArray((err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            });
        });
    },
    selectOne: (collection, params) => {
        if(!params) params = {};
        return new Promise( async (resolve, reject) => {
            module.exports.connect().then(connection => {
                connection.db.collection(collection).findOne(params, (err, res) => {
                    if (err) return reject({code: 401, message: err});
                    connection.client.close();
                    return resolve({code:200, message:'Success', response:res});
                });
            })
        });
    }
}