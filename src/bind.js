function bind(obj, type, handler) {
    var node = typeof obj == "string" ? $(obj) : obj;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, handler);
    } else {
        node['on' + type] = handler;
    }
}

export default bind