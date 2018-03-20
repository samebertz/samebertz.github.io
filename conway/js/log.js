function lpad(str, pad, len) {
    for(var i = str.length; i < len; i++) {
        str = pad + str;
    };
    return str;
}
function assToString(ass) {
    var n = '';
    for(var key in ass) {
        if(!ass.hasOwnProperty(key)) {
            // console.log('wait what...');
        } else {
            n += ' | ['+key+'] => '+ass[key];
        };
    };
    return n.substring(3);
}
