/*
	global. = this will allow you to use variable "globally". 
	Meaning, you can delcare the variable(s) here and call them into different file(s)
*/

express 			= require('express');
global.app 			= express();

global.bodyParser 	= require('body-parser')

global.mysql      	= require('mysql');
global.MongoClient 	= require('mongodb').MongoClient

// Load Chance
global.Chance 		= require('chance');
// Instantiate Chance so it can be used
global.chance 		= new Chance();

global.moment    	= require('moment');
global._ 			= require('lodash'); 


global.port = 8080;

app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

      // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodie
app.use(bodyParser.json()); 


app.listen(process.env.PORT || port, () => 
{
	console.log('server running on '+ port)
})

//Load libs

route_mysql = require(__dirname+'/routes/mysql')
route_monogodb = require(__dirname+'/routes/mongodb')


app.get('/', function(req, res, next) 
{
	res.json({ status:"success", });  
	return false; 
});

//--->mongodb CRUD - Start
app.post('/mongodb', route_monogodb.add);
app.post('/mongodb/update', route_monogodb.update);

app.get('/mongodb', route_monogodb.get);
app.get('/mongodb/Where', route_monogodb.getWhere);

app.delete('/mongodb', route_monogodb.delete);
app.delete('/mongodb/all', route_monogodb.deleteAll);
//--->mongodb CRUD - End



//--->MYSQL CRUD - Start
app.post('/mysql', route_mysql.add);
app.post('/mysql/update', route_mysql.update);

app.get('/mysql', route_mysql.get);
app.get('/mysql/Where', route_mysql.getWhere);

app.delete('/mysql', route_mysql.delete);
app.delete('/mysql/all', route_mysql.deleteAll);
//--->MYSQL CRUD - End