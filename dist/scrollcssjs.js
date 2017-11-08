'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
    (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define(factory) : factory();
})(undefined, function () {
    'use strict';

    function __$styleInject(css, returnValue) {
        if (typeof document === 'undefined') {
            return returnValue;
        }
        css = css || '';
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        head.appendChild(style);

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        return returnValue;
    }

    function getSizePos(element) {
        var rect = element.getBoundingClientRect();
        return rect;
    }

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

    __$styleInject(".scrollbar{\r\n    position: absolute;\r\n    width: 10px;\r\n    height: 100%;\r\n    background: rgba(34, 34, 34, 0.47)\r\n}\r\n.scrollbarbox{\r\n   width: 100%;\r\n   height: 40px;\r\n   background: #eee;\r\n   position: relative;\r\n   cursor: pointer;\r\n}", undefined);

    var scrollbarbox_width = 10;
    var scrollbarbox_height = 40;
    var params = {
        $wrapper: null
    };
    var AddScroll = function AddScroll() {
        this.init.apply(this, arguments);
    };

    AddScroll.prototype.init = function (el, height) {
        params.$wrapper = el;
        params.$content = el.children[0];

        params.$content.style.position = "absolute";
        wrapper.style.position = "relative";
        /* 生成滚动条
         */
        this.createScrollBar();
        /* 按住滚动块  滚动事件*/
        this.mouseDownScrollEvent();
        /* 滚轮事件 */
        this.wheelChange();
    };
    /* 生成滚动条
        */
    AddScroll.prototype.createScrollBar = function () {
        var $wrapper = params.$wrapper;

        var $scrollbar = document.createElement('div');
        $scrollbar.className = "scrollbar";

        var $scrollbarbox = document.createElement('div');
        $scrollbarbox.className = "scrollbarbox";

        $scrollbar.appendChild($scrollbarbox);
        params.$wrapper.appendChild($scrollbar);
        /* 设置位置 */
        var wrapperSize = getSizePos($wrapper);
        $scrollbar.style.left = wrapperSize.width - scrollbarbox_width + 'px';

        params.$scrollbarbox = $scrollbarbox;
        params.$scrollbar = $scrollbar;
    };
    AddScroll.prototype.mouseDownScrollEvent = function () {
        var $wrapper = params.$wrapper,
            $scrollbar = params.$scrollbar,
            $scrollbarbox = params.$scrollbarbox,
            $content = params.$content;

        $scrollbarbox.onmousedown = function (event) {
            var e = event || window.event;
            var top = e.clientY;
            var _scrollTop = $scrollbarbox.offsetTop;

            document.onmousemove = scrollGo;
            document.onmouseup = function (event) {
                document.onmousemove = null;
            };

            function scrollGo(event) {
                var e = event || window.event;
                var _top = e.clientY;

                var _diffY = _top - top + _scrollTop;
                var mainHeight = $wrapper.offsetHeight;
                if (_diffY > mainHeight - $scrollbarbox.offsetHeight) {
                    _diffY = mainHeight - $scrollbarbox.offsetHeight;
                }
                if (_diffY <= 0) {
                    _diffY = 0;
                }
                $scrollbarbox.style.top = _diffY + "px";
                $content.style.top = -_diffY * ($content.offsetHeight / $wrapper.offsetHeight) + 'px';
            }
        };
    };
    AddScroll.prototype.wheelChange = function () {
        var $wrapper = params.$wrapper,
            $content = params.$content,
            $scrollbar = params.$scrollbar,
            $scrollbarbox = params.$scrollbarbox;

        var flag = 0;
        mouseWheel($wrapper, function (data) {

            flag = data / 12 + $scrollbarbox.offsetTop;
            if (flag <= 0) {
                flag = 0;
            }
            if (flag >= $wrapper.offsetHeight - scrollbarbox_height) {
                flag = $wrapper.offsetHeight - scrollbarbox_height;
            }
            $scrollbarbox.style.top = flag + "px";
            $content.style.top = -flag * ($content.offsetHeight / $wrapper.offsetHeight) + "px";
        });
    };
    window.AddScroll = AddScroll;
});