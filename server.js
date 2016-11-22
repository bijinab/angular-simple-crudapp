var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
 	return res.render('index.html');
});

app.listen(3000, function () {
	console.log('CRUD App listening on port 3000!');
});