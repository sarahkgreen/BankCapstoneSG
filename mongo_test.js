import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
  console.log("Connected successfully to server");

    const dbName = 'myproject';
    const db = client.db(dbName);

    var name = 'user' + Math.floor(Math.random() * 10000);
    console.log('var name worked');
    var email = name + '@mit.edu';
    console.log('var email worked');

    var collection = db.collection('customers');
    console.log('var collection worked');
    var doc = {name, email};
    collection.insertOne(doc, {w: 1}, function (err, result) {
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);

            client.close();
    });

});
