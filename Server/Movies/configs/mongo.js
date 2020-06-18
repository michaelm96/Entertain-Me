const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "entertainMe";

let db;
const client = new MongoClient(url, { useUnifiedTopology: true})
function connect(cb) {
    client.connect(function (error) {
        if(error){
            console.log("Gagal terhubung movie");
        }else{
            console.log("Berhasil terhubung movie");
            db = client.db(dbName)
        }
        cb(error)
    });
}

function getDatabase() {
    return db;
}

module.exports = {
    connect,
    getDatabase
}