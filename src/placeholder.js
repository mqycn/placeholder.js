/**
 * 源码名称：placeholder.js
 * 实现功能：让低版本的浏览器(主要是IE8)支持placeholder
 * 作者主页：http://www.miaoqiyuan.cn/
 * 联系邮箱：mqycn@126.com
 * 使用说明：http://www.miaoqiyuan.cn/p/placeholder-js
 * 最新版本：http://git.oschina.net/mqycn/placeholder.js
 */

//仅在不支持 placeholder 的时候执行
if (!('placeholder' in document.createElement('input'))) {

    var listenerName = 'attachEvent';
    if ('addEventListener' in window) {
        listenerName = 'addEventListener';
    }

    window[listenerName]('onload', function() {
        var placeholder = {
            //添加输入项
            add: function(tagName) {
                var list = document.getElementsByTagName(tagName);
                for (var i = 0; i < list.length; i++) {
                    this.render(list[i]);
                }
                return this;
            },
            //渲染
            render: function(dom) {
                var placeholder = dom.getAttribute('placeholder');
                if (!!placeholder) {
                    var placeholderDiv = this.getDiv(dom);
                    placeholderDiv.innerHTML = placeholder;
                    this.attachEvent(dom, placeholderDiv);
                }
            },
            //设置样式
            getDiv: function(dom) {
                var div = document.createElement('div');

                div.style.position = 'absolute';
                div.style.width = this.getPosition(dom, 'Width') + 'px';
                div.style.height = this.getPosition(dom, 'Height') + 'px';
                div.style.left = this.getPosition(dom, 'Left') + 'px';
                div.style.top = this.getPosition(dom, 'Top') + 'px';
                div.style.color = '#91D3F8';
                div.style.textIndent = '5px';
                div.style.zIndex = 999;
                div.style.background = dom.style.background;
                div.style.border = dom.style.border;
                div.style.cursor = 'text';

                if ('TEXTAREA' == dom.tagName.toUpperCase()) {
                    div.style.lineHeight = '35px';
                } else {
                    div.style.lineHeight = div.style.height;
                }
                document.getElementsByTagName('body')[0].appendChild(div);
                return div;
            },
            //计算当前输入项目的位置
            getPosition: function(dom, name, parentDepth) {
                var offsetName = 'offset' + name;
                var offsetVal = dom[offsetName];
                var parentDepth = parentDepth || 0;
                if (!offsetVal && parentDepth < 3) {
                    offsetVal = this.getPosition(dom.parentNode, name, ++parentDepth);
                }
                return offsetVal;
            },
            //添加事件
            attachEvent: function(dom, div) {

                //激活时，隐藏 placeholder
                dom[listenerName]('onfocus', function() {
                    div.style.display = 'none';
                });

                //失去焦点时，隐藏 placeholder
                dom[listenerName]('onblur', function(e) {
                    if (e.srcElement.value == '') {
                        div.style.display = '';
                    }
                });

                //placeholder 点击时，对应的输入框激活
                div[listenerName]('onclick', function(e) {
                    e.srcElement.style.display = 'none';
                    dom.focus();
                });
            }
        };

        //防止在 respond.min.js和html5shiv.min.js之前执行
        setTimeout(function() {
            placeholder.add('input').add('textarea');
        }, 50);
    });
}