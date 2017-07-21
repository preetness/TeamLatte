const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.listen(3000);

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/about', function(req, res){
   res.render('pages/about');
});

app.get('/mission', function(req, res){
  res.render('pages/mission');
});

app.get('/location', function(req, res){
  res.render('pages/location');
});

app.get('/menu', function(req, res){
  res.render('pages/menu');
});
