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

function upd(n) {
    url = "https://wiki.sinofsx.com/Charts/ENR/ENR_ERC" + n + ".pdf";
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