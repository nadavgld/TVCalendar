var express = require('express');
var request = require('request');

var app = express();
app.use(express.static('public'));

const PORT = 8080;

app.get('/api/shows/:q', (req,res)=>{
    var q = req.params.q;

    request.get('http://api.tvmaze.com/search/shows?q=' + q, function(err,response,body){
        res.send(body);
    });
});

app.get('/api/show/:id', (req,res)=>{
    var id = req.params.id;

    request.get('http://api.tvmaze.com/shows/' + id + '/episodes', function(err,response,body){
        res.send(body);
    });
});

app.get('/api/schedule/:date', (req,res)=>{
    var date = req.params.date;

    request.get('http://api.tvmaze.com/schedule?date=' + date, function(err,response,body){
        res.send(body);
    });
});

app.listen(PORT, ()=>console.log(`listen to ${PORT}`));