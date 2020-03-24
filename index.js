console.log('B738 EFB  作者：eureka0225(CDG0225)与Zerlight(SINO1219)')
console.log('当前EFB版本为 v1.0  处于分支：offline')
console.log(' ')
const express = require('express')
const path = require('path')
const fs = require('fs')
const download = require('download')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
var os=require('os'),iptable={},
    ifaces=os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details,alias){
          if (details.family=='IPv4') {
                iptable[dev+(alias?':'+alias:'')]=details.address;
                    }
                      });
                      }
                      console.log(iptable);


app.use(express.static(path.join(__dirname, 'public')))
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/downloadpdf',function(req,res){
  var result = req.query.url;
  if (req.query.special == 'temp') {
    download(result).then(data => {
      fs.writeFileSync('public/pdfjs/files/temp.pdf', data);
      res.status(200).send({"message":"ok"}) //返回数据
      console.log("已下载所要求的PDF，", result) 
     });
  } else {
    download(result, "public/pdfjs/files").then(data => {
      res.status(200).send({"message":"ok"}) //返回数据
      console.log("已下载所要求的PDF，", result)
      });
  }
});
app.get('/getmater',function(req,res){
  targeiurl = 'http://www.avt7.com/Home/AirportMetarInfo?airport4Code=' + req.query.icao;
  download(targeiurl).then(data => {
    console.log("已获取MATER of" , req.query.icao);
    res.send(data);
    });
});
app.get('/eaipget',function(req,res){
  if(req.query.command == 'check'){
    fs.exists("public/files/sinoeaip/info.json",function(exists){
        if(exists){
        console.log("eAIP info已找到")
        var eaipinfo = fs.readFileSync("public/files/sinoeaip/info.json",)
         res.status(200).send(eaipinfo) //返回数据
        }
        if(!exists){
 //        console.log("eAIP info文件不存在，进入初始化")
         res.status(200).send({"message":"notfound"})
           }
        })
  }
  if(req.query.command == 'update'){
    res.status(200).send({"message":"working"})
    download("https://wiki.sinofsx.com/index.php?title=AD_2._%E6%9C%BA%E5%9C%BA_AERODROMES").then(data => {
      console.log("已抓取到SINO WIKI");
      eaipstatus = {"message":"已抓取到SINO云课堂HTML"}
      $ = cheerio.load(data);
      var links = new Array();
      $('a[class="external text"]').each(function(){
      link = $(this).attr("href");
      links.push(link);
    })
    links.splice(0,1)
      console.log(links);
      eaipstatus = {"message":"已抓取eAIP下载链接，开始下载"}
      Promise.all(links.map(x => download(x, 'public/pdfjs/files/eaip'))).then(() => {
        console.log('全部PDF下载完毕！');
        eaipstatus = {"message":"已完成eAIP更新"}
    });
    console.log('全部PDF下载完毕');
      });
  }
    });
app.get('/updatestatus',function(req,res){
        res.status(200).send(eaipstatus) //返回数据
    });
var server = app.listen(8025, function () {
  console.log("监听已启动，访问地址 http://<IP地址>:8025")
  console.log("请从上列IP中选择正确的IP地址访问。一般包含“以太网”，“Wireless”，“本地连接”等字样的是正确的网卡")
})
app.get('/sinowiki',function(req,res){
  download('https://wiki.sinofsx.com/index.php?title=AD_2._%E6%9C%BA%E5%9C%BA_AERODROMES').then(data => {
    var $ = cheerio.load(data);
    $('#'+req.query.target).next().removeClass('wikitable mw-collapsible mw-made-collapsible');
    $('#'+req.query.target).next().addClass('mdui-table mdui-table-hoverable');
    $('#'+req.query.target).next().children('tbody').children('tr').children('th').removeAttr('style');
    $('#'+req.query.target).next().children('tbody').children('tr').children('td').children('center').children('a').removeAttr('target');
    $('#'+req.query.target).next().children('tbody').children('tr').children('td').children('center').children('a').removeAttr('rel');
    $('#'+req.query.target).next().children('tbody').children('tr').children('td').children('center').children('a').removeAttr('class');
    $('#'+req.query.target).next().children('tbody').children('tr').children('td').children('center').children('a').attr('class','mdui-btn');
    $('#'+req.query.target).next().children('tbody').children('tr').children('td').children('center').children('a').attr('id','contable');
    console.log("已获取FormInfo of" , req.query.target);
    code = $('#'+req.query.target).next().html();
    //console.log(code);
    res.send({'message':'<table class=\"mdui-table mdui-table-hoverable\" style=\"width: 100%;\" id=\"sinoform\">'+code+'</table>'});
    });
});

// PDF下载完毕指示，前端显示