var arr = new Array();

function read(name) {
    var check = arr[name];
    var box = document.getElementsByClassName(name);
    for (var i = 0; i < box.length; i++) {
        if (check[i]) {
            box[i].checked = true
        } else {
            box[i].checked = false
        }
    }
}

function save(name) {
    var check = document.getElementsByClassName(name);
    console.log(check)
    var tmp = new Array();
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            tmp.push(1);
        } else {
            tmp.push(0);
        }
    }
    arr[name] = tmp;
}