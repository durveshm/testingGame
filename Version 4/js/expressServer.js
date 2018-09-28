var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));

app.get('/', function(req, res)
{
    res.render('index');

});

app.get('/tester', function(req, res)
{
    res.render('tester');

});

app.listen(3000);