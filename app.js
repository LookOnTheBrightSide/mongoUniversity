//json arrays and dictionaries are the only data strucures. key values are dics

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var cons = require('consolidate');
var bodyParser = require('body-parser')

//var swig = require('swig');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.engine('handlebars', exphbs({
    defaultLayout: 'menu'
}));
app.set('view engine', 'handlebars');
app.use(express.static('views'));
app.use(express.static('public'));
//app.set('view engine', 'html')
//app.set('views', __dirname + '/views')
//mongo


var mongoclient = new MongoClient(new Server('localhost', 27017, {
    'native_parser': true
}));
var db = mongoclient.db('test');

//get variables from url
//post 
// app.get('/name/:name', function(req,res,next){
// 	var name = req.params.name;
// 	res.send('hello, ' + name);
// 	next();
// })
app.get('/logo',function(req,res){
	res.render('logo');
})
app.get('/',function(req,res){
	res.render('menu');
})
// app.get('/', function(req,res,next){
// 	res.render('fruitPicker',{'fruits':['apple','orange','banana','tomato']});
// })
// app.post('/favourite_fruit',function(req,res,next){
// 	var fav = req.body.fruit;
// 	if (typeof fav == 'undefined') {
// 		next(Error('Pick a fruit'));
// 	}else{
// 		res.send('you chose '+ fav)
// 	}
// })
app.get('/welcome', function(req, res) {
    db.collection('test').findOne({}, function(err, doc) {
        if (err)
            throw err
        res.render('index', doc)
    })

})

// var MongoClient = require('mongodb').MongoClient;
// //open the connection to server via driver // test database
// MongoClient.connect('mongodb://localhost:27017/test', function(err,db){
// 	//connection to database get db object
// 	if(err)
// 		throw err
// 	db.collection('test').findOne({},function(err,doc){
// 		if(err)
// 			throw err;
// 		console.dir(doc);

// 		db.close();
// 	})
// 	console.dir('success, called findOne')
// })








mongoclient.open(function(err, mongoclient){
	if (err) {
		throw err
	};
	app.listen(3333);
})




























