
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var register = require('./routes/register');
var login = require('./routes/login');
var enroll = require('./routes/roll');
var course = require('./routes/coursemessage');
var list = require('./routes/getlist');
var https = require('https');
var path = require('path');
var fs = require('fs');

var app = express();

var privateKey = fs.readFileSync('cert/privatekey.pem').toString();
var certificate = fs.readFileSync('cert/certificate.pem').toString();
var options ={
	key: privateKey,
	cert: certificate
	};
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/test2', function(req, res){
	res.writeHead(400,{'Content-Type': ' application/json'});
	res.write('test2');
	res.end();
});
app.post('/test',function(req, res){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.write(req.body + 'haha');
	res.end();
	var headers = req.headers;
	console.log(req.headers['x-edx-api-key']);
	for (var item in headers){
		console.log(item + ":" + headers[item]);
	}
	fs.appendFile('test.data', req.body.user, 'utf-8', function(err){
		if(err){
			console.log(err);
		}
	});
	console.log(req.body.user);
	console.log(req.body.pass);
	console.log(req.body);
	
});
app.post('/edx-api/signup/v1/register', register.register);
app.post('/edx-api/auth/v1/oauth2/access_token', login.login);
app.post('/edx-api/enrollments/v1/:username', enroll.enrollment);
app.delete('/edx-api/enrollments/v1/:username', enroll.unenroll);
app.get('/edx-api/courseware/v1',list.getallcourse);
app.get('/edx-api/enrollments/v1/',list.getenrollcourse);
app.get('/edx-api/courseware/v1/:coursename',course.getCourseMessage);
https.createServer(options,app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
