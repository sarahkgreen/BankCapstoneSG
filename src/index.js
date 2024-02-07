import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import dal from '../dal.js';

const { create, findOne, find, update, all } = dal;
const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((users) => {
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');
            }
            else{
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);
                    });
            }
        });
});

app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            if(user.length > 0) {
                if (user[0].password === req.params.password) {
                    res.send(user[0]);
                }
                else {
                    res.send('Login failed: wrong password');
                }
            }
            else {
                res.send('Login failed: user not found');
            }
    });
});

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
        });
});

app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
