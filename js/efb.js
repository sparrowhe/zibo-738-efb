function show(n) {
    var name = ["beforeFlight.html", "beforeStart.html", "beforeTaxi.html", "beforeTakeoff.html",
        "afterTakeoff.html", "descend.html", "approach.html", "landing.html", "cutoff.html", "leave.html"
    ];
    $.ajax({
        url: "checklist/" + name[n - 1],
        success: function (result) {
            $("#card").html(result);
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
function upd(n) {
    url = "https://wiki.sinofsx.com/Charts/ENR/ENR_ERC" + n + ".pdf";
    targeturl = "pdfjs/web/viewer.html?file=" + url;
    html=$("#2").html();
    $("#2").html('<object style="height:100%;width:100%;" data="'+targeturl+'">' +'</object>' + html);
    $("#1").addClass("remove");
    $("#2").removeClass("remove");
}

function close() {
    $("#2").addClass("remove");
    $("#1").removeClass("remove");
}
