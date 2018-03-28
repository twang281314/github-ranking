/**
 * Created by anytao on 2017/11/6.
 */
var dragResizeDiv = new function () {
    var a = this;
    this.move = false;
    this.resize = false;
    this.divId = null;
    this.x = 0;
    this.z = 1;
    this.width = 0;
    this.height = 0;
    this.parentDom;
    this.disX = 0;
    this.disY = 0;
    this.domX = 0;
    this.domY = 0;
    this.domWidth = 0;
    this.domHeight = 0;
    this.editorHeight;
    this.lineWidth = 1;
    this.lineColor = "#000";
    this.selectedArray = new Array();
    this.allDiv = new Array();
    this.createEditor = function (f, e) {
        var d = e.id;
        var j = e.content;
        var k = e.readOnly ? "readOnly" : "";
        var c = e.style;
        var g = e.fontStyle;
        var m = e.dragCallback;
        var l = e.resizeCallback;
        var h = e.selectCallback;
        var i = e.contentCallback;
        a.divId = d ? d : "editor" + parseInt(100000000 * Math.random());
        a.parentDom = f;
        a.domX = f.offset().left + f.parent().scrollLeft();
        a.domY = f.offset().top + f.parent().scrollTop();
        a.domWidth = f.width();
        a.domHeight = f.height();
        var b = $('<div id="' + a.divId + '" class="dragResizeDiv" style="z-index:' + (a.z++) + ";" + c + '"><div class="resizeL"></div><div class="resizeT"></div><div class="resizeR"></div><div class="resizeB"></div><div class="resizeLT"></div><div class="resizeTR"></div><div class="resizeBR"></div><div class="resizeLB"></div><div class="content"><textarea class="textEditor" ' + k + ' style="' + g + '">' + j + "</textarea></div></div>");
        f.append(b);
        a.allDiv.push(b);
        b.find(".textEditor").eq(0).bind("change", function (n) {
            if (jQuery.isFunction(i)) {
                i($(this).val())
            }
        });
        a.initControl(true, m, l, h)
    };
    this.createHtml = function (f, e) {
        var d = e.id;
        var j = e.content;
        var k = e.readOnly ? "readOnly" : "";
        var c = e.style;
        var g = e.fontStyle;
        var m = e.dragCallback;
        var l = e.resizeCallback;
        var h = e.selectCallback;
        var i = e.contentCallback;
        a.divId = d ? d : "editor" + parseInt(100000000 * Math.random());
        a.parentDom = f;
        a.domX = f.offset().left + f.parent().scrollLeft();
        a.domY = f.offset().top + f.parent().scrollTop();
        a.domWidth = f.width();
        a.domHeight = f.height();
        var b = $('<div id="' + a.divId + '" class="dragResizeDiv" style="z-index:' + (a.z++) + ";" + c + '"><div class="resizeL"></div><div class="resizeT"></div><div class="resizeR"></div><div class="resizeB"></div><div class="resizeLT"></div><div class="resizeTR"></div><div class="resizeBR"></div><div class="resizeLB"></div><div class="content">' + j + "</div></div>");
        f.append(b);
        a.allDiv.push(b);
        b.find(".textEditor").eq(0).bind("change", function (n) {
            if (jQuery.isFunction(i)) {
                i($(this).val())
            }
        });
        a.initControl(true, m, l, h)
    };
    this.createRect = function (f, e) {
        var i = e.id;
        var c = e.style;
        var h = e.dragCallback;
        var d = e.resizeCallback;
        var b = e.selectCallback;
        a.parentDom = f;
        a.divId = i ? i : "rect" + parseInt(100000000 * Math.random());
        a.domX = f.offset().left + f.parent().scrollLeft();
        a.domY = f.offset().top + f.parent().scrollTop();
        a.domWidth = f.width();
        a.domHeight = f.height();
        var g = $('<div id="' + a.divId + '" class="dragResizeDiv" style="z-index:' + 0 + ";background: rgba(0,0,0,0);" + c + '"><div class="resizeL"></div><div class="resizeT"></div><div class="resizeR"></div><div class="resizeB"></div><div class="resizeLT"></div><div class="resizeTR"></div><div class="resizeBR"></div><div class="resizeLB"></div><div class="content"></div></div>');
        f.append(g);
        a.allDiv.push(g);
        a.initControl(false, h, d, b)
    };
    this.createImg = function (g, f) {
        var e = f.id;
        var b = f.src;
        var d = f.style;
        var i = f.content;
        var j = f.showText;
        var l = f.dragCallback;
        var k = f.resizeCallback;
        var h = f.selectCallback;
        a.parentDom = g;
        a.divId = e ? e : "editor" + parseInt(100000000 * Math.random());
        a.domX = g.offset().left + g.parent().scrollLeft();
        a.domY = g.offset().top + g.parent().scrollTop();
        a.domWidth = g.width();
        a.domHeight = g.height();
        var c = $('<div id="' + a.divId + '" class="dragResizeDiv" style="border:none;z-index:' + (a.z++) + ";" + d + '"><div class="resizeL"></div><div class="resizeT"></div><div class="resizeR"></div><div class="resizeB"></div><div class="resizeLT"></div><div class="resizeTR"></div><div class="resizeBR"></div><div class="resizeLB"></div><div class="content" tabindex="0"><img width="100%" height="100%" src="' + b + '" />' + (j ? ('<div class="showText" style="height:16px;">' + (i != null ? i : "") + "</div>") : "") + "</div></div>");
        g.append(c);
        a.allDiv.push(c);
        a.initControl(true, l, k, h)
    };
    this.createEllipse = function (g, f) {
        var i = f.id;
        var e = f.left;
        var d = f.top;
        var c = f.width;
        var b = f.height;
        a.parentDom = g;
        a.divId = i ? i : "ellipse" + parseInt(100000000 * Math.random());
        a.domX = g.offset().left + g.parent().scrollLeft();
        a.domY = g.offset().top + g.parent().scrollTop();
        a.domWidth = g.width();
        a.domHeight = g.height();
        a.lineWidth = f.lineWidth;
        a.lineColor = f.color;
        var h = $('<div id="' + a.divId + '" class="dragResizeDiv" style="z-index:' + (a.z++) + ";width:" + c + "px;height:" + b + "px;top:" + d + "px;left:" + e + 'px;border:none;background-color:rgba(0,0,0,0);"><div class="resizeL"></div><div class="resizeT"></div><div class="resizeR"></div><div class="resizeB"></div><div class="resizeLT"></div><div class="resizeTR"></div><div class="resizeBR"></div><div class="resizeLB"></div><div class="content"><canvas class="myCanvas" height="' + b + '" width="' + c + '" style="z-index:-1;">\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5,\u4e0d\u652f\u6301\u663e\u793a\u6a21\u677f.</canvas></div></div>');
        g.append(h);
        a.allDiv.push(h);
        a.drawEllipse(h, c, b, a.lineWidth, a.lineColor);
        a.initControl(false, f.dragCallback, f.resizeCallback, f.selectCallback)
    };
    this.drawEllipse = function (e, f, q, i, h) {
        var l = e.find(".myCanvas")[0];
        l.width = f;
        l.height = q;
        var g = l.getContext("2d");
        var p = f / 2 - 1;
        var n = q / 2 - 1;
        var o = f / 2;
        var m = q / 2;
        g.save();
        var d = (p > n) ? p : n;
        var k = p / d;
        var j = n / d;
        g.scale(k, j);
        g.beginPath();
        g.arc(o / k, m / j, d, 0, 2 * Math.PI, false);
        g.closePath();
        g.restore();
        g.lineWidth = i;
        g.strokeStyle = h;
        g.stroke()
    };
    this.createLine = function (f, h, g, n, l) {
        a.divId = "line" + parseInt(100000000 * Math.random());
        a.domX = f.offset().left + f.parent().scrollLeft();
        a.domY = f.offset().top + f.parent().scrollTop();
        a.domWidth = f.width();
        a.domHeight = f.height();
        a.parentDom = f;
        var e = h < n ? h : n;
        var j = g < l ? g : l;
        var b = Math.abs(n - h);
        var k = Math.abs(l - g);
        var d = $('<canvas id="' + a.divId + '" class="myCanvas" width="' + (b + 1) + '" height="' + (k + 1) + '" style="top:' + j + "px;left:" + e + 'px;">\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301HTML5,\u4e0d\u652f\u6301\u663e\u793a\u6a21\u677f.</canvas>');
        //debugger;
        f.append(d);
        a.allDiv.push(d);
        var i = $("[id='" + a.divId + "']")[0];
        var m = i.getContext("2d");
        m.beginPath();
        m.moveTo(h - e, g - j);
        m.lineTo(n - e, l - j);
        m.strokeStyle = "black";
        m.stroke();

    };
    this.createHeader = function () {};
    this.createFooter = function () {};
    this.initControl = function (c, e, d, b) {
        a.initDrag(c, e, b);
        a.initResize(".resizeR", true, false, true, true, c, d, b);
        a.initResize(".resizeL", true, false, false, true, c, d, b);
        a.initResize(".resizeT", false, true, true, false, c, d, b);
        a.initResize(".resizeB", false, true, true, true, c, d, b);
        a.initResize(".resizeLT", true, true, false, false, c, d, b);
        a.initResize(".resizeTR", true, true, true, false, c, d, b);
        a.initResize(".resizeBR", true, true, true, true, c, d, b);
        a.initResize(".resizeLB", true, true, false, true, c, d, b);
        a.initMulSelect(c, b);
        a.initUnSelect(b)
    };
    this.initMulSelect = function (c, b) {
        $("[id='" + a.divId + "']").bind("mulSelect", function () {
            a.divId = $(this).attr("id");
            a.selected(b, true);
            if (c) {
                $(this).css("z-index", ++a.z)
            }
        })
    };
    this.initUnSelect = function (b) {
        $("[id='" + a.divId + "']").bind("unSelect", function () {
            a.divId = $(this).attr("id");
            a.unSelect(b)
        })
    };
    this.initDrag = function (c, d, b) {
        $("[id='" + a.divId + "']").children(".content").children(".textEditor").keydown(function (e) {
            e.stopPropagation()
        });
        $("[id='" + a.divId + "']").children(".content").mousedown(function (f) {
            a.divId = $(this).parent().attr("id");
            a.move = true;
            if (f.ctrlKey) {
                a.selected(b, true);
                $(document).mouseup(function () {
                    a.move = false
                });
                return
            }
            if ($(this).find("img").length > 0) {
                $(this).focus();
                a.clearEventBubble(f)
            }
            a.x = f.pageX - $(this).parent().position().left;
            a.y = f.pageY - $(this).parent().position().top;
            a.width = $(this).parent().width();
            a.height = $(this).parent().height();
            a.selected(b, false);
            if (c) {
                $(this).parent().css("z-index", ++a.z)
            }
            $(this).parent().fadeTo(20, 0.5);
            $(document).mousemove(function (j) {
                if (a.move) {
                    var n = j.pageX - a.x;
                    var l = j.pageY - a.y;
                    if (n + a.width > a.domWidth) {
                        n = a.domWidth - a.width
                    }
                    if (n < 0) {
                        n = 0
                    }
                    if ((l + a.height) > a.domHeight) {
                        l = a.domHeight - a.height
                    }
                    if (l < a.domHeight - a.editorHeight) {
                        l = a.domHeight - a.editorHeight
                    }
                    var g = $("[id='" + a.divId + "']");
                    var p = g.position().left;
                    var o = g.position().top;
                    for (var h = 0; h < a.selectedArray.length; h++) {
                        if (a.selectedArray[h] != a.divId) {
                            var m = $("[id='" + a.selectedArray[h] + "']").position().left;
                            var k = $("[id='" + a.selectedArray[h] + "']").position().top;
                            $("[id='" + a.selectedArray[h] + "']").css({
                                top: k + l - o,
                                left: m + n - p
                            })
                        }
                    }
                    g.css({
                        top: l,
                        left: n
                    })
                }
            }).mouseup(function () {
                a.move = false;
                var g = $("[id='" + a.divId + "']");
                if (!c) {
                    g.css("z-index", 0)
                }
                g.fadeTo("fast", 1);
                if (jQuery.isFunction(d)) {
                    var e = g.position().left.toFixed(5);
                    var h = g.position().top.toFixed(5);
                    d(e, h)
                }
                $(document).unbind("mousemove");
                $(document).unbind("mouseup")
            })
        })
    };
    // a.initResize(".resizeR", true, false, true, true, c, d, b);
    this.initResize = function (i, g, e, b, h, d, f, c) {
        $("[id='" + a.divId + "']").children(i).mousedown(function (j) {
            a.resize = true;
            a.divId = $(this).parent().attr("id");
            if (j.ctrlKey) {
                a.selected(c, true);
                $(document).mouseup(function () {
                    a.resize = false
                });
                return

            }
            a.width = $(this).parent().width();
            a.height = $(this).parent().height();
            a.disX = j.pageX;
            a.disY = j.pageY;
            a.x = j.pageX - $(this).parent().position().left;
            a.y = j.pageY - $(this).parent().position().top;
            a.selected(c, false);
            if (d) {
                $(this).parent().css("z-index", ++a.z)
            }
            $(document).mousemove(function (p) {
                if (a.resize) {
                    var l = p.pageX - a.disX;
                    var n = p.pageY - a.disY;
                    var m = $("[id='" + a.divId + "']");
                    if (d) {
                        m.css("z-index", ++a.z)
                    }
                    if (g) {
                        var o = b ? a.width + l : a.width - l;
                        if (b && p.pageX > a.domX + a.domWidth) {
                            o = a.width + a.domX + a.domWidth - a.disX
                        }
                        if (!b && p.pageX < a.x) {
                            o = a.width - (a.x - a.disX)
                        }
                        m.width(o)
                    }
                    if (e) {
                        var k = h ? a.height + n : a.height - n;
                        if (h && p.pageY > a.domY + a.domHeight - a.parentDom.parent().scrollTop()) {
                            k = a.height + a.domY + a.domHeight - a.disY - a.parentDom.parent().scrollTop()
                        }
                        if (!h && p.pageY < a.domHeight - a.editorHeight + a.y) {
                            k = a.height - (a.domHeight - a.editorHeight - a.disY + a.y)
                        }
                        m.height(k)
                    }
                    if (!b && p.pageX <= a.disX + a.width) {
                        if (p.pageX < a.x) {
                            m.css("left", 0)
                        } else {
                            m.css("left", p.pageX - a.x)
                        }
                    }
                    if (!h && p.pageY <= a.disY + a.height) {
                        if (p.pageY < a.domHeight - a.editorHeight + a.y) {
                            m.css("top", a.domHeight - a.editorHeight)
                        } else {
                            m.css("top", p.pageY - a.y)
                        }
                    }
                    if (m.find(".myCanvas").length > 0) {
                        a.drawEllipse(m, m.width().toFixed(5), m.height().toFixed(5), a.lineWidth, a.lineColor)
                    }
                }
            }).mouseup(function () {
                a.resize = false;
                var m = $("[id='" + a.divId + "']");
                if (!d) {
                    m.css("z-index", 0)
                }
                if (jQuery.isFunction(f)) {
                    var l = m.position().left.toFixed(3);
                    var o = m.position().top.toFixed(3);
                    var n = m.width().toFixed(3);
                    var k = m.height().toFixed(3);
                    f(l, o, n, k)
                }
                if (m.find(".myCanvas").length > 0) {
                    a.drawEllipse(m, m.width().toFixed(3), m.height().toFixed(3), a.lineWidth, a.lineColor)
                }
                $(document).unbind("mousemove");
                $(document).unbind("mouseup")
            })
        })
    };
    this.unSelect = function (b) {
        var d = $("[id='" + a.divId + "']");
        d.children(".resizeLT").css({
            border: "none",
            top: "0px",
            left: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        d.children(".resizeTR").css({
            border: "none",
            top: "0px",
            right: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        d.children(".resizeBR").css({
            border: "none",
            bottom: "0px",
            right: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        d.children(".resizeLB").css({
            border: "none",
            bottom: "0px",
            left: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        for (var c = 0; c < a.selectedArray.length; c++) {
            if (a.selectedArray[c] == a.divId) {
                a.selectedArray.splice(c, 1);
                break
            }
        }
        if (jQuery.isFunction(b)) {
            b(false)
        }
    };
    this.clearAllSelectCss = function () {
        $(".dragResizeDiv").css("box-shadow", "none");
        $(".resizeLT").css({
            border: "none",
            top: "0px",
            left: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        $(".resizeTR").css({
            border: "none",
            top: "0px",
            right: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        $(".resizeBR").css({
            border: "none",
            bottom: "0px",
            right: "0px",
            "background-color": "rgba(0,0,0,0)"
        });
        $(".resizeLB").css({
            border: "none",
            bottom: "0px",
            left: "0px",
            "background-color": "rgba(0,0,0,0)"
        })
    };
    this.selected = function (b, f) {
        var e = $("[id='" + a.divId + "']");
        var c = false;
        for (var d = 0; d < a.selectedArray.length; d++) {
            if (a.selectedArray[d] == a.divId) {
                c = true;
                f = true;
                break
            }
        }
        if (!c && !f) {
            a.selectedArray.length = 0
        }
        if (!c) {
            a.selectedArray.push(a.divId)
        }
        f = f != null ? f : false;
        if (!f) {
            a.clearAllSelectCss()
        }
        e.children(".resizeLT").css({
            border: "1px solid #3355cc",
            top: "-3px",
            left: "-3px",
            "background-color": "#FFF"
        });
        e.children(".resizeTR").css({
            border: "1px solid #3355cc",
            top: "-3px",
            right: "-3px",
            "background-color": "#FFF"
        });
        e.children(".resizeBR").css({
            border: "1px solid #3355cc",
            bottom: "-3px",
            right: "-3px",
            "background-color": "#FFF"
        });
        e.children(".resizeLB").css({
            border: "1px solid #3355cc",
            bottom: "-3px",
            left: "-3px",
            "background-color": "#FFF"
        });
        if (jQuery.isFunction(b)) {
            // b  selectedCallback
            b(true, f)
        }
    };
    this.initPageControl = function (b, c) {
        b.mousedown(function (k) {
            if ($("#selectDiv").length > 0 || a.move || a.resize) {
                return
            }
            $(this).focus();
            var j = k.pageX - a.domX + b.parent().scrollLeft();
            var h = k.pageY - a.domY + b.parent().scrollTop();
            var d = true;
            var n = [];
            for (var g = 0; g < a.allDiv.length; g++) {
                n.push(a.allDiv[g])
            }
            var f = $("<div id='selectDiv' style='position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:999999;filter:alpha(opacity:60);opacity:0.6;display:none;'></div>");
            b.append(f);
            f.css("left", j);
            f.css("top", h);
            a.clearAllSelectCss();
            a.selectedArray.length = 0;
            var m = null;
            var l = null;
            a.clearEventBubble(k);
            $(document).mousemove(function (v) {
                if (d) {
                    if (f.css("display") == "none") {
                        f.css("display", "")
                    }
                    m = v.pageX - a.domX + b.parent().scrollLeft();
                    l = v.pageY - a.domY + b.parent().scrollTop();
                    f.css("left", Math.min(m, j));
                    f.css("top", Math.min(l, h));
                    f.css("width", Math.abs(m - j));
                    f.css("height", Math.abs(l - h));
                    var q = f.offset().left,
                        x = f.offset().top;
                    var w = f[0].offsetWidth,
                        t = f[0].offsetHeight;
                    for (var u = 0; u < n.length; u++) {
                        var p = n[u];
                        var r = p[0].offsetWidth + p.offset().left;
                        var y = p[0].offsetHeight + p.offset().top;
                        if (r > q && y > x && p.offset().left < q + w && n[u].offset().top < x + t) {
                            var o = false;
                            for (var s = 0; s < a.selectedArray.length; s++) {
                                if (a.selectedArray[s] == p.attr("id")) {
                                    o = true;
                                    break
                                }
                            }
                            if (o) {
                                continue
                            }
                            p.trigger("mulSelect")
                        } else {
                            p.trigger("unSelect")
                        }
                    }
                }
                a.clearEventBubble(v)
            }).mouseup(function () {
                if (c) {
                    c(a.selectedArray.length == 0)
                }
                d = false;
                if (f) {
                    f.remove()
                }
                m = null, l = null, f = null, j = null, h = null;
                $(document).unbind("mousemove");
                $(document).unbind("mouseup")
            })
        })
    };
    this.clearEventBubble = function (b) {
        if (b.stopPropagation) {
            b.stopPropagation()
        } else {
            b.cancelBubble = true
        }
        if (b.preventDefault) {
            b.preventDefault()
        } else {
            b.returnValue = false
        }
    };
    this.remove = function (b) {
        $("[id='" + b + "']").remove()
    };
    this.refreshEditor = function (h, e, g) {
        var f = h.itemName;
        var l = h.itemContent;
        var d = $("[id='" + f + "']");
        if (l != null) {
            d.find(".textEditor").text(l)
        }
        if (e && e != "") {
            var k = e.split(";");
            for (var j = 0; j < k.length; j++) {
                var m = k[j].split(":");
                var c = m[0];
                var n = m[1];
                if (c && n) {
                    d.css(c, n)
                }
            }
        }
        if (g && g != "") {
            var b = g.split(";");
            for (var j = 0; j < b.length; j++) {
                var m = b[j].split(":");
                if (m[0] && m[1]) {
                    d.find(".textEditor").css(m[0], m[1])
                }
            }
        }
        if (h.itemClass == itemClassList.Ellipse) {
            d.css("width", h.itemWidth);
            d.css("height", h.itemHeight);
            d.css("left", h.itemLeft);
            d.css("top", h.itemTop);
            a.lineWidth = h.itemPenWidth;
            a.lineColor = h.itemFontColor;
            a.drawEllipse(d, h.itemWidth, h.itemHeight, h.itemPenWidth, h.itemFontColor)
        }
    };
    this.setEditorHeight = function (b) {
        a.editorHeight = b
    }
};