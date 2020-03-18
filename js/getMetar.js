function getMetar(icao) {
    $.ajax({
        type: "GET",
        url: "https://dry-snow-1529.awwman.workers.dev/corsproxy/?apiurl=http://www.avt7.com/Home/AirportMetarInfo?airport4Code=" + icao,
        success: function (result) {
            console.log(result)
            var temp = JSON.parse(JSON.stringify(result));
            var temp_metar = temp['metarContentList']['rows'][0]['content'];
            var temp_taf = temp['tafContentList']['rows'][0]['content'];
            $("#weather").html('<div class="mdui-typo-body-1 mdui-text-center">' + temp_metar + '</div><br><div class="mdui-typo-body-1 mdui-text-center">' + temp_taf + '</div>');
        }
    })
}