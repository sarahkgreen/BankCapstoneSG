import pkg from 'mongodb';
const { MongoClient } = pkg;

let db = null;

async function startServer() {
    const url = process.env.MONGODB_URL 
    console.log("Connecting to MongoDB at: ", url);

    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db('myproject');  
        console.log("Connected successfully to db server");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

    function create(name, email, password) {
        return new Promise((resolve, reject) => {
            const collection = db.collection('users');
            const doc = {name, email, password, balance: 0};

            console.log('Inserting document:', doc);

            collection.insertOne(doc, {w:1}, function(err, result) {
                if (err) {
                    console.error('Error inserting document:', err);
                    reject('Error creating user account');
                } else {
                    console.log('Document inserted successfully:', result.ops[0]);
                    resolve(doc);
                }
            });
        })
    }

    function find(email) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .find({ email: email })
                .toArray(function (err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
    }

    function findOne(email) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .findOne({ email: email })
                .then((doc) => resolve(doc))
                .catch((err) => reject(err));
        })
    }

    function update(email, amount) {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .findOneAndUpdate(
                    { email: email },
                    { $inc: { balance: amount } },
                    { returnOriginal: false },
                    function (err, documents) {
                        err ? reject(err) : resolve(documents);
                    }
                );
        });
    }

    function all() {
        return new Promise((resolve, reject) => {
            const customers = db
                .collection('users')
                .find({})
                .toArray(function(err, docs) {
                    err ? reject(err) : resolve(docs);
                });
        })
    }

startServer();

export default { create, findOne, find, update, all };