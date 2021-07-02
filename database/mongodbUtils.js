const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<User>:<Password>@cluster0.1tpql.mongodb.net/PETS?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let pets;

function connect(callback) {
   client.connect(err => {
     console.log('MongoDB sucessfully connected');
     pets = client.db('PETS').collection('pets');
     return callback(err);
   });
}

function disconnect(callback){
    client.close();
    callback();
}

function getPetsCollection(){
    return pets;
}

module.exports = {
  connect,
  disconnect,
  getPetsCollection,
};