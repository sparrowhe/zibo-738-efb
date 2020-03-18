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
    url = "https%3a%2f%2fdry-snow-1529.awwman.workers.dev%2fcorsproxy%2f%3f1%3d1%26apiurl%3dhttps%3a%2f%2fwiki.sinofsx.com%2fCharts%2fENR%2fENR_ERC" + n + ".pdf";
    targeturl = "pdfjs/web/viewer.html?file=" + url;
    html = $("#2").html();
    $("#2").html('<object style="height:100%;width:100%;" data="' + targeturl + '">' + '</object>' + html);
    $("#1").addClass("remove");
    $("#2").removeClass("remove");
}

function close() {
    $("#2").addClass("remove");
    $("#1").removeClass("remove");
}
