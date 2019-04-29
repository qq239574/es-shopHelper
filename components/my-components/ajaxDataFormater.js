export let flatten = function (obj) {//扁平化对象
    var result = {};

    function recurse(src, prop) {
        var toString = Object.prototype.toString;
        if (toString.call(src) == '[object Object]') {
            var isEmpty = true;
            for (var p in src) {
                isEmpty = false;
                recurse(src[p], prop ? prop + '[' + p + ']' : p)
            }
            if (isEmpty && prop) {
                result[prop] = {};
            }
        } else if (toString.call(src) == '[object Array]') {
            var len = src.length;
            if (len > 0) {
                src.forEach(function (item, index) {
                    recurse(item, prop ? prop + '[' + index + ']' : '[' + index + ']');
                })
            } else {
                result[prop] = [];
            }
        } else {
            result[prop] = src;
        }
    }
    recurse(obj, '');

    return result;
}

let unflatten = function (data) {//反扁平化对象
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
}

let unflatten2 = function (data) {
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var result = {},
        cur, prop, idx, last, temp;
    for (var p in data) {
        cur = result, prop = "", last = 0;
        do {
            idx = p.indexOf(".", last);
            temp = p.substring(last, idx !== -1 ? idx : undefined);
            cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
            prop = temp;
            last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
    }
    return result[""];
}