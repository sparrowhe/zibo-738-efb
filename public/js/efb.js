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
        data: {url:turl},
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

function updateeaip(){
    $.ajax({
        url: "/eaipget",
        data: {command:"update"},
        type: "GET",
        success: function(result){ 
            if (lastm==result) {
            } else {
                lastm = result;
                var dete2 = JSON.parse(JSON.stringify(result));
                var tede2 = dete2['message'];
                $("#updates").append('<div class="mdui-dialog-content" id="updates">'+tede2+'</div>')
                if (tede2=='done') {
                    clearInterval(idxx);
                  }
            }
        }
    })
    }