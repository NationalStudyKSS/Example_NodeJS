const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const mysqlConfig = require('./mysqlConfig');
const conn = mysql.createConnection(mysqlConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('CRUD Server is Running');
});

// Create
app.post('/new', function (req, res, err) {
    
    if (req.body.user) {
        console.log(req.body);
        let newQuery = "INSERT INTO userdata(UserID, UserPW) VALUES(?, ?)";
        let param = [UserID = req.body.user, UserPW = req.body.pw];
        conn.query(newQuery, param, function (err, row, fields) {
            if (!err) {
                res.send("Insert Successfully");
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

// Read
app.post('/select', function (req, res, err) {

    if (req.body.user) {
        console.log(req.body);
        let selectedQuery = "SELECT Score, Gold FROM userdata WHERE UserID = ?";
        let param = [UserID = req.body.user];
        conn.query(selectedQuery, param, function (err, row, fields) {
            if (!err) {
                if (row.length === 0) {
                    console.log("No User");
                    res.send("No User");
                }
                else {
                    res.send(row);
                }
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

// Update
app.post('/update', function (req, res, err) {

    if (req.body.user) {
        console.log(req.body);
        let id = req.body.user;
        let gold = req.body.gold;
        let score = req.body.score;

        let updateQuery = "UPDATE userdata SET Gold = ?, Score = ?, UpdateTime = CURRENT_TIMESTAMP() WHERE UserID = ?";
        let param = [Gold = gold, Score = score, UserID = id];
        conn.query(updateQuery, param, function (err, row, fields) {
            if (!err) {
                res.send("Update Successfully");
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

// Delete
app.post('/delete', function (req, res, err) {

    if (req.body.user) {
        console.log(req.body);
        let id = req.body.user;

        let deleteQuery = "DELETE FROM userdata WHERE UserID = ?";
        let param = [UserID = id];

        conn.query(deleteQuery, param, function (err, row, fields) {
            if (!err) {
                res.send("Delete Successfully");
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

// Login
app.post('/login', function (req, res, err) {

    if (req.body.user) {
        console.log(req.body);
        let id = req.body.user;
        let pw = req.body.pw;

        let loginQuery = "SELECT UserID, UserPW FROM userdata WHERE UserID = ?";
        let param = [UserID = id];

        conn.query(loginQuery, param, function (err, row, fields) {
            if (!err) {
                console.log(row[0]);
                if (row[0] !== undefined) {
                    if (row[0].UserPW === pw && row[0].UserID === id) {
                        let TimeStamp = new Date();
                        console.log("Login Time : " + TimeStamp);
                        res.send("Login Successfully");
                    }
                    else {
                        res.send("Login Failed");
                    }
                }
                else {
                    res.send("No User");
                }
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

// Ranking
app.post('/ranking10', function (req, res, err) {

    if (req.body.user) {
        console.log(req.body);
        let rankingQuery = "SELECT UserID, Score FROM userdata ORDER BY Score DESC LIMIT 10";
        let param = [];

        conn.query(rankingQuery, param, function (err, row, fields) {
            if (!err) {
                res.send(row);
            }
            else {
                console.log(err);
                res.send(err);
            }
        });
    }
    else {
        res.send("UserID or UserPW missing");
    }
});

//app.post('/new', function (req, res) {
//    if (req.body.user && req.body.pw) {
//        console.log(req.body);
//        let newQuery = "INSERT INTO userdata(UserID, UserPW) VALUES(?, ?)";
//        let param = [req.body.user, req.body.pw];

//        conn.query(newQuery, param, function (err, results) {
//            if (!err) {
//                res.send("Insert Successfully");
//            } else {
//                console.log(err);
//                res.status(500).send(err);
//            }
//        });
//    } else {
//        res.status(400).send("UserID or UserPW missing");
//    }
//});

app.listen(3000, () => { console.log("CRUD Server is Running on Port 3000..."); });