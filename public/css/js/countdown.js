////////////////////////////////////////////
//                                        //
//              Countdown                 //
//                 v4.3                   //
//             Mar. 12, 2014              //
//             www.gieson.com             //
//         Copyright Mike Gieson          //
//                                        //
////////////////////////////////////////////


// Usage:
// var test = new Countdown({time:15});

var CountdownImageFolder = "css/js/images/";
var CountdownImageBasename = "flipper";
var CountdownImageExt = "png";
var CountdownImagePhysicalWidth = 41;
var CountdownImagePhysicalHeight = 60;

var CountdownWidth = 200;
var CountdownHeight = 30;

var CountdownLabels = {
    second: "SECONDS",
    minute: "MINUTES",
    hour: "HOURS",
    day: "DAYS",
    month: "MONTHS",
    year: "YEARS"
};

var CountdownInterval = 76;


////////////////////////////////////////////
//                                        //
//                 jbeeb                  //
//         version 0.0.0.3 alpha          //
//             www.jbeeb.com              //
//          Copyright Mike Gieson         //
//                                        //
////////////////////////////////////////////

if (!Array.prototype.indexOf)Array.prototype.indexOf = function (c) {
    if (this == null)throw new TypeError;
    var b = Object(this), a = b.length >>> 0;
    if (a === 0)return -1;
    var i = 0;
    arguments.length > 1 && (i = Number(arguments[1]), i != i ? i = 0 : i != 0 && i != Infinity && i != -Infinity && (i = (i > 0 || -1) * Math.floor(Math.abs(i))));
    if (i >= a)return -1;
    for (i = i >= 0 ? i : Math.max(a - Math.abs(i), 0); i < a; i++)if (i in b && b[i] === c)return i;
    return -1
};
if (!Function.prototype.bind)Function.prototype.bind = function (c) {
    if (typeof this !== "function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var b = Array.prototype.slice.call(arguments, 1), a = this, i = function () {
    }, e = function () {
        return a.apply(this instanceof i && c ? this : c, b.concat(Array.prototype.slice.call(arguments)))
    };
    i.prototype = this.prototype;
    e.prototype = new i;
    return e
};
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function () {
    }, b = Object.prototype.toString, a = String.prototype.trim;
    c.link = function (a, b, d) {
        var d = d || {}, b = b || "_blank", f = [], c;
        for (c in d)c = c.toLowerCase(), c == "width" || c == "height" || c == "left" ? f.push(c + "=" + d[c]) : (c == "location" || c == "menubar" || c == "resizable" || c == "scrollbars" || c == "status" || c == "titlebar" || c == "toolbar") && f.push(c + "=1");
        d = null;
        f.length > 0 && (d = f.join(","));
        window.open(a, b, d)
    };
    c.isArray = function (a) {
        return Array.isArray ? Array.isArray(a) : b.call(a) === "[object Array]"
    };
    c.isEmpty = function (a) {
        var b = typeof a;
        if (b == "undefined")return true;
        if (a === null)return true; else if (b == "object") {
            if (a == {} || a == [])return true;
            var b = true, d;
            for (d in a)if (!c.isEmpty(a[d])) {
                b = false;
                break
            }
            return b
        } else return b == "string" && a == "" ? true : false
    };
    c.isNumber = function (a) {
        return b.call(a) === "[object Number]" && isFinite(a)
    };
    c.isInteger = function (a) {
        return parseFloat(a) == parseInt(a) && !isNaN(a) && isFinite(a)
    };
    c.isString = function (a) {
        return b.call(a) === "[object String]"
    };
    c.isNull = function (a) {
        return a === "" || a === null || a === void 0 || typeof a == "undefined" || a == "undefined" || a == "null" ? true : false
    };
    c.clone = function (a) {
        if (a === null || typeof a != "object")return a;
        if (a.init)return a; else {
            var b = a.constructor;
            if (b) {
                var d = new b, f;
                for (f in a)d[f] = c.clone(a[f])
            }
        }
        return d
    };
    c.sortOn = function (a, b) {
        if (!b || !a)return a;
        a.sort(function (a, i) {
            return a[b] < i[b] ? -1 : a[b] > i[b] ? 1 : 0
        })
    };
    c.arrayShuffle = function (a) {
        if (a) {
            for (var b = a.length, d, f; b;)f = Math.floor(Math.random() * b--), d = a[b], a[b] = a[f], a[f] = d;
            return a
        } else return []
    };
    c.arrayMove = function (a, b, d) {
        a.splice(d, 0, a.splice(b, 1)[0])
    };
    c.arrayInsertAt = function (a, b, d) {
        Array.prototype.splice.apply(a, [b, 0].concat(d));
        return a
    };
    c.rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    c.trim = a && !a.call("\ufeff\u00a0") ? function (i) {
        return i == null ? "" : a.call(i)
    } : function (a) {
        return a == null ? "" : (a + "").replace(c.rtrim, "")
    };
    c.alphanumeric = function (a, b) {
        return b ? a.replace(/[^A-Za-z0-9]/g, "") : a.replace(/[^A-Za-z0-9_\-\.]/g, "")
    };
    c.parseJSON = function (a) {
        if (typeof a != "string")return null;
        try {
            return JSON.parse(a)
        } catch (b) {
            return a || null
        }
    };
    c.hexToRgb = function (a) {
        return !a ? "" : (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)] : [0, 0, 0]
    };
    c.makeColor = function (a, b) {
        if (!a)return "";
        var d = c.hexToRgb(a);
        return c.isNumber(b) && jbeeb.Browser.rgba ? (b > 1 && (b /= 100), "rgba(" + d.join(",") + ("," + b) + ")") : a
    };
    c.getXYWH = function (a) {
        var b = 0, d = 0, f = 0, c = 0;
        if (a) {
            for (var f = a.offsetWidth, c = a.offsetHeight, g = jbeeb.Browser.touch; a && !isNaN(a.offsetLeft) && !isNaN(a.offsetTop);)g ? (b += (a.offsetLeft || 0) - (a.scrollLeft || 0), d += (a.offsetTop || 0) - (a.scrollTop || 0)) : (b += a.offsetLeft || 0, d += a.offsetTop || 0), a = a.offsetParent;
            g && (a = window.scrollY != null ? window.scrollY : window.pageYOffset, b += window.scrollX != null ? window.scrollX : window.pageXOffset, d += a)
        }
        return {x: b, y: d, w: f, h: c, xMax: b + f, yMax: d + c}
    };
    c.getWindowSize = function () {
        var a = window, b = document, d = b.documentElement, b = b.getElementsByTagName("body")[0];
        return {w: a.innerWidth || d.clientWidth || b.clientWidth, h: a.innerHeight || d.clientHeight || b.clientHeight}
    };
    c.contains = function (a, b) {
        var d = {}, f = {x: a.x, y: a.y, w: a.width, h: a.height}, c = {x: b.x, y: b.y, w: b.width, h: b.height};
        f.xMax = f.x + f.w;
        f.yMax = f.y + f.h;
        c.xMax = c.x + c.w;
        c.yMax = c.y + c.h;
        for (var g in f)d[g] = f[g] >= c[g] ? true : false;
        return !d.x && !d.y && d.xMax && d.yMax ? true : false
    };
    c.getTimestamp = function () {
        var a = new Date;
        return Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()).valueOf()
    };
    c.bindEvent = function (a, b, d) {
        a.attachEvent ? a.attachEvent("on" + b, d) : a.addEventListener && a.addEventListener(b, d, false)
    };
    c.unbindEvent = function (a, b, d) {
        a.attachEvent ? a.detachEvent("on" + b, d) : a.addEventListener && a.removeEventListener(b, d, false)
    };
    c.getAttributes = function (a) {
        var b = {};
        if (a = a.attributes) {
            for (var d = a.length, c = 0; c < d; c++)jbeeb.Browser.ie ? a[c].specified && (b[a[c].nodeName] = a[c].nodeValue.toString()) : b[a[c].nodeName] = a[c].value ? a[c].value.toString() : a[c].nodeValue.toString();
            return b
        } else return {}
    };
    jbeeb.Utils = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function () {
        this.initialize()
    }, b = c.prototype;
    c.initialize = function (a) {
        a.addEventListener = b.addEventListener;
        a.removeEventListener = b.removeEventListener;
        a.removeAllEventListeners = b.removeAllEventListeners;
        a.hasEventListener = b.hasEventListener;
        a.dispatchEvent = b.dispatchEvent
    };
    b.ap = null;
    b.initialize = function () {
    };
    b.addEventListener = function (a, b, e, d) {
        var c = this.ap;
        c ? this.removeEventListener(a, b, e) : c = this.ap = {};
        var h = c[a];
        h || (h = c[a] = []);
        h.push({fn: b, arg: d, scope: e});
        return b
    };
    b.removeEventListener = function (a, b, e) {
        var d = this.ap;
        if (d && (a = d[a]))for (d = a.length; d--;) {
            var c = a[d];
            c.scope == e && c.fn == b && a.splice(d, 1)
        }
    };
    b.removeAllEventListeners = function (a) {
        a ? this.ap && delete this.ap[a] : this.ap = null
    };
    b.dispatchEvent = function (a) {
        var b = this.ap;
        if (a && b && (b = b[a])) {
            var e = [].slice.call(arguments);
            e.splice(0, 1);
            for (var d = 0; d < b.length; d++) {
                var c = b[d];
                if (c.fn) {
                    var h = e, g = c.arg;
                    typeof g !== "undefined" && h.push(g);
                    h.length ? c.scope ? c.fn.apply(c.scope, h) : c.fn.apply(null, h) : c.scope ? c.fn.call(c.scope) : c.fn()
                }
            }
        }
    };
    b.hasEventListener = function (a) {
        var b = this.ap;
        return !(!b || !b[a])
    };
    b.toString = function () {
        return "[EventDispatcher]"
    };
    if (!jbeeb.EventDispatcher)jbeeb.EventDispatcher = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c;
    if (!jbeeb.ready)jbeeb.ready = function () {
        var b, a, i = [], e, d = document, c = d.documentElement, h = c.doScroll, g = (h ? /^loaded|^c/ : /^loaded|c/).test(d.readyState);
        a = function (b) {
            try {
                b = d.getElementsByTagName("body")[0].appendChild(d.createElement("span")), b.parentNode.removeChild(b)
            } catch (e) {
                return setTimeout(function () {
                    a()
                }, 50)
            }
            for (g = 1; b = i.shift();)b()
        };
        d.addEventListener && (e = function () {
            d.removeEventListener("DOMContentLoaded", e, false);
            a()
        }, d.addEventListener("DOMContentLoaded", e, false), b = function (a) {
            g ? a() : i.push(a)
        });
        h && (e = function () {
            /^c/.test(d.readyState) && (d.detachEvent("onreadystatechange", e), a())
        }, d.attachEvent("onreadystatechange", e), b = function (a) {
            if (self != top)g ? a() : i.push(a); else {
                try {
                    c.doScroll("left")
                } catch (e) {
                    return setTimeout(function () {
                        b(a)
                    }, 50)
                }
                a()
            }
        });
        return b
    }()
})();
this.jbeeb = this.jbeeb || {};
(function () {
    function c() {
        return a && a.call(performance) || (new Date).getTime()
    }

    var b = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, a = window.performance && (performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow), i = function (a) {
        this.init(a);
        return this
    }, e = i.prototype;
    e.addEventListener = null;
    e.removeEventListener = null;
    e.removeAllEventListeners = null;
    e.dispatchEvent = null;
    e.hasEventListener = null;
    jbeeb.EventDispatcher.initialize(e);
    e.L = 50;
    e.aR = 0;
    e.bo = null;
    e.aF = null;
    e.bN = null;
    e.ag = false;
    e.state = 0;
    e.init = function (a) {
        a.fps ? (this.ag = a.animation && b || false, this.L = 1E3 / (a.fps || 60)) : this.L = a.interval || 50;
        a.startNow && this.start()
    };
    e.stop = function () {
        this.state = 0;
        this.bK(this.cZ)
    };
    e.getInterval = function () {
        return this.L
    };
    e.setInterval = function (a) {
        this.L = a
    };
    e.start = function () {
        if (!this.state)this.state = 1, this.bo = [], this.bo.push(this.aR = c()), this.ag ? this.bK(this.cW) : this.bK(this.af), this.bw()
    };
    e.getFPS = function () {
        var a = this.bo.length - 1;
        return a < 2 ? this.L : 1E3 / ((this.bo[0] - this.bo[a]) / a)
    };
    e.cW = function () {
        this.aF = null;
        this.bw();
        c() - this.aR >= (this.L - 1) * 0.97 && this.aU()
    };
    e.af = function () {
        this.aF = null;
        this.bw();
        this.aU()
    };
    e.cZ = function () {
        this.aF = null
    };
    e.bw = function () {
        if (this.aF == null)this.ag ? (b(this.bN), this.aF = true) : (this.aF && clearTimeout(this.aF), this.aF = setTimeout(this.bN, this.L))
    };
    e.bK = function (a) {
        this.bN = a.bind(this)
    };
    e.aU = function () {
        var a = c(), b = a - this.aR;
        this.aR = a;
        this.dispatchEvent("tick", {delta: b, time: a});
        for (this.bo.unshift(a); this.bo.length > 100;)this.bo.pop()
    };
    e.toString = function () {
        return "[Ticker]"
    };
    if (!jbeeb.Ticker)jbeeb.Ticker = i
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c, b;
    if (!jbeeb.Browser) {
        var a = {ie: null, ios: null, mac: null, webkit: null, oldWebkit: false, flash: 0, touch: false};
        c = navigator.userAgent;
        c = c.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(c) || /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || c.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c) || [];
        c = b[1] || "";
        b = b[2] || "0";
        a.version = parseFloat(b);
        a.agent = c;
        b = false;
        c == "chrome" ? b = true : c == "webkit" && (b = true);
        a.webkit = b;
        a.chrome = /chrome/.test(c) || /chromium/.test(c);
        a.moz = /mozilla/.test(c);
        a.opera = /opera/.test(c);
        a.safari = /webkit/.test(c);
        a.ie = /msie/.test(c) && !/opera/.test(c);
        a.android = /android/.test(c);
        b = navigator.platform.toLowerCase();
        a.platform = b;
        a.ios = /iphone/.test(b) || /ipod/.test(b) || /ipad/.test(b);
        a.win = a.windows = b ? /win/.test(b) : /win/.test(c);
        a.mac = b ? /mac/.test(b) : /mac/.test(c);
        a.cssPrefix = "";
        if (a.chrome || a.safari)if (a.cssPrefix = "webkit", a.chrome && a.version < 10)a.oldWebkit = true; else {
            if (a.safari && a.version < 5.1)a.oldWebkit = true
        } else if (a.opera)a.cssPrefix = "o"; else if (a.moz)a.cssPrefix = "moz"; else if (a.ie && a.version > 8)a.cssPrefix = "ms";
        if (a.chrome || a.ios || a.android)a.flash = 0;
        c = false;
        b = "Webkit Moz O ms Khtml".split(" ");
        var i = "", i = document.createElement("div");
        i.style.animationName && (c = true);
        if (c === false)for (var e = 0; e < b.length; e++)if (i.style[b[e] + "AnimationName"] !== void 0) {
            i = b[e];
            i.toLowerCase();
            c = true;
            break
        }
        a.animation = c;
        a.modern = false;
        if (a.moz && a.version > 3)a.modern = true;
        if (a.opera && a.version > 9)a.modern = true;
        if (a.ie && a.version > 9)a.modern = true;
        if (a.chrome || a.safari || a.ios || a.android)a.modern = true;
        a.rgba = true;
        a.quirks = document.compatMode == "CSS1Compat" ? false : true;
        if (a.ie)if (a.version < 9)a.rgba = false; else {
            if (a.quirks)a.rgba = false, a.version = 8, a.modern = false
        } else if (a.moz && a.version < 3)a.rgba = false; else if (a.safari && a.version < 3)a.rgba = false; else if (a.opera && a.version < 10)a.rgba = false;
        a.touch = typeof window.ontouchstart === "undefined" ? false : true;
        jbeeb.Browser = a
    }
})();
this.jbeeb = this.jbeeb || {};
(function () {
    jbeeb.PathInfo = function () {
        function c(a, b) {
            var i, k, o, p, v, z, n, l, q, t, r, x, s, y, a = a || "";
            k = a.replace(/\\/g, "/");
            k.match(/:\//) || (l = "", l = b ? d : f, l = c(l, false), k.substr(0, 1) == "/" ? k = l.host + (e ? "" : "/") + k : k.substr(0, 3) == "../" ? (l = l.parenturl.split("/"), k = k.split("../"), o = k.pop(), l.splice(l.length - k.length, k.length, o), k = l.join("/")) : k = l.pathurl + (e ? "" : "/") + k);
            k.substr(-1) == "/" && (k = k.substr(0, k.length - 1));
            i = k.split("://");
            k = i.shift();
            l = (i.shift() || "").replace("//", "/");
            l = l.split("/");
            o = l.shift() || "";
            o.indexOf("@") > -1 && (i = o.split("@"), s = i[0].split(":"), x = s[0], s = s[1], o = i[1]);
            o.indexOf(":") > -1 && (i = o.split(":"), p = i[1], o = i[0]);
            l = l.join("/");
            l.indexOf("#") != -1 && (i = l.split("#"), r = i[1], l = i[0]);
            l.indexOf("?") != -1 && (i = l.split("?"), t = i[1], l = i[0]);
            i = l.split("/");
            n = i.pop();
            l = i.join("/");
            n == ".." && (n = "");
            i = n.split(".");
            i.length > 1 && (z = i.pop().toLowerCase(), v = i.join("."));
            y = k + "://" + o + (p ? ":" + p : "");
            l = "/" + l + (l.length > 0 ? "/" : "");
            q = y + l;
            i = y + l + n + (t ? "?" + t : "") + (r ? "#" + r : "");
            var m = l, u = q;
            z ? (l += n, q += n) : (l += n + (n != "" ? "/" : ""), q += n + (n != "" ? "/" : ""), v = n, !t && !r && i.substr(-1) != "/" && (i += "/"));
            e === false && (m.substr(-1) == "/" && (m = m.substr(0, m.length - 1)), u.substr(-1) == "/" && (u = u.substr(0, u.length - 1)), z || (l.substr(-1) == "/" && (l = l.substr(0, l.length - 1)), q.substr(-1) == "/" && (q = q.substr(0, q.length - 1)), i.substr(-1) == "/" && (i = i.substr(0, i.length - 1))));
            return {
                source: a || null,
                url: i || null,
                protocol: k || null,
                domain: o || null,
                port: p || null,
                basename: v || null,
                ext: z || null,
                filename: n || null,
                path: l || null,
                pathurl: q || null,
                parent: m || null,
                parenturl: u || null,
                query: t || null,
                fragment: r || null,
                username: x || null,
                password: s || null,
                host: y || null
            }
        }

        function b(a) {
            return (a || "").split("?")[0].split("/").pop()
        }

        function a(a) {
            a = a.split("/");
            a.pop();
            return a.join("/").toString() + (a.length > 0 ? "/" : "")
        }

        function i(b) {
            var i = document.getElementsByTagName("script");
            return (i = i[i.length - 1].getAttribute("src")) ? b ? i.split("?")[0] : a(i.split("?")[0]) : ""
        }

        var e = true, d = i(), f = a(window.location.href);
        return {
            parse: c, filename: b, basename: function (a) {
                a = b(a).split(".");
                a.pop();
                return a.join(".")
            }, basepath: a, scriptPath: d, getScriptPath: i, pagePath: f, ext: function (a) {
                return (a || "").split("?")[0].split("/").pop().split(".").pop().toLowerCase()
            }
        }
    }()
})();
this.jbeeb = this.jbeeb || {};
(function () {
    if (!jbeeb.Base)jbeeb.amReady = false, jbeeb.ticker = null, jbeeb.tickerInterval = 80, jbeeb.scriptPath = null, jbeeb.pagePath = "", jbeeb.assetsBasePath = "", jbeeb.focus = null, jbeeb.binit = 0;
    jbeeb.unfocus = function () {
        if (jbeeb.focus) {
            var b = jbeeb.focus;
            b.element && b.element.blur();
            jbeeb.focus = null
        }
    };
    var c = function () {
    };
    c.bO = 0;
    c.dw = [];
    c.R = [];
    c.scriptPath = null;
    c.dh = function () {
        return "jbeeb_" + c.bO++
    };
    c.dA = function (b) {
        c.R.push(b);
        jbeeb.amReady && c.aG()
    };
    c.aG = function () {
        var b = c.R.length;
        if (b > 0)for (; b--;) {
            var a = c.R.splice(b, 1)[0];
            a && a.init && a.init.call(a)
        }
    };
    c.init = function () {
        if (!jbeeb.amReady) {
            jbeeb.ticker = new jbeeb.Ticker({interval: jbeeb.tickerInterval, startNow: 1});
            if (!jbeeb.assetsBasePath)jbeeb.assetsBasePath = "";
            if (window.location.href.substr(0, 4) != "http") {
                if (!jbeeb.pagePath)jbeeb.pagePath = "";
                if (!jbeeb.scriptPath)jbeeb.scriptPath = ""
            } else {
                if (!jbeeb.pagePath)jbeeb.pagePath = jbeeb.PathInfo.pagePath;
                if (!jbeeb.scriptPath)jbeeb.scriptPath = jbeeb.PathInfo.scriptPath
            }
            jbeeb.FlashDetect && jbeeb.FlashDetect.run();
            jbeeb.amReady = true;
            c.aG()
        }
    };
    if (!jbeeb.Base)jbeeb.Base = c, jbeeb.register = c.dA, jbeeb.getUID = c.dh
})();
if (!jbeeb.binit)jbeeb.binit = 1, jbeeb.ready(function () {
    jbeeb.Base.init()
});
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function (a) {
        this.init(a)
    }, b = c.prototype;
    b.addEventListener = null;
    b.removeEventListener = null;
    b.removeAllEventListeners = null;
    b.dispatchEvent = null;
    b.hasEventListener = null;
    jbeeb.EventDispatcher.initialize(b);
    b.amStage = null;
    b.element = null;
    b.style = null;
    b.K = null;
    b.alpha = 1;
    b.id = null;
    b.name = null;
    b.parent = null;
    b.stage = null;
    b.rotation = 0;
    b.scale = 1;
    b.scaleX = 1;
    b.scaleY = 1;
    b.stretchX = 1;
    b.stretchY = 1;
    b.skewX = 0;
    b.skewY = 0;
    b.origin = null;
    b.originX = 0;
    b.originY = 0;
    b.originType = "px";
    b.shadow = null;
    b.bevel = null;
    b.outline = null;
    b.inset = null;
    b.visible = true;
    b.overflow = "visible";
    b.autoCenter = null;
    b.x = 0;
    b.y = 0;
    b.width = 0;
    b.height = 0;
    b.flex = "wh";
    b.aA = 1;
    b.aj = 1;
    b.pin = null;
    b.bD = null;
    b.ah = null;
    b.z = 0;
    b.temp = null;
    b.rounded = null;
    b.fill = null;
    b.stroke = null;
    b.image = null;
    b.gradient = null;
    b.bB = null;
    b.init = function (a) {
        this.temp = {};
        this.style = null;
        this.alpha = 1;
        this.parent = this.name = this.id = null;
        this.rotation = 0;
        this.scaleY = this.scaleX = this.scale = 1;
        this.skewY = this.skewX = 0;
        this.visible = true;
        this.overflow = "visible";
        this.height = this.width = this.y = this.x = 0;
        this.flex = "wh";
        this.aj = this.aA = 1;
        this.ah = this.bD = this.pin = null;
        this.z = 0;
        this.autoCenter = null;
        this.stroke = {};
        this.fill = {};
        this.inset = this.shadow = null;
        this.gradient = {};
        this.rounded = null;
        this.K = jbeeb.storeCSS ? {} : null;
        var a = a || {}, b = jbeeb.getUID();
        this.id = b;
        if (a.element)this.element = a.element; else if (this.element = document.createElement("div"), this.element.id = b, this.element.style.position = "absolute", this.element.style.overflow = "visible", this.K)this.K.position = "absolute", this.K.overflow = "visible";
        if (a.standalone)this.amStage = 1;
        this.bB = a.inline ? "inline-block" : "block";
        if (a.name)this.name = a.name;
        this.element.id = this.type + "_" + this.element.id;
        b = this.style = this.element.style;
        b.padding = "0px";
        b.margin = "0px";
        b.border = "0px";
        b.fontSize = "100%";
        b.verticalAlign = "baseline";
        b.outline = "0px";
        b.background = "transparent";
        b.WebkitTextSizeAdjust = "100%";
        b.msTextSizeAdjust = "100%";
        b.WebkitBoxSizing = b.MozBoxSizing = b.boxSizing = "padding-box";
        b.backgroundClip = "padding-box";
        if (this.K)b = this.K, b.padding = "0px", b.margin = "0px", b.border = "0px", b.fontSize = "100%", b.verticalAlign = "baseline", b.outline = "0px", b.background = "transparent", b.WebkitTextSizeAdjust = "100%", b.msTextSizeAdjust = "100%", b.boxSizing = "padding-box", b.backgroundClip = "padding-box";
        a.editable || this.setSelectable(false);
        this.setCursor("inherit");
        if (a)this.autoCenter = a.center, typeof a.flex != "undefined" && this.setFlex(a.flex), typeof a.pin != "undefined" && this.setPin(a.pin), typeof a.overflow != "undefined" && this.setOverflow(a.pin);
        this.setOrigin(0, 0, "px");
        this.applySkin(a, false)
    };
    b.setSelectable = function (a) {
        var b = this.style, e = "none", d = "-moz-none";
        a && (d = e = "text");
        b.userSelect = b.WebkitUserSelect = b.MozUserSelect = b.OUserSelect = e;
        b.MozUserSelect = d;
        if (this.K)this.K.userSelect = e, this.K.MozUserSelect = d
    };
    b.setBorderRender = function (a) {
        var b = this.style, a = a == "outside" ? "content-box" : "border-box";
        b.WebkitBoxSizing = b.MozBoxSizing = b.boxSizing = a;
        if (this.K)this.K.boxSizing = a
    };
    b.applySkin = function (a, b) {
        this.stroke = {};
        this.fill = {};
        this.gradient = null;
        this.rounded = 0;
        this.inset = this.outline = this.bevel = this.shadow = this.image = null;
        if (!(b == true && b)) {
            var e = jbeeb.Utils.isNumber(a.x) ? a.x : 0, d = jbeeb.Utils.isNumber(a.y) ? a.y : 0;
            this.setXY(e, d);
            a.height && this.setHeight(a.height);
            a.width && this.setWidth(a.width);
            a.h && this.setHeight(a.h);
            a.w && this.setWidth(a.w)
        }
        this.setRounded(a.rounded);
        var e = a.fill, c, h;
        if (e)typeof e == "string" ? (c = e, h = 1) : (c = e.color, h = e.alpha);
        this.setFill(c, h);
        var e = a.stroke, g = d = h = c = null;
        e && (typeof e == "string" ? (c = e, d = h = 1, g = "solid") : e.color != null && (c = e.color || "#000000", h = jbeeb.Utils.isNumber(e.alpha) ? e.alpha : 1, d = e.weight || 1, g = e.style || "solid"));
        this.setStroke(d, c, h, g);
        this.setStrokeStyle(g);
        var e = a.image, j, k;
        if (a.image)typeof e == "string" ? (j = e, k = null) : (j = e.url, k = e.mode);
        this.setImage(j, k);
        this.setShadow(a.shadow);
        this.setBevel(a.bevel);
        this.setOutline(a.outline);
        this.setInset(a.inset)
    };
    b.bM = function () {
        var a = this.style;
        if (a) {
            var b = "", e = "", d = "", c = "", h = "", g = 0, j = this.fill;
            j && (jbeeb.Utils.isArray(j.color) ? g = 1 : j.color && (e = jbeeb.Utils.makeColor(j.color, j.alpha)));
            if (this.image && this.image.url) {
                b = 'url("' + this.image.url + '")';
                g = this.image.mode || "center";
                if (g != "pattern") {
                    if (g == "fit")d = "100% 100%"; else if (g == "contain" || g == "cover")d = "contain";
                    c = "no-repeat";
                    h = "center center"
                }
                g = 0
            }
            if (g) {
                g = j.color;
                if (this.K)this.K.gradient = 1;
                for (var j = j.alpha || "v", k = jbeeb.Browser, o = [], p = [], v = g.length, z = k.oldWebkit, n = 0; n < v; n += 3) {
                    var l = jbeeb.Utils.makeColor(g[n], g[n + 1]), q = g[n + 2];
                    q > 100 ? q = 100 : q < 0 && (q = 0);
                    z ? p.push("color-stop(" + q + "%, " + l + ")") : o.push(l + " " + q + "%")
                }
                if (k.modern)b = k.cssPrefix, b == "" ? (b = "linear-", j = (j == "v" ? "to bottom, " : "to right, ") + o.join(",")) : b == "webkit" && z ? (g = p.join(","), b = "-webkit-", j = j == "v" ? "linear, left top, left bottom, " + g : "linear, left top, right top, " + g) : (b = "-" + b + "-linear-", j = (j == "v" ? "top, " : "left, ") + o.join(",")), b = b + "gradient(" + j + ")"; else if (k.ie && k.version < 9) {
                    if (j = "progid:DXImageTransform.Microsoft.gradient( gradientType=" + (j == "v" ? "0" : "1") + ", startColorstr='" + g[0] + "', endColorstr='" + g[g.length - 3] + "')", this.style.filter = j, this.style.msFilter = '"' + j + '"', this.K)g = this.K, g.filter = j, g.msFilter = '"' + j + '"'
                } else {
                    b = "";
                    for (n = 0; n < v; n += 3)jbeeb.Utils.makeColor(g[n], g[n + 1]), b += '<stop offset="' + g[n + 2] + '%" stop-color="' + g[n] + '" stop-opacity="' + g[n + 1] + '"/>';
                    g = "0";
                    o = "100";
                    j == "h" && (g = "100", o = "0");
                    j = "jbeeb-grad-" + this.id;
                    p = "";
                    p += '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none">';
                    p += '  <linearGradient id="' + j + '" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="' + g + '%" y2="' + o + '%">';
                    p += b;
                    p += "  </linearGradient>";
                    p += '  <rect x="0" y="0" width="1" height="1" fill="url(#' + j + ')" />';
                    p += "</svg>";
                    b = 'url("data:image/svg+xml;base64,' + jbeeb.Base64.encode(p) + '")'
                }
            } else if (this.K)this.K.gradient = 0;
            a.backgroundColor = e || "";
            a.backgroundImage = b || "none";
            a.backgroundSize = d || "";
            a.backgroundRepeat = c || "";
            a.backgroundPosition = h || "";
            if (this.K)g = this.K, g.backgroundColor = e || "", g.backgroundImage = b || "none", g.backgroundSize = d || "", g.backgroundRepeat = c || "", g.backgroundPosition = h || ""
        }
    };
    b.setFill = function (a, b) {
        if (!this.fill)this.fill = {};
        this.fill.color = a;
        this.fill.alpha = b;
        this.bM()
    };
    b.setImage = function (a, b) {
        if (a) {
            if (!this.image)this.image = {};
            this.image.url = a;
            this.image.mode = b
        } else this.image = null;
        this.bM()
    };
    b.setImageSizing = function (a) {
        if (this.image)this.image.mode = a, this.bM()
    };
    b.setStroke = function (a, b, e, d) {
        if (!this.stroke)this.stroke = {};
        typeof a == "string" && (b = a, a = 1);
        a > 0 && (a = Math.round(a));
        var c = e || 1, d = d || "solid";
        b == null && (d = c = a = null);
        e = this.stroke;
        e.weight = a;
        e.color = b;
        e.alpha = c;
        e.style = d;
        var h = this.style;
        a ? (e = a + "px", b = jbeeb.Utils.makeColor(b, c), c = -a + "px", a = -a + "px") : a = c = b = e = d = "";
        h.borderStyle = d;
        h.borderWidth = e;
        h.borderColor = b;
        h.marginLeft = c;
        h.marginTop = a;
        if (this.K)h = this.K, h.borderStyle = d, h.borderWidth = e, h.borderColor = b, h.marginLeft = c, h.marginTop = a;
        this.al()
    };
    b.setStrokeStyle = function (a) {
        a = a || "";
        this.style.borderStyle = a;
        if (this.K)this.K.borderStyle = a
    };
    b.setCursor = function (a) {
        this.style.cursor = a;
        if (this.K)this.K.cursor = a
    };
    b.setWidth = function (a) {
        var b = this.style;
        if (b && a > 0 && (this.width = a, b.width = a + "px", this.autoCenter && this.center(this.autoCenter), this.rounded && this.al(), this.K))this.K.width = a + "px"
    };
    b.setHeight = function (a) {
        var b = this.style;
        if (b && a > 0 && (this.height = a, b.height = a + "px", this.autoCenter && this.center(this.autoCenter), this.rounded && this.al(), this.K))this.K.height = a + "px"
    };
    b.measure = function () {
        var a = this.element, b = a.clientWidth, a = a.clientHeight;
        this.width = b;
        this.height = a;
        return [b, a]
    };
    b.setSize = function (a, b) {
        var e = this.style;
        if (e && a > 0 && b > 0 && (this.width = a, this.height = b, e.width = a + "px", e.height = b + "px", this.autoCenter && this.center(this.autoCenter), this.rounded && this.al(), this.K))this.K.width = a + "px", this.K.height = b + "px"
    };
    b.setXY = function (a, b) {
        this.x = a;
        this.y = b;
        var e = this.style;
        e.left = a + "px";
        e.top = b + "px";
        if (this.K)this.K.left = a + "px", this.K.top = b + "px"
    };
    b.setBaseXY = function (a, b) {
        this.setXY(a, b);
        this.cQ = a;
        this.cL = b
    };
    b.setXYWH = function (a, b, e, d) {
        this.width = e;
        this.height = d;
        this.x = a;
        this.y = b;
        var c = this.style;
        c.width = (e || 0) + "px";
        c.height = (d || 0) + "px";
        c.left = (a || 0) + "px";
        c.top = (b || 0) + "px";
        if (this.K)c = this.K, c.width = (e || 0) + "px", c.height = (d || 0) + "px", c.left = (a || 0) + "px", c.top = (b || 0) + "px"
    };
    b.setX = function (a) {
        this.x = a;
        this.style.left = (a || 0) + "px";
        if (this.K)this.K.left = (a || 0) + "px"
    };
    b.setY = function (a) {
        this.y = a;
        this.style.top = (a || 0) + "px";
        if (this.K)this.K.top = (a || 0) + "px"
    };
    b.setTop = function (a) {
        this.y = a;
        this.style.top = a + "px";
        if (this.K)this.K.top = (a || 0) + "px"
    };
    b.setBottom = function (a) {
        this.y = a - this.height;
        this.style.bottom = a + "px";
        if (this.K)this.K.bottom = (a || 0) + "px"
    };
    b.setLeft = function (a) {
        this.x = a;
        this.style.left = (a || 0) + "px";
        if (this.K)this.K.left = (a || 0) + "px"
    };
    b.setRight = function (a) {
        this.x = a = (a || 0) - this.width;
        this.style.right = a + "px";
        if (this.K)this.K.right = a + "px"
    };
    b.setZ = function (a) {
        a < 0 && (a = 0);
        this.z = a;
        var b = this.style;
        if (!b)this.style = b = this.element.style;
        b.zIndex = a;
        if (this.K)this.K.zIndex = a
    };
    b.setScale = function (a) {
        this.scaleY = this.scaleX = this.scale = a;
        this.bx("scale(" + a + "," + a + ")")
    };
    b.setScaleX = function (a) {
        this.scaleX = a;
        this.bx("scale(" + this.scaleX + "," + a + ")")
    };
    b.setScaleY = function (a) {
        this.scaleY = a;
        this.bx("scale(" + a + "," + this.scaleY + ")")
    };
    b.stretch = function (a, b) {
        this.stretchX = a;
        this.stretchY = b;
        if (a > 0 && b > 0) {
            this.aA && this.setWidth(this.width * a);
            this.aj && this.setHeight(this.height * b);
            var e = this.x, c = this.y;
            if (this.bD) {
                if (this.bD == "r" && this.parent) {
                    if (this.aP == null)this.aP = this.parent.width - this.x;
                    e = this.parent.width - this.aP;
                    this.setX(e)
                }
            } else if (this.originX) {
                var f = this.originX;
                this.setX(f + (e - f) * a)
            } else this.setX(e * a);
            if (this.ah) {
                if (this.ah == "b" && this.parent) {
                    if (this.aa == null)this.aa = this.parent.height - this.y;
                    e = this.parent.height - this.aa;
                    this.setY(e)
                }
            } else this.originY ? (f = this.originY, this.setY(f + (c - f) * b)) : this.setY(c * b)
        }
        this.dispatchEvent("stretch", this.width, this.height)
    };
    b.aP = null;
    b.aa = null;
    b.setPin = function (a) {
        this.pin = a;
        this.ah = this.bD = 0;
        if (a) {
            a = a.toLowerCase();
            if (a.match(/r/))this.bD = "r";
            if (a.match(/l/))this.bD = "l";
            if (a.match(/t/))this.ah = "t";
            if (a.match(/b/))this.ah = "b";
            if (a.match(/s/))this.ah = this.bD = "s"
        }
    };
    b.setFlex = function (a) {
        this.aj = this.aA = 0;
        if (a)a.toLowerCase(), this.aA = a.match(/w/) ? 1 : 0, this.aj = a.match(/h/) ? 1 : 0;
        this.flex = a
    };
    b.setRotation = function (a) {
        this.rotation = a;
        this.bx("rotate(" + a + "deg)")
    };
    b.setSkew = function (a, b) {
        this.skewX = a;
        this.skewY = b;
        this.bx("skew(" + a + "deg," + b + "deg)")
    };
    b.setOrigin = function (a, b, e) {
        this.originX = a;
        this.originY = b;
        e = (this.originType = e) ? e : "px";
        a = a + e + " " + b + e;
        b = this.style;
        b.transformOrigin = b.WebkitTransformOrigin = b.msTransformOrigin = b.MozTransformOrigin = b.OTransformOrigin = a;
        if (this.K)this.K.transformOrigin = a
    };
    b.bx = function (a) {
        var b = this.style;
        b.transform = b.transform = b.msTransform = b.WebkitTransform = b.MozTransform = a;
        if (this.K)this.K.transform = a
    };
    b.center = function (a) {
        if ((this.parent || this.amStage) && this.width && this.height) {
            var b = this.x, e = this.y, c, f;
            this.amStage ? (c = jbeeb.Utils.getXYWH(this.element.parentNode), f = c.w * 0.5, c = c.h * 0.5) : (c = this.parent, c.width || c.measure(), f = c.width * 0.5, c = c.height * 0.5);
            var h = this.width * 0.5, g = this.height * 0.5;
            a == "v" ? e = c - g : a == "h" ? b = f - h : (b = f - h, e = c - g);
            this.setXY(b, e)
        }
    };
    b.setOverflow = function (a) {
        this.overflow = a;
        var b = "", e = "";
        if (a == "x" || a == "y" || !a)a == "x" ? (b = "auto", e = "hidden") : a == "y" && (b = "hidden", e = "auto", jbeeb.Browser.ie && this.setWidth(this.width + 20)), this.style.overflowX = b, this.style.overflowY = e;
        this.style.overflow = a;
        if (this.K) {
            var c = this.K;
            c.overflow = a;
            c.overflowX = b;
            c.overflowY = e
        }
    };
    b.setVisible = function (a) {
        this.visible = a;
        var b = this.style, a = a ? this.bB : "none";
        b.display = a;
        if (this.K)this.K.display = a
    };
    b.show = function () {
        this.setVisible(true)
    };
    b.hide = function () {
        this.setVisible(false)
    };
    b.setAlpha = function (a) {
        this.alpha = a;
        if (a !== null)this.style.opacity = "" + a;
        if (this.K)this.K.opacity = "" + a
    };
    b.setRounded = function (a) {
        this.rounded = a;
        this.al()
    };
    b.al = function () {
        var a = "", b = this.rounded;
        if (b) {
            var c = this.width, d = this.height, f = 0, h = this.stroke;
            if (h)h = h.weight, jbeeb.Utils.isNumber(h) && (f = h * 2);
            c = ((c < d ? c : d) + f) * 0.5;
            jbeeb.Utils.isNumber(b) ? a = c * b + "px" : b && typeof b == "object" && (a += (c * b.tl || 0) + "px " + (c * b.tr || 0) + "px " + (c * b.br || 0) + "px " + (c * b.bl || 0) + "px")
        }
        b = this.style;
        b.borderRadius = b.MozBorderRadius = b.WebkitBorderRadius = b.OBorderRadius = b.msBorderRadius = a;
        if (this.K)this.K.borderRadius = a
    };
    b.onAdded = function () {
        this.autoCenter && this.center(this.autoCenter);
        this.dispatchEvent("added", this)
    };
    b.toFront = function () {
        this.parent && this.parent.toFront(this)
    };
    b.toBack = function () {
        this.parent && this.parent.toBack(this)
    };
    b.aE = function () {
        var a = this.style, b = this.cA(), c = this.aT(), d = this.ac(), f = this.bg(), h = "none";
        if (!(b == [] && c == [] && d == [] && f == [])) {
            for (var b = c.concat(d, f, b), c = b.length, d = [], f = [], g = 0, j = 0; j < c; j++)g == 0 ? b[j] == 1 && f.push("inset") : g < 4 ? f.push(b[j] + "px") : (f.push(jbeeb.Utils.makeColor(b[j], b[j + 1])), d.push(f.join(" ")), f = [], ++j, g = -1), g++;
            d.length > 0 && (h = d.join(","))
        }
        a.boxShadow = a.MozBoxShadow = a.WebkitBoxShadow = a.OBoxShadow = a.msBoxShadow = h;
        if (this.K)this.K.boxShadow = h
    };
    b.cA = function () {
        var a = this.shadow;
        return a ? [0, a.x || 0, a.y || 0, a.s, a.c || "#000000", a.a || 0.4] : []
    };
    b.setShadow = function (a) {
        this.shadow = a;
        this.aE()
    };
    b.bg = function () {
        var a = this.inset;
        return a ? [1, a.x || 0, a.y || 0, a.s, a.c || "#000000", a.a || 0.4] : []
    };
    b.setInset = function (a) {
        this.inset = a;
        this.aE()
    };
    b.aT = function () {
        var a = this.bevel;
        return a ? [1, -a.x, -a.y, a.s1, a.c1 || "#FFFFFF", a.a1, 1, a.x, a.y, a.s2, a.c2 || "#000000", a.a2] : []
    };
    b.setBevel = function (a) {
        if (a)jbeeb.Utils.isNumber(a) ? a = {
            x: -a,
            y: -a,
            s1: 0,
            s2: 0,
            c1: "#FFFFFF",
            c2: "#000000",
            a1: 1,
            a2: 1
        } : (a.c1 = a.c1 || "#FFFFFF", a.c2 = a.c2 || "#000000");
        this.bevel = a;
        this.aE()
    };
    b.ac = function () {
        if (this.outline) {
            var a = this.outline;
            return [0, -a.weight, -a.weight, a.spread || 0, a.color || "#000000", a.alpha || 1, 0, a.weight, -a.weight, a.spread || 0, a.color || "#000000", a.alpha || 1, 0, -a.weight, a.weight, a.spread || 0, a.color || "#000000", a.alpha || 1, 0, a.weight, a.weight, a.spread || 0, a.color || "#000000", a.alpha || 1]
        } else return []
    };
    b.setOutline = function (a) {
        this.outline = a;
        this.aE()
    };
    b.setMouseEnabled = function (a) {
        a = a === 0 || a === false ? "none" : "auto";
        this.style.pointerEvents = a;
        if (this.K)this.K.pointerEvents = a
    };
    b.bS = null;
    b.MELbubble = false;
    b.addMEL = function (a, b, c, d, f) {
        this.MELbubble = d;
        if (!this.bS)this.bS = new jbeeb.MouseEventListener(this);
        (a == "mouseOver" || a == "mouseOut" || a == "mouseMove") && this.bS.enableMouseOver(1);
        this.addEventListener(a, b, c, f)
    };
    b.removeMEL = function (a, b) {
        this.removeEventListener(a, b);
        a == "mouseOver" && this.bS.enableMouseOver(0)
    };
    b.setFloat = function (a) {
        this.style.position = "relative";
        this.style.left = "";
        this.style.top = "";
        this.style.cssFloat = a;
        this.style.display = "inline-block";
        if (this.K)this.K.position = "relative", this.K.left = null, this.K.top = null, this.K.cssFloat = a, this.K.display = "inline-block"
    };
    b.destroy = function () {
        this.removeAllEventListeners();
        if (this.bS)this.bS.destroy(), this.bS = null;
        if (this.element && this.element.parentNode)this.element.parentNode.removeChild(this.element), this.element = null;
        if (this.parent)this.parent.removeChild(this), this.parent = null;
        this.K = this.element = this.image = this.inset = this.shadow = this.outline = this.bevel = this.gradient = this.fill = this.stroke = this.temp = null
    };
    b.getCSS = function () {
        return this.K
    };
    b.toString = function () {
        return "[Box (name=" + this.name + ")]"
    };
    b.type = "Box";
    jbeeb.Box = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function (a) {
        this.init(a)
    }, b = c.prototype = new jbeeb.Box(null);
    b.textFit = null;
    b.text = "";
    b.bG = "";
    b.textSize = null;
    b.textColor = null;
    b.shadowText = null;
    b.bevelText = null;
    b.outlineText = null;
    b.insetText = null;
    b.font = null;
    b.align = null;
    b.textScale = null;
    b.selectable = null;
    b.bold = null;
    b.padding = null;
    b.editable = null;
    b.aN = null;
    b.multiline = null;
    b.baselineShift = null;
    b.bI = null;
    b.J = null;
    b.bH = false;
    b.bm = b.init;
    b.init = function (a) {
        if (a) {
            if (a.editable) {
                var b;
                b = a.multiline ? document.createElement("textarea") : document.createElement("input");
                this.aN = 1;
                b.id = jbeeb.getUID();
                b.style.position = "absolute";
                b.style.overflow = "visible";
                if (this.K)this.K.position = "absolute", this.K.overflow = "visible";
                if (!a.multiline)b.type = "text";
                a.element = b
            }
            this.bm(a);
            a.element = null;
            b = this.style;
            b.textDecoration = "none";
            b.zoom = 1;
            b.size = a.h;
            this.text = a.text || "";
            if (this.K)b = this.K, b.fontSmooth = "always", b.WebkitFontSmoothing = "antialiased", b.textDecoration = "none", b.zoom = 1, b.size = a.h;
            this.applySkin(a, true)
        }
    };
    b.bP = b.applySkin;
    b.applySkin = function (a, b) {
        this.bH = true;
        if (a.editable) {
            var c = null;
            a.fill && (c = typeof a.fill == "object" ? a.fill.color : a.fill);
            a.stroke = a.stroke || c || {weight: 1, color: "#000000", alpha: 1}
        }
        this.bP(a, b);
        this.textFit = a.textFit || null;
        this.font = a.font || "Arial, Helvetica, sans-serif";
        this.align = a.align || "left";
        this.textScale = a.textScale || 1;
        this.bold = a.bold || 0;
        this.selectable = a.selectable || 0;
        this.editable = a.editable || 0;
        this.multiline = a.multiline || 0;
        this.baselineShift = a.baselineShift || 0;
        if (!b)this.text = a.text || "";
        this.bG = "";
        this.textColor = {};
        if (a.textSize)this.textSize = a.textSize;
        a.editable == 1 && this.setEditable(1);
        this.setMultiline(this.multiline, true);
        this.setText(this.text);
        if (a.textColor) {
            var c = a.textColor, d = {};
            if (typeof c == "string")d = {color: c, alpha: 1}; else if (d = c, !d.color)d.color = null, d.alpha = null;
            this.setTextColor(d.color || "#000000", d.alpha || 1)
        }
        if (a.shadowText)this.shadowText = a.shadowText;
        if (a.insetText)this.insetText = a.insetText;
        if (a.bevelText)this.bevelText = a.bevelText;
        if (a.outlineText)this.outlineText = a.outlineText;
        if (a.shadow)this.shadow = a.shadow;
        if (a.inset)this.insetText = a.inset;
        if (a.bevel)this.bevel = a.bevel;
        if (a.outline)this.outline = a.outline;
        a.padding && this.setPadding(a.padding);
        if (a.alphaNumeric)this.alphaNumeric = 1;
        if (a.numeric)this.numeric = 1;
        this.setBaselineShift(this.baselineShift);
        this.bH = false;
        this.as();
        this.aL()
    };
    b.setMultiline = function (a) {
        this.multiline = a;
        var b = this.style;
        if (a) {
            if (!this.textSize)this.textSize = 12;
            a = "normal"
        } else a = "nowrap";
        b.whiteSpace = a;
        if (this.K)this.K.whiteSpace = a;
        this.ba()
    };
    b.aN = 0;
    b.setEditable = function (a) {
        a === 1 ? (this.amSM || this.setCursor("text"), this.J ? this.J.removeAllEventListeners() : this.J = new jbeeb.Keyboard(this.element), this.J.addEventListener("keydown", this.keyHandler, this), this.J.addEventListener("keyup", this.keyHandler, this), this.setOverflow("hidden"), jbeeb.Utils.bindEvent(this.element, "focus", this.setFocus.bind(this)), jbeeb.Utils.bindEvent(this.element, "blur", this.bE.bind(this)), this.addMEL("mouseUp", this.setFocus, this)) : (this.amSM || this.setCursor("default"), this.J && this.J.removeAllEventListeners(), jbeeb.Utils.unbindEvent(this.element, "focus", this.setFocus.bind(this)));
        this.editable = a
    };
    b.numeric = null;
    b.alphaNumeric = null;
    b.keyHandler = function (a, b, c) {
        var d = true;
        this.alphaNumeric ? d = this.J.alphaNumeric(b) : this.numeric && (d = this.J.numeric(b));
        if (this.multiline == 0 && (b == 108 || b == 13))d = false, c == "keyup" && this.dispatchEvent("enter", this, this.text);
        b == 9 && (d = false, c == "keyup" && this.dispatchEvent("tab", this, this.text));
        d ? (this.text = this.aN && !this.multiline ? this.element.value : this.by.text, c == "keyup" && this.dispatchEvent("change", this, this.text)) : this.J.block(a)
    };
    b.bE = function () {
        this.dispatchEvent("change", this, this.text)
    };
    b.setPadding = function (a) {
        this.padding = a;
        var b;
        b = this.by ? this.by.style : this.style;
        var c = "", d = "", f = "", h = "";
        this.multiline ? (c = a + "px", d = a + "px", f = a + "px", h = a + "px") : this.align == "left" ? a && (c = a + "px") : this.align == "right" && a && (d = a + "px");
        b.paddingLeft = c;
        b.paddingRight = d;
        b.paddingTop = f;
        b.paddingBottom = h;
        if (this.K)a = this.K, a.paddingLeft = c, a.paddingRight = d, a.paddingTop = f, a.paddingBottom = h
    };
    b.da = function () {
        var a = this.font, b = this.textColor || {}, b = jbeeb.Utils.makeColor(b.color, b.alpha), c = this.bold ? "bold" : "normal", d = this.style;
        d.fontFamily = a;
        d.color = b;
        d.textAlign = this.align;
        d.fontWeight = c;
        if (this.K)d = this.K, d.fontFamily = a, d.color = b, d.textAlign = this.align, d.fontWeight = c
    };
    b.setFont = function (a) {
        this.font = a;
        this.style.fontFamily = a;
        if (this.by)this.by.style.fontFamily = this.font;
        if (this.K)this.K.fontFamily = a;
        this.as()
    };
    b.setAlign = function (a) {
        this.align = a;
        this.style.textAlign = a;
        a == "center" && this.setPadding(0);
        if (this.K)this.K.textAlign = a
    };
    b.setBold = function (a) {
        this.bold = a ? "bold" : "";
        this.style.fontWeight = this.bold;
        if (this.K)this.K.fontWeight = this.bold;
        this.as()
    };
    b.setBaselineShift = function (a) {
        (this.baselineShift = a) ? a > 1 ? a = 1 : a < -1 && (a = -1) : a = 0;
        a *= -1;
        this.bI = 1 + a;
        this.as()
    };
    b.measureText = function (a) {
        if (this.text || a) {
            var b = document.createElement("div");
            document.body.appendChild(b);
            var c = b.style;
            c.fontSize = this.height * this.textScale + "px";
            c.fontFamily = this.font;
            c.fontWeight = this.bold ? "bold" : "normal";
            c.position = "absolute";
            c.left = -1E3;
            c.top = -1E3;
            b.innerHTML = a || this.text;
            a = {w: b.clientWidth, h: b.clientHeight};
            document.body.removeChild(b);
            return a
        } else return 0
    };
    b.setTextColor = function (a, b) {
        if (!this.textColor)this.textColor = {};
        this.textColor.color = a;
        this.textColor.alpha = b;
        var c = jbeeb.Utils.makeColor(a, b);
        this.style.color = c;
        if (this.K)this.K.color = c
    };
    b.setText = function (a) {
        if (this.element) {
            this.text = a = a == "" || !a ? "" : String(a);
            if (this.aN && !this.multiline)this.element.value = a; else {
                if (!this.by) {
                    var b = document.createElement("span");
                    b.style.fontFamily = this.font;
                    this.element.appendChild(b);
                    this.by = b
                }
                this.by.innerHTML = a
            }
            this.bG != a && this.as();
            this.bG = a
        }
    };
    b.selectAll = function () {
        if (this.aN)jbeeb.focus = this, this.element.focus(), this.element.select()
    };
    b.bu = b.setWidth;
    b.setWidth = function (a) {
        a != this.width && (this.bu(a), this.ba())
    };
    b.ao = b.setHeight;
    b.setHeight = function (a) {
        a != this.height && (this.ao(a), this.ba())
    };
    b.bf = b.setSize;
    b.setSize = function (a, b) {
        if (a != this.width || b != this.height)this.bf(a, b), this.ba()
    };
    b.setTextScale = function (a) {
        this.textScale = a || 1;
        this.ba()
    };
    b.setTextSize = function (a) {
        this.textSize = a;
        this.ba()
    };
    b.setTextFit = function (a) {
        this.textFit = a;
        this.ba()
    };
    b.be = b.onAdded;
    b.onAdded = function () {
        this.be();
        this.as()
    };
    b.setFocus = function () {
        jbeeb.focus = this;
        this.element.focus()
    };
    b.ba = function () {
        if (this.text != "") {
            var a = null, b = null, c = null;
            if (this.textSize)a = this.textSize, b = "1em", c = a + "px"; else {
                var d = this.width, f = this.height;
                if (d > 0 && f > 0)if (this.textFit == "wh")a = d < f ? d : f, a = this.textScale > 0 ? a * this.textScale : a; else if (this.textFit == "w") {
                    if (d = this.width / this.measureText().w / 2, jbeeb.Utils.isNumber(d) && d > 0)this.textScale = d, a = f * d
                } else a = f * this.textScale; else a = 0
            }
            a && (b = this.height * this.bI / a + "em", c = a + "px");
            a = this.style;
            a.lineHeight = b;
            a.fontSize = c;
            if (this.K)this.K.lineHeight = b, this.K.fontSize = c
        }
    };
    b.getTextSize = function () {
        return this.style.fontSize || null
    };
    b.as = function () {
        this.bH || (this.ba(), this.da())
    };
    b.aL = function () {
        var a = this.dE(), b = this.ae(), c = this.aQ(), d = this.aK(), f = "none";
        if (!(a == [] && b == [] && c == [] && d == [])) {
            for (var a = b.concat(c, a, d), b = a.length, c = [], d = [], h = 0, g = 0; g < b; g++)h == 0 ? a[g] == 1 && d.push("inset") : h < 4 ? d.push(a[g] + "px") : (d.push(jbeeb.Utils.makeColor(a[g], a[g + 1])), c.push(d.join(" ")), d = [], ++g, h = -1), h++;
            c.length > 0 && (f = c.join(","))
        }
        a = this.style;
        a.textShadow = a.MozTextShadow = a.WebkitTextShadow = a.OTextShadow = a.msTextShadow = f;
        if (this.K)this.K.textShadow = f
    };
    b.dE = function () {
        var a = this.shadowText;
        return a ? [0, a.x, a.y, a.s, a.c, a.a] : []
    };
    b.setShadowText = function (a) {
        this.shadowText = a;
        this.aL()
    };
    b.aK = function () {
        var a = this.insetText;
        return a ? [1, a.x, a.y, a.s, a.c, a.a] : []
    };
    b.setInsetText = function (a) {
        this.insetText = a;
        this.aL()
    };
    b.ae = function () {
        if (this.bevelText) {
            var a = this.bevelText, b = [];
            a.c1 && a.a1 > 0 && (b = [0, -a.x, -a.y, a.s1, a.c1 || "#000000", a.a1]);
            a.c2 && a.a2 > 0 && (b = b.concat([0, a.x, a.y, a.s2, a.c2 || "#FFFFFF", a.a2]));
            return b
        } else return []
    };
    b.setBevelText = function (a) {
        this.bevelText = a;
        this.aL()
    };
    b.aQ = function () {
        if (this.outlineText) {
            var a = this.outlineText;
            return [0, -a.weight, -a.weight, a.spread || 0, a.color || "#000000", a.alpha, 0, a.weight, -a.weight, a.spread || 0, a.color || "#000000", a.alpha, 0, -a.weight, a.weight, a.spread || 0, a.color || "#000000", a.alpha, 0, a.weight, a.weight, a.spread || 0, a.color || "#000000", a.alpha]
        } else return []
    };
    b.setOutlineText = function (a) {
        this.outlineText = a;
        this.aL()
    };
    b.toString = function () {
        return "[TextBox (name=" + this.name + ")]"
    };
    b.type = "TextBox";
    jbeeb.TextBox = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function (a) {
        this.init(a)
    }, b = c.prototype = new jbeeb.Box(null);
    b.O = [];
    b.addChild = function (a) {
        if (a == null)return a;
        var b = arguments.length;
        if (b > 0)for (var c = 0; c < b; c++) {
            var d = arguments[c];
            d.parent && d.parent.removeChild(d);
            d.parent = this;
            d.stage = this.amStage == 1 ? this : this.stage;
            d.setZ(this.O.length);
            this.element.appendChild(d.element);
            d.onAdded && d.onAdded.call(d);
            this.O.push(d)
        }
    };
    b.removeChild = function (a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = true; b--;)c = c && this.removeChild(arguments[b]);
            return c
        }
        return this.removeChildAt(this.O.indexOf(a))
    };
    b.removeChildAt = function (a) {
        var b = arguments.length;
        if (b > 1) {
            for (var c = [], d = 0; d < b; d++)c[d] = arguments[d];
            c.sort(function (a, b) {
                return b - a
            });
            for (var f = true, d = 0; d < b; d++)f = f && this.removeChildAt(c[d]);
            return f
        }
        if (a < 0 || a > this.O.length - 1)return false;
        if (b = this.O[a])b.element && b.element.parentNode && b.element.parentNode.removeChild(b.element), b.parent = null;
        this.O.splice(a, 1);
        this.bL();
        return true
    };
    b.removeAllChildren = function () {
        for (var a = this.O; a.length;)this.removeChildAt(0)
    };
    b.bL = function () {
        for (var a = this.O.length, b = 0; b < a; b++) {
            var c = this.O[b];
            c && c.setZ(b + 1)
        }
    };
    b.toFront = function (a) {
        if (a) {
            for (var b = this.O.length, c = 0, d = b; d--;)if (this.O[d] == a) {
                c = d;
                break
            }
            jbeeb.Utils.arrayMove(this.O, c, b - 1);
            this.bL()
        } else this.parent && this.parent.toFront(this)
    };
    b.toBack = function (a) {
        if (a) {
            for (var b = 0, c = this.O.length; c--;)if (this.O[c] == a) {
                b = c;
                break
            }
            jbeeb.Utils.arrayMove(this.O, b, 0);
            this.bL()
        } else this.parent && this.parent.toBack(this)
    };
    b.aW = b.init;
    b.init = function (a) {
        this.aW(a);
        if (a)this.stage = this.amStage == 1 ? this : this.stage, this.O = []
    };
    b.db = b.stretch;
    b.stretch = function (a, b) {
        var c = a, d = b, f = this.flex;
        f && (f.match(/w/) || (c = 1), f.match(/h/) || (d = 1));
        for (f = this.O.length; f--;) {
            var h = this.O[f];
            h && h.stretch(c, d)
        }
        this.db(a, b)
    };
    b.cb = b.setFlex;
    b.setFlex = function (a) {
        for (var b = this.O.length; b--;)this.O[b].setFlex(a);
        this.cb(a)
    };
    b.ak = b.destroy;
    b.destroy = function () {
        if (this.O)for (var a = this.O.length; a--;)this.O[a] && (this.O[a].destroy(), this.removeChild(this.O[a]), this.O[a] = null);
        this.O = null;
        this.ak()
    };
    b.destroyChildren = function () {
        if (this.O)for (var a = this.O.length; a--;)this.O[a] && (this.O[a].destroy(), this.removeChild(this.O[a]), this.O[a] = null);
        this.O.length = 0;
        this.O = null;
        this.O = []
    };
    b.getChildren = function () {
        return this.O
    };
    b.toString = function () {
        return "[Container (name=" + this.name + ")]"
    };
    b.type = "Container";
    jbeeb.Container = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function (a) {
        this.ab(a);
        return this
    }, b = c.prototype = new jbeeb.Container;
    b.amReady = null;
    b.R = null;
    b.ab = function (a) {
        if (a) {
            this.amReady = 0;
            if (a.onReady)this.R = [], this.R.push(a.onReady);
            this.id = jbeeb.getUID();
            if (a.stage)this.amStage = 0, this.am(a); else {
                this.amStage = 1;
                this.parent = this;
                this.stage = this;
                var b = a.target, c = null, d = 0;
                if (b)(c = typeof b == "string" ? document.getElementById(b) : b) ? c.nodeType === 1 ? (this.element = document.createElement("div"), this.element.id = this.id, c.appendChild(this.element)) : d = 1 : d = 1;
                if (!b || d)document.write('<div id="' + this.id + '"></div>'), this.element = document.getElementById(this.id);
                a.element = this.element;
                this.am(a);
                this.style = this.element.style;
                this.style.position = "relative";
                this.style.display = a.inline === true || a.inline == "true" || a.inline === 1 ? "inline-block" : "block";
                this.style.verticalAlign = "top";
                this.style.clear = "both";
                this.style.zoom = 1;
                this.setSize(this.width || a.w || 1, this.height || a.h || 1);
                this.setOverflow(a.overflow || "visible");
                this.setCursor("default")
            }
            jbeeb.register(this)
        }
    };
    b.am = b.init;
    b.init = function () {
        var a = jbeeb.Utils.getXYWH(this.element);
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height;
        setTimeout(this.bi.bind(this), 50)
    };
    b.bi = function () {
        this.amReady = 1;
        if (this.R)for (var a = 0; a < this.R.length; a++)this.R.pop()()
    };
    b.onReady = function (a) {
        if (this.amReady)a(); else {
            if (!this.R)this.R = [];
            this.R.push(a)
        }
    };
    b.toString = function () {
        return "[Stage (name=" + this.name + ")]"
    };
    b.type = "Stage";
    jbeeb.Stage = c
})();
this.jbeeb = this.jbeeb || {};
(function () {
    var c = function (a) {
        a = a || {};
        this.aB = a.onComplete;
        this.aO = a.timezoneOffset || 0;
        this.bJ = a.digits || 2;
        this.bA = a.truncate || 0;
        this.aJ = c.bs[a.rangeHi] ? c.bs[a.rangeHi] : c.ax;
        this.bz = c.bs[a.rangeLo] ? c.bs[a.rangeLo] : c.ai;
        a.end && this.bq(a.end);
        return this
    };
    c.au = 36E5;
    c.aw = 864E5;
    c.aC = 0;
    c.ai = 1;
    c.aZ = 2;
    c.an = 3;
    c.az = 4;
    c.bk = 5;
    c.ax = 6;
    c.bs = {ms: c.aC, second: c.ai, minute: c.aZ, hour: c.an, day: c.az, month: c.bk, year: c.ax};
    var b = c.prototype;
    b.aD = false;
    b.bc = false;
    b.aB = null;
    b.av = null;
    b.aO = 0;
    b.bJ = 0;
    b.aJ = c.ax;
    b.bz = c.aC;
    b.bA = 0;
    b.bq = function (a) {
        var b = new Date;
        if (a instanceof Date)a = new Date(a.getTime()); else if (typeof a == "object") {
            var b = a.year ? parseInt(a.year) : b.getFullYear(), e = a.month ? parseInt(a.month) - 1 : 0, d = a.day ? parseInt(a.day) : 0, f = a.hour ? parseInt(a.hour) : 0, h = a.minute ? parseInt(a.minute) : 0, g = a.second ? parseInt(a.second) : 0, a = (a.ampm ? a.ampm : "am").toLowerCase();
            f < 12 && /p/.test(a) && (f += 12);
            a = new Date(b, e, d, f, h, g)
        } else a = new Date(b.getTime() + (parseInt(a) + 1) * 1E3);
        b = 0;
        this.aO != 0 && (b += this.aO * c.au);
        b != 0 && (a = a.getTime() + b, a = new Date(a));
        this.av = a;
        this.bc = this.aD = false
    };
    b.update = function () {
        return this.bd(new Date)
    };
    b.diff = function (a, b) {
        b && this.bq(b);
        return this.bd(a)
    };
    b.bd = function (a) {
        var b = 0, e = 0, d = 0, f = 0, h = 0, g = 0, j = 0, k = this.av, o = k.getTime() - a.getTime(), p = Math.floor, v = false;
        if (o > 0) {
            var z = c.au, n = this.bz, l = this.aJ;
            this.bA && (n = -1, l = 10);
            var q = c.aC, t = c.ai, r = c.aZ, x = c.an, s = c.az, y = c.bk, m = o / 1E3, u = m / 60, w = u / 60, B = w / 24;
            n < s && (l >= q && (b = p(l == q ? o : o % 1E3)), l >= t && (e = p(l == t ? m : m % 60)), l >= r && (d = p(l == r ? u : u % 60)), console.log(o / 1E3 / 60), l >= x && (f = p(l == x ? w : w % 24)));
            o = a.getUTCFullYear();
            n = a.getUTCMonth();
            m = a.getUTCDate();
            q = k.getUTCFullYear();
            t = k.getUTCMonth();
            r = k.getUTCDate();
            x = m;
            u = 0;
            if (l >= s)if (l == s)h = p(B); else {
                var h = a.getUTCHours(), s = a.getUTCMinutes(), a = a.getUTCSeconds(), B = k.getUTCHours(), u = k.getUTCMinutes(), A = k.getUTCSeconds(), k = t + (t == n ? 0 : -1);
                k < 0 && (k += 12);
                w = c.getMonthDays(k, q);
                w = w < m ? c.getMonthDays(k - 1, q) : w;
                w = w < r ? r : w;
                k = 0;
                r > m ? k = r - m - 1 : r < m && (k = m - r - 1);
                u = (c.aw - (a + s * 60 + h * 3600) * 1E3 + (A + u * 60 + B * 3600) * 1E3) / z;
                u < 24 && m++;
                m += k;
                h = p((w - m + r + k) % w)
            }
            l >= y && (j = 0, g = (q - o) * 12, g < 0 || o == q && n == t ? g = 0 : (n++, t++, k = 0, t > n ? k = t - n - 1 : n > t && (k = 12 - n + t, j--), u < 24 && x++, n >= t && x > r ? k-- : x <= r && k++, g += k, g < 0 && (g = 0), g > 12 && (j += p(g / 12), g %= 12), l == y && (g += j * 12, j = 0)))
        } else v = true;
        b = {ms: b, second: e, minute: d, hour: f, day: h, month: g, year: j};
        c.pad(b, this.bJ);
        if (v && !this.bc && this.aB)this.bc = this.aD = true, this.aB(this.av);
        return b
    };
    c.bh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    c.getMonthDays = function (a, b) {
        return a == 1 ? b % 400 == 0 || b % 4 == 0 && b % 100 != 0 ? 29 : 28 : c.bh[a]
    };
    c.pad = function (a, b) {
        if (b)for (var c in a) {
            for (var d = String(a[c]); d.length < b;)d = "0" + d;
            a[c] = d
        }
    };
    Object.defineProperty(b, "rangeHi", {
        get: function () {
            return this.aJ
        }, set: function (a) {
            this.aJ = c.bs[a] ? c.bs[a] : c.ax
        }
    });
    Object.defineProperty(b, "rangeLo", {
        get: function () {
            return this.bz
        }, set: function (a) {
            this.bz = c.bs[a] ? c.bs[a] : c.ai
        }
    });
    jbeeb.TimeDiff = c
})();
(function () {
    var c = function (a) {
        this.imageFolder = CountdownImageFolder;
        this.imageBasename = CountdownImageBasename;
        this.imageExt = CountdownImageExt;
        this.imagePhysicalWidth = CountdownImagePhysicalWidth;
        this.imagePhysicalHeight = CountdownImagePhysicalHeight;
        this.totalFlipDigits = 2;
        this.aM = a || {};
        var b, c, d, f;
        if (a.bkgd) {
            var h = a.bkgd;
            if (h.color)b = h.color;
            h.stroke && h.strokeColor && (c = {weight: h.stroke || 1, color: h.strokeColor, alpha: h.strokeAlpha});
            if (h.shadow)d = h.shadow;
            if (h.rounded)f = h.rounded
        }
        this.aY = new jbeeb.Stage({
            target: a.target,
            inline: a.inline || false,
            w: a.w || a.width || CountdownWidth,
            h: a.h || a.height || CountdownHeight,
            rounded: f || null,
            fill: b || null,
            stroke: c || null,
            shadow: d || null
        });
        jbeeb.register(this)
    }, b = c.prototype;
    b.aM = null;
    b.aY = null;
    b.aD = false;
    b.aB = null;
    b.id = null;
    b.aX = false;
    b.T = null;
    b.totalFlipDigits = null;
    b.imageFolder = null;
    b.imageBasename = "flipper";
    b.imageExt = "png";
    b.aV = null;
    b.bU = null;
    b.dJ = "second";
    b.bv = false;
    b.bF = null;
    b.ay = false;
    b.aH = 0;
    b.ad = 0;
    b.aI = 0;
    b.aq = 0;
    b.bV = [];
    b.bj = {};
    b.L = 0;
    b.bn = 0;
    b.aS = null;
    b.init = function () {
        this.id = jbeeb.getUID();
        var a = this.aM;
        this.aX = this.aD = false;
        this.T = a.style || "boring";
        this.width = a.w || a.width || CountdownWidth;
        this.height = a.h || a.height || CountdownHeight;
        this.aB = a.onComplete;
        this.bv = a.hideLabels;
        this.ay = a.hideLine;
        this.bF = a.labelText || CountdownLabels;
        this.L = a.interval || CountdownInterval;
        this.bn = 0;
        this.aS = {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0};
        if (this.T == "flip") {
            this.imageFolder.substr(-1) != "/" && (this.imageFolder += "/");
            var b = this.imageFolder + this.imageBasename
        }
        this.bU = {
            second: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]},
            minute: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]},
            hour: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]},
            day: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]},
            month: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]},
            year: {use: false, prev: [null, null], ani: [null, null], aniCount: [null, null]}
        };
        for (var c = "second,minute,hour,day,month,year".split(","), d = a.rangeLo ? a.rangeLo : "second", f = a.rangeHi ? a.rangeHi : "year", d = d.substr(-1) == "s" ? d.substr(0, d.length - 1) : d, f = f.substr(-1) == "s" ? f.substr(0, f.length - 1) : f, h = d, g = f, j = 0; j < c.length; j++) {
            var k = c[j];
            k == d && (d = j);
            k == f && (f = j)
        }
        for (j = 0; j < c.length; j++)if (j >= d && j <= f)k = c[j], this.bU[k].use = true, this.dJ = k;
        k = a.padding === 0 ? 0 : a.padding ? a.padding : this.T == "flip" ? 0 : 0.8;
        this.T == "flip" && (k /= 2);
        var o = this.height, d = this.width / (f - d + 1), f = this.bv ? 0 : d * 0.25, p = d * 0.1, v = d - p, z = o - f, n = v * k;
        this.T == "flip" && (n = v * (k / this.totalFlipDigits));
        var l = v - n, q = this.height - f * 2;
        this.ad = v / this.totalFlipDigits;
        this.aI = p;
        var t = 0;
        this.T == "flip" && (q = this.height - f, t = o * 0.03);
        this.aH = v;
        this.ad = l * this.totalFlipDigits;
        this.aI = p;
        this.aq = n / 2 / this.totalFlipDigits / 2;
        var r = {
            font: "Arial, _sans",
            color: "#FFFFFF",
            weight: "normal",
            bkgd: this.T == "flip" ? null : {
                color: ["#000000", 1, 0, "#686868", 1, 50, "#000000", 1, 50, "#535050", 1, 100],
                alpha: "v"
            },
            rounded: this.T == "flip" ? null : 0.18,
            shadow: null
        }, x = {font: "Arial, _sans", color: "#303030", weight: "bold"};
        if (a.numbers)for (var s in r)a.numbers[s] && (r[s] = a.numbers[s]);
        if (a.labels)for (s in x)a.labels[s] && (x[s] = a.labels[s]);
        c.reverse();
        this.aV = {};
        this.bV = [];
        for (j = s = 0; j < c.length; j++) {
            var y = c[j];
            if (this.bU[y].use) {
                this.aV[y] = new jbeeb.Container({
                    x: s + p / 2,
                    y: 0,
                    w: v,
                    h: z,
                    rounded: r.rounded || null,
                    fill: jbeeb.Utils.clone(r.bkgd) || null,
                    shadow: r.shadow || null
                });
                var m = this.aV[y];
                m.store = {name: y};
                this.bj[y] = v;
                if (this.T == "flip") {
                    var u = this.imagePhysicalWidth * ((l - t * 2 - n * 2) / this.totalFlipDigits / this.imagePhysicalWidth), w = this.imagePhysicalHeight * (q / this.imagePhysicalHeight);
                    m.time = new jbeeb.Container({x: 0, y: 0, w: u * this.totalFlipDigits, h: w});
                    for (var B = [], A = 0; A < this.totalFlipDigits; A++) {
                        for (var C = new jbeeb.Container({
                            x: u * A + t * A,
                            y: 0,
                            w: u,
                            h: w
                        }), G = [], D = 0; D < 10; D++) {
                            for (var E = new jbeeb.Container({x: 0, y: 0, w: u, h: w}), H = [], F = 0; F < 3; F++) {
                                var I = new jbeeb.Box({
                                    x: 0,
                                    y: 0,
                                    w: u,
                                    h: w,
                                    image: {url: b + ("" + D + "" + F) + "." + this.imageExt, mode: "fit"}
                                });
                                H[F] = I;
                                E.addChild(I)
                            }
                            E.img = H;
                            G[D] = E;
                            C.addChild(E)
                        }
                        C.num = G;
                        B[A] = C;
                        m.time.addChild(C)
                    }
                    m.time.slot = B;
                    m.addChild(m.time)
                } else if (m.time = new jbeeb.TextBox({
                        x: 0,
                        y: 0,
                        w: v,
                        h: z,
                        text: "00",
                        textScale: k,
                        font: r.font,
                        textColor: r.color,
                        align: "center"
                    }), m.addChild(m.time), !this.ay)m.line = new jbeeb.Box({
                    x: 0,
                    y: 0,
                    w: v,
                    h: o * 0.03,
                    fill: "#000000"
                }), m.addChild(m.line), m.line.center();
                this.aY.addChild(m);
                if (!this.bv)m.labels = new jbeeb.TextBox({
                    x: s,
                    y: o - f * 0.7,
                    w: d,
                    h: f * 0.7,
                    font: x.font,
                    testScale: 0.7,
                    textColor: x.color,
                    bold: 1,
                    align: "center",
                    text: this.bF[y]
                }), this.aY.addChild(m.labels);
                this.bV.push(m);
                m.time.center();
                a.numberMarginTop && m.time.setY(a.numberMarginTop);
                s += d
            }
        }
        m = this.aV;
        this.T == "flip" ? (m.year && this.V("year", "00"), m.month && this.V("month", "00"), m.day && this.V("day", "00"), m.hour && this.V("hour", "00"), m.minute && this.V("minute", "00"), m.second && this.V("second", "00")) : (m.year && m.year.time.setText("00"), m.month && m.month.time.setText("00"), m.day && m.day.time.setText("00"), m.hour && m.hour.time.setText("00"), m.minute && m.minute.time.setText("00"), m.second && m.second.time.setText("00"), this.ar());
        this.bC = new jbeeb.TimeDiff({
            end: a.time ? a.time : {
                year: a.year || a.years,
                month: a.month || a.months,
                day: a.day || a.days,
                hour: a.hour || a.hours,
                minute: a.minute || a.minutes,
                second: a.second || a.seconds,
                ampm: a.ampm || ""
            },
            rangeHi: g,
            rangeLo: h,
            timezoneOffset: a.offset || 0,
            onComplete: this.dz.bind(this),
            truncate: a.truncate || 0
        });
        this.aX = true;
        jbeeb.ticker.addEventListener("tick", this.tick, this)
    };
    b.tick = function () {
        this.aX === true && this.bQ()
    };
    b.dz = function (a) {
        this.aB && this.aB(a)
    };
    b.bb = function (a) {
        return a.toString().length * this.ad
    };
    b.ar = function () {
        for (var a = false, b = 0; b < this.bV.length; b++) {
            var c = this.bV[b], d = c.store.name, f = c.time.text, f = this.bb(f);
            f >= this.aH && f != this.bj[d] && (c.setWidth(f + this.aq), this.bj[d] = f + this.aq, a = true)
        }
        if (a)for (b = a = 0; b < this.bV.length; b++)c = this.bV[b], f = c.time.text, this.bb(f), c.setX(a), c.time.setWidth(c.width), c.time.center(), c.labels && (c.labels.setX(a), c.labels.setWidth(c.width)), c.line && (c.line.setWidth(c.width), c.line.center()), a += c.width + this.aI
    };
    b.bQ = function () {
        this.bn += jbeeb.ticker.getInterval();
        if (this.bn > this.L)this.aS = this.bC.update(), this.bn = 0;
        var a = this.aV, b = this.aS;
        this.T == "flip" ? (a.year && this.V("year", b.year), a.month && this.V("month", b.month), a.day && this.V("day", b.day), a.hour && this.V("hour", b.hour), a.minute && this.V("minute", b.minute), a.second && this.V("second", b.second)) : (a.year && a.year.time.setText(b.year), a.month && a.month.time.setText(b.month), a.day && a.day.time.setText(b.day), a.hour && a.hour.time.setText(b.hour), a.minute && a.minute.time.setText(b.minute), a.second && a.second.time.setText(b.second), this.ar())
    };
    b.V = function (a, b) {
        for (var c = 0; c < this.totalFlipDigits; c++) {
            var d = this.aV[a].time.slot[c], f = this.bU[a], h = String(b).substr(c, 1), g = d.num[h];
            if (g) {
                if (f.prev[c] != h) {
                    for (var j = 0; j < 10; j++)d.num[j].hide();
                    g.show();
                    f.ani[c] = true;
                    f.aniCount[c] = 0
                }
                if (f.ani[c]) {
                    for (j = 0; j < 3; j++)g.img[j].hide();
                    this.aD ? g.img[2].show() : (g.img[f.aniCount[c]].show(), f.aniCount[c]++, f.aniCount[c] > 2 && (f.ani[c] = false))
                }
                f.prev[c] = h
            }
        }
    };
    window.Countdown = c
})(); 