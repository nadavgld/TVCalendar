var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

const PORT = 8080;
const MLAB_URL = "https://api.mlab.com/api/1/databases/tvcalendar/collections/";
const APIKEY = "?apiKey=z-so78xt43eKPEx8v5ZiHFmL8aRK82u_";

app.get('/api/shows/:q', (req, res) => {
    var q = req.params.q;
    request.get('http://api.tvmaze.com/search/shows?q=' + q, function (err, response, body) {
        res.send(body);
    });
});

app.get('/api/show/:id', (req, res) => {
    var id = req.params.id;

    request.get('http://api.tvmaze.com/shows/' + id + '/episodes', function (err, response, body) {
        res.send(body);
    });
});

app.get('/api/schedule/:date', (req, res) => {
    var date = req.params.date;

    request.get('http://api.tvmaze.com/schedule?date=' + date, function (err, response, body) {
        res.send(body);
    });
});

app.get('/shows/', (req, res) => {
    request.get(MLAB_URL + "shows" + APIKEY, function (err, response, body) {
        res.send(body);
    });
});

app.post('/api/show/', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;

    var options = {
        uri: MLAB_URL + "shows" + APIKEY,
        method: 'POST',
        json: {
            "showid": parseInt(id),
            "name": name
        }
    };

    request.post(options, function (err, response, body) {
        res.send(body);
    });
});

app.delete('/api/show/:id', (req, res) => {

    request.delete(MLAB_URL + "shows/" + req.params.id + APIKEY, function(err,response,body){
        res.send(body);
    });
});

app.listen(PORT, () => console.log(`listen to ${PORT}`));