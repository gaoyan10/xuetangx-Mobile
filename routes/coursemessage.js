/*
* get course message
*/
var fs = require('fs');
var getCourseVideo = function(req, res) {
	fs.readFile('data/'+access, 'utf-8', function(err,data){
		if(err){
			res.writeHead(500);
			res.write('server error');
			res.end();
		}else{
			var datas = data.split(/\n/);
			for(var i = datas.length; i --;){
				var item = datas[i];
				if( coursename == item) {
					fs.readFile('data/video/'+coursename, 'utf-8', function(err,data){
						if(err){
							res.writeHead(500);
							res.write('server error');
							res.end();
						}else{
							res.writeHead(200, {'Content-Type':'application/json'});
							res.write(data);
							res.end();
						}
					});
					return;
				}
			}
			res.writeHead(403, {'Content-Type':'application/json'});
			res.end();
		}
	});
};
exports.getCourseMessage = function(req, res) {
	var key = req.headers['X-edx-api-key'];
	var access = req.headers['Authorization'];
	if(key != '1234567890' || access .length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		res.end();
		return;
	}
	var coursename = req.params.coursename;
	var type = req.query.type;
	if(type == undefined){
	fs.readFile('data/'+access, 'utf-8', function(err,data){
		if(err){
			res.writeHead(500);
			res.write('server error');
			res.end();
		}else{
			var datas = data.split(/\n/);
			for(var i = datas.length; i --;){
				var item = datas[i];
				if( coursename == item) {
					fs.readFile('data/detail/'+coursename, 'utf-8', function(err,data){
					if(err){
						console.log('');
					}else{
						res.writeHead(200, {'Content-Type':'application/json'});
						res.write(data);
						res.end();
					}});
					return;
				}
			}
			res.writeHead(403, {'Content-Type':'application/json'});
			res.end();
		}
	});
	}
	else{
		if(type == 'video'){
			getCourseVideo(req, res);
		}else{
			res.writeHead(400);
			res.write('server error');
			res.end();
		}
	}
	
};
