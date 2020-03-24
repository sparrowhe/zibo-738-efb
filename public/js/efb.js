function show(n) {
    var name = ["beforeFlight", "beforeStart", "beforeTaxi", "beforeTakeoff",
        "afterTakeoff", "descend", "approach", "landing", "cutoff", "leave"
    ];
    $.ajax({
        url: "checklist/" + name[n - 1] + ".html",
        success: function (result) {
            $("#card").html(result);
            read(name[n - 1]);
        }
    })
}

function erc() {
    $.ajax({
        url: "erc.html",
        success: function (result) {
            $("#card").html(result);
            $("#foot").addClass("remove");
        }
    })
}

function qrh() {
    $("#foot").removeClass("remove");
    show(1);
}

function weather() {
    $.ajax({
        url: "weather.html",
        success: function (result) {
            $("#card").html(result);
        }
    })
}

$('#icao').bind('keypress', function (event) {
    if (event.keyCode == 13) {
        getW()
    }
});

function getW() {
    var icao = $("#icao").val()
    getMetar(icao)
}

function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
window.onload = setInterval(function updTime() {

    var time = "UTC "
    var d = new Date()
    time += PrefixInteger(d.getUTCHours().toString(),2) + PrefixInteger(d.getUTCMinutes().toString(),2) + " Z"
    $("#time").html(time)
}, 1000)

function upd(n) {
    turl = "https://wiki.sinofsx.com/Charts/ENR/ENR_ERC" + n + ".pdf";
    targeturl = "pdfjs/web/viewer.html?file=../files/ENR_ERC" + n + ".pdf";
    html = $("#2").html();
    $.ajax({
        url: "/downloadpdf",
        data: {url:turl,special:"ENR_ERC" + n + ".pdf"},
        type: "GET",
        success: function(result){ 
            var dete = JSON.parse(JSON.stringify(result));
            var tede = dete['message'];
            if(tede=="ok"){
            console.log(result);
            $("#2").html('<object style="height:100%;width:100%;" data="' + targeturl + '">' + '</object>' + html);
            $("#1").addClass("remove");
            $("#2").removeClass("remove");
        }}
    })
}

function close() {
    $("#2").addClass("remove");
    $("#1").removeClass("remove");
}

function eaip() {
    $.ajax({
        url: "eaip.html",
        success: function (result) {
            $("#card").html(result);
            $.ajax({
                url: "/eaipget",
                data: {command:"check"},
                type: "GET",
                success: function(result){ 
                    var dete2 = JSON.parse(JSON.stringify(result));
                    var tede2 = dete2['message'];
                    if(tede2=="notfound"){
                    console.log(result);
                    $("#status").load("js/eaipcon/notfound.html");
                }
            }
            })
        }
    })
}

function startcheckin(){
eaipc = setInterval(function(){ startcheck() }, 500);
}

function stopeaipcheck() {
    clearInterval(eaipc);
}
function startcheck(){
    $.ajax({
        url: "/updatestatus",
        type: "GET",
        success: function(result){ 
                var dete2 = JSON.parse(JSON.stringify(result));
                var tede2 = dete2['message'];
                $("#updates").replaceWith('<div class="mdui-dialog-content" id="updates">'+tede2+'</div>')
                if (tede2=='已完成eAIP更新') {
                    stopeaipcheck();
                  }
        }
    })
}
function updateeaip(){
    $.ajax({
        url: "/eaipget",
        data: {command:"update"},
        type: "GET",
        success: function(result){ 
            startcheckin();
        }
    })
    }

function jump(){
        window.location.href="https://wiki.sinofsx.com/index.php?title=%E8%88%AA%E8%A1%8C%E8%B5%84%E6%96%99";
       }

       
function full(){
    window.location.href=targeturl;
   }

 function sinowiki(){
    var icao = document.getElementById('icaosino').value;
 //   $('#sinoform').html(' ');
        $.ajax({
            url: "/sinowiki",
            data: {target:icao},
            type: "GET",
            success: function(result){ 
                var dete2 = JSON.parse(JSON.stringify(result));
                var tede2 = dete2['message'];
                tede2 = tede2.replace(/<a/g,'<botton')
                tede2 = tede2.replace(/<\/a>/g,'</botton>')
                tede2 = tede2.replace(/href="/g,'onclick="sinoshow(\'')
                tede2 = tede2.replace(/\.pdf"/g,'.pdf\')"')
                $('#contable').html(tede2);
            }
        })
        }

        function sinoshow(n) {
            removesinoshow()
            turl = n;
            targeturl = "pdfjs/web/viewer.html?file=../files/temp.pdf";
            $.ajax({
                url: "/downloadpdf",
                data: {url:turl,special:'temp'},
                type: "GET",
                success: function(result){ 
                    var dete = JSON.parse(JSON.stringify(result));
                    var tede = dete['message'];
                    if(tede=="ok"){
                    console.log(result);
                    $("#sinoshow").html('<object id="sinoshow" style="height:100%;width:100%;" data="' + targeturl + '">' + '</object>');
                    $("#main").addClass("remove");
                    $("#sinoshow").removeClass("remove");
                    $("#pdfbotton").removeClass("remove");
                }}
            })
        }

function removesinoshow() {
    $("#sinoshow").html('<div id="sinoshow" class="remove"></div>');
    $("#main").removeClass("remove");
    $("#pdfbotton").addClass("remove");
}