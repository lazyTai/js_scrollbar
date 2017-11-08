import bind from './bind'

function mouseWheel(obj, handler) {
    var node = typeof obj == "string" ? $(obj) : obj;
    bind(node, 'mousewheel', function (event) {
        var data = -getWheelData(event);
        handler(data);
        if (document.all) {
            window.event.returnValue = false;
        } else {
            event.preventDefault();
        }
    });
    //火狐
    bind(node, 'DOMMouseScroll', function (event) {
        var data = getWheelData(event);
        handler(data);
        event.preventDefault();
    });
    function getWheelData(event) {
        var e = event || window.event;
        return e.wheelDelta ? e.wheelDelta : e.detail * 40;
    }
}

export default mouseWheel