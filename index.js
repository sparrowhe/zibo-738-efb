const express = require('express')
const path = require('path')
const fs = require('fs')
const download = require('download')
const axios = require('axios')
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

  function downloadpdf(targetiurl) {
  download(targetiurl).then(data => {
//    fs.unlinkSync('files/temp.pdf')
    fs.writeFileSync('public/files/temp.pdf', data);
});
}

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
    downloadpdf(result)
    res.sendFile(path.join(__dirname,"./public/files/temp.pdf")) //返回数据
    console.log("已下载所要求的PDF，", result)
});
app.get('/getmater',function(req,res){
  targeiurl = 'http://www.avt7.com/Home/AirportMetarInfo?airport4Code=' + req.query.icao;
  download(targeiurl).then(data => {
    console.log("已获取MATER of" , req.query.icao);
    res.send(data);
    });
});
var server = app.listen(8025, function () {
  console.log("监听已启动，访问地址 http://<IP地址>:8025")
  console.log("请从上列IP中选择正确的IP地址访问。一般包含“以太网”，“Wireless”，“本地连接”等字样的是正确的网卡")
})



