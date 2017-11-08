import { query, getSizePos } from './dom'
import mouseWheel from './mouseWheel'
import './scrollbar.css'
const scrollbarbox_width = 10
const scrollbarbox_height = 40
var params = {
    $wrapper: null,
}
var AddScroll = function () {
    this.init.apply(this, arguments)
}

AddScroll.prototype.init = function (el, height) {
    params.$wrapper = el
    params.$content = el.children[0]

    params.$content.style.position = "absolute"
    wrapper.style.position = "relative"
    /* 生成滚动条
     */
    this.createScrollBar()
    /* 按住滚动块  滚动事件*/
    this.mouseDownScrollEvent()
    /* 滚轮事件 */
    this.wheelChange()
}
/* 生成滚动条
    */
AddScroll.prototype.createScrollBar = function () {
    var { $wrapper } = params
    var $scrollbar = document.createElement('div')
    $scrollbar.className = "scrollbar"

    var $scrollbarbox = document.createElement('div')
    $scrollbarbox.className = "scrollbarbox"

    $scrollbar.appendChild($scrollbarbox);
    params.$wrapper.appendChild($scrollbar)
    /* 设置位置 */
    var wrapperSize = getSizePos($wrapper)
    $scrollbar.style.left = ((wrapperSize.width - scrollbarbox_width))
        + 'px';

    params.$scrollbarbox = $scrollbarbox;
    params.$scrollbar = $scrollbar;

}
AddScroll.prototype.mouseDownScrollEvent = function () {
    var { $wrapper, $scrollbar, $scrollbarbox,
        $content
    } = params;
    $scrollbarbox.onmousedown = function (event) {
        var e = event || window.event;
        var top = e.clientY;
        var _scrollTop = $scrollbarbox.offsetTop;

        document.onmousemove = scrollGo
        document.onmouseup = function (event) {
            document.onmousemove = null;
        }

        function scrollGo(event) {
            var e = event || window.event;
            var _top = e.clientY;

            var _diffY = _top - top + _scrollTop;
            var mainHeight = $wrapper.offsetHeight;
            if (_diffY > (mainHeight - $scrollbarbox.offsetHeight)) {
                _diffY = mainHeight - $scrollbarbox.offsetHeight;
            }
            if (_diffY <= 0) {
                _diffY = 0;
            }
            $scrollbarbox.style.top = _diffY + "px";
            $content.style.top = -_diffY * ($content.offsetHeight / $wrapper.offsetHeight) + 'px'
        }
    }

}
AddScroll.prototype.wheelChange = function () {
    var { $wrapper, $content, $scrollbar, $scrollbarbox } = params;
    var top = 0;
    var flag = 0;
    mouseWheel($wrapper, function (data) {

        flag = (data / 12) + $scrollbarbox.offsetTop
        if (flag <= 0) { flag = 0 }
        if (flag >= $wrapper.offsetHeight - scrollbarbox_height) {
            flag = $wrapper.offsetHeight - scrollbarbox_height
        }
        $scrollbarbox.style.top = flag + "px";
        $content.style.top = -flag * ($content.offsetHeight / $wrapper.offsetHeight) + "px";
    })
}
window.AddScroll = AddScroll