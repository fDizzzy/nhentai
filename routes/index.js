var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  var page = req.param('page');
  if(typeof page == 'undefined')
      page="";
  var url = 'http://nhentai.net/?page='+page;
  request(url,function (error,response,html) {
    if(!error)
    {
      var $ = cheerio.load(html);
      $('#content').filter(function () {
        var data = $(this);
        res.render('index',{data:data});
      })
    }
  });
});
router.get('/:abc', function(req, res, next) {
  var page = req.params.abc;
  var url = 'http://nhentai.net/'+abc;
  request(url,function (error,response,html) {
    if(!error)
    {
      var $ = cheerio.load(html);
      $('#content').filter(function () {
        var data = $(this);
        res.render('index',{data:data});
      })
    }
  });
});

router.get('/g/:id',function (req,res,next) {
  var id = req.params.id;
  var url = 'http://nhentai.net/g/'+id;
  request(url,function (err,response,html) {
    if(!err)
    {
      var $ = cheerio.load(html);
      var a = $('#thumbnail-container .thumb-container .gallerythumb img.lazyload');
      var data ="";
      $('#bigcontainer').filter(function () {
        data+=$(this);
      });
      a.each(function (i,link) {
        var url = $(link).attr("data-src");
        console.log(url);
        var b = url.replace("//","").split("/");
        var i= b.length;
        var c = b[i-2];
        var d = b[i-1];
        d=d.replace("t.",".");
        var x = "<img src='//i.nhentai.net/galleries/"+c+"/"+d+"' style='display:inline-block;width:100%'>";
        data+=x;
      });
      $("#related-container").filter(function () {
        data+=$(this);
      });
      res.render('index',{data:data});
    }
  });
});
router.get('/:a/:b', function(req, res, next) {
  var a = req.params.a;
  var b = req.params.b;
  var page = req.param('page');
  if(typeof page == 'undefined')
      page="";
  var url = 'http://nhentai.net/'+a+'/'+b+'?page='+page;
  request(url,function (error,response,html) {
    if(!error)
    {
      var $ = cheerio.load(html);
      $('#content').filter(function () {
        var data = $(this);
        res.render('index',{data:data});
      })
    }
  });
});
router.get('/:a/:b/:c', function(req, res, next) {
  var a = req.params.a;
  var b = req.params.b;
  var c = req.params.c;
  var page = req.param('page');
  if(typeof page == 'undefined')
      page="";
  var url = 'http://nhentai.net/'+a+'/'+b+'/'+c+'?page='+page;
  request(url,function (error,response,html) {
    if(!error)
    {
      var $ = cheerio.load(html);
      $('#content').filter(function () {
        var data = $(this);
        res.render('index',{data:data});
      })
    }
  });
});

module.exports = router;
