var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');
var port = process.env.PORT || 8080;
var cors = require('cors');
var bodyParser = require('body-parser')
var pi = require('./src/pi');
var dataDetected = require('./src/object-detect-store');


//Live Stream URL
var urlStream = '';


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res, next) {
    res.send("Hello The Platform is operational! ");
    next();
});


app.post('/api/video', function (req, res, next) {
    urlStream = req.body;
    next();
});

app.post('/api/getvideo', function (req, res, next) {
    res.send(urlStream);
    next();
});

app.post('/api/tf', function (req, res) {
    var id = req.body.objects[0].id;
    var name = req.body.objects[0].name;

    //Testing ....
    console.log(id + name);
    dataDetected.updateObjects(id, name);
    res.sendStatus(200);
});

app.post('/api/motion/', function (req, res) {
    var motion = req.body.type;
    pi.updateMovement(motion)
    res.sendStatus(200);
});

// Server Running
app.listen(port);
console.log('The server is running on: ' + port);