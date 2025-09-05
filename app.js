const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    //res.send('Hello Express')
    res.send('{"name": "John", "age": 30, "city": "New York"}');
})

app.get('/about', function (req, res) {
    res.send('This is the about page');
});

app.get('/getdata', function (req, res) {
    let userID = req.query.id;
    let userPW = req.query.pw;

    console.log(`Received userID :: ${userID} + userPW :: ${userPW}`);

    res.send(`USER ID :: ${userID} + USER PW :: ${userPW}`);
});

app.post('/post', function (req, res) {
    console.log(req.body);
    res.send("Received Data user=" + req.body.user + ", pw=" + req.body.pw);
});


app.listen(3000, () => {
    console.log("Server is Running On Port 3000...");
});