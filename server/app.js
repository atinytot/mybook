var express = require('express');
var bodyParser =  require('body-parser');
var app = express();

var User = require('./pages/user');
var NodebooksSchame = require('./pages/nodebooks');
var booksSchame = require('./pages/books');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* 设置请求头  **************************************************/
app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
 　 res.header("Access-Control-Allow-Headers","Content-Type");
    next();
});


/* 登录  **************************************************/
app.get('/login', function (req, res) {
	User.find(function(err, data){
  		if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
	});
});

/* 学习笔记  **************************************************/
app.get('/allNodebooks', function (req, res) {
    NodebooksSchame.find({pid:req.query.pid},function(err, data){
      if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.get('/searchNodeBooks',function(req, res){
    NodebooksSchame.findOne({id:req.query.id},function(err, data){
      if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.get('/deleteNodeBooks',function(req, res){
    console.log(req.query.id);
    NodebooksSchame.remove({id:req.query.id},function(err, data){
      if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.post('/saveNodebooks', function (req, res) {
    var nbook = new NodebooksSchame(req.body);
    nbook.save(function(err, data){
      if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.post('/updateNodebooks', function (req, res) {
    // var nbook = new NodebooksSchame(req.body);
    var opts = {
      id    : req.body.id,
      pid   : req.body.pid,
      title : req.body.title,
      text  : req.body.text,
      updateDate: req.body.updateDate
    };
    NodebooksSchame.update({id:req.body.id},{$set:opts},{overwrite:true},function(err,data){
         if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

/* 阅读笔记  **************************************************/
app.get('/allBooks', function (req, res) {
    booksSchame.find({pid:req.query.pid},function(err, data){
       if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.get('/searchBooks',function(req, res){
    booksSchame.findOne({id:req.query.id},function(err, data){
      if(err) res.send({ok:false, data: data});
              res.send({ok:true, data:data});
    });
});

app.get('/deleteBooks',function(req, res){
    booksSchame.remove({id:req.query.id},function(err, data){
       if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.post('/saveBooks', function (req, res) {
    var book = new booksSchame(req.body);
    book.save(function(err, data){
     if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

app.post('/updateBooks', function (req, res) {
    // var book = new booksSchame(req.body);
    var opts = {
      id        : req.body.id,
      pid       : req.body.pid,
      title     :req.body.title,
      text      :req.body.text,
      updateDate: req.body.updateDate
    };
    booksSchame.update({id:req.body.id},{$set:opts},{overwrite:true},function(err,data){
      if(err) res.send({ok:false, data: data});
               res.send({ok:true, data:data});
    });
});

// ----------------------------------------------------------

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});