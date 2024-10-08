!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).SakanaWidget = e()
}(this, (function() {
    "use strict";
    var t, e = [], i = "ResizeObserver loop completed with undelivered notifications.";
    !function(t) {
        t.BORDER_BOX = "border-box",
        t.CONTENT_BOX = "content-box",
        t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
    }(t || (t = {}));
    var s, r = function(t) {
        return Object.freeze(t)
    }, n = function(t, e) {
        this.inlineSize = t,
        this.blockSize = e,
        r(this)
    }, o = function() {
        function t(t, e, i, s) {
            return this.x = t,
            this.y = e,
            this.width = i,
            this.height = s,
            this.top = this.y,
            this.left = this.x,
            this.bottom = this.top + this.height,
            this.right = this.left + this.width,
            r(this)
        }
        return t.prototype.toJSON = function() {
            var t = this;
            return {
                x: t.x,
                y: t.y,
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.width,
                height: t.height
            }
        }
        ,
        t.fromRect = function(e) {
            return new t(e.x,e.y,e.width,e.height)
        }
        ,
        t
    }(), a = function(t) {
        return t instanceof SVGElement && "getBBox"in t
    }, h = function(t) {
        if (a(t)) {
            var e = t.getBBox()
              , i = e.width
              , s = e.height;
            return !i && !s
        }
        var r = t
          , n = r.offsetWidth
          , o = r.offsetHeight;
        return !(n || o || t.getClientRects().length)
    }, c = function(t) {
        var e;
        if (t instanceof Element)
            return !0;
        var i = null === (e = null == t ? void 0 : t.ownerDocument) || void 0 === e ? void 0 : e.defaultView;
        return !!(i && t instanceof i.Element)
    }, l = "undefined" != typeof window ? window : {}, u = new WeakMap, d = /auto|scroll/, g = /^tb|vertical/, W = /msie|trident/i.test(l.navigator && l.navigator.userAgent), p = function(t) {
        return parseFloat(t || "0")
    }, m = function(t, e, i) {
        return void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === i && (i = !1),
        new n((i ? e : t) || 0,(i ? t : e) || 0)
    }, C = r({
        devicePixelContentBoxSize: m(),
        borderBoxSize: m(),
        contentBoxSize: m(),
        contentRect: new o(0,0,0,0)
    }), v = function(t, e) {
        if (void 0 === e && (e = !1),
        u.has(t) && !e)
            return u.get(t);
        if (h(t))
            return u.set(t, C),
            C;
        var i = getComputedStyle(t)
          , s = a(t) && t.ownerSVGElement && t.getBBox()
          , n = !W && "border-box" === i.boxSizing
          , c = g.test(i.writingMode || "")
          , l = !s && d.test(i.overflowY || "")
          , v = !s && d.test(i.overflowX || "")
          , F = s ? 0 : p(i.paddingTop)
          , V = s ? 0 : p(i.paddingRight)
          , w = s ? 0 : p(i.paddingBottom)
          , Y = s ? 0 : p(i.paddingLeft)
          , y = s ? 0 : p(i.borderTopWidth)
          , L = s ? 0 : p(i.borderRightWidth)
          , A = s ? 0 : p(i.borderBottomWidth)
          , b = Y + V
          , S = F + w
          , E = (s ? 0 : p(i.borderLeftWidth)) + L
          , K = y + A
          , x = v ? t.offsetHeight - K - t.clientHeight : 0
          , I = l ? t.offsetWidth - E - t.clientWidth : 0
          , B = n ? b + E : 0
          , f = n ? S + K : 0
          , J = s ? s.width : p(i.width) - B - I
          , k = s ? s.height : p(i.height) - f - x
          , D = J + b + I + E
          , q = k + S + x + K
          , Z = r({
            devicePixelContentBoxSize: m(Math.round(J * devicePixelRatio), Math.round(k * devicePixelRatio), c),
            borderBoxSize: m(D, q, c),
            contentBoxSize: m(J, k, c),
            contentRect: new o(Y,F,J,k)
        });
        return u.set(t, Z),
        Z
    }, F = function(e, i, s) {
        var r = v(e, s)
          , n = r.borderBoxSize
          , o = r.contentBoxSize
          , a = r.devicePixelContentBoxSize;
        switch (i) {
        case t.DEVICE_PIXEL_CONTENT_BOX:
            return a;
        case t.BORDER_BOX:
            return n;
        default:
            return o
        }
    }, V = function(t) {
        var e = v(t);
        this.target = t,
        this.contentRect = e.contentRect,
        this.borderBoxSize = r([e.borderBoxSize]),
        this.contentBoxSize = r([e.contentBoxSize]),
        this.devicePixelContentBoxSize = r([e.devicePixelContentBoxSize])
    }, w = function(t) {
        if (h(t))
            return 1 / 0;
        for (var e = 0, i = t.parentNode; i; )
            e += 1,
            i = i.parentNode;
        return e
    }, Y = function() {
        var t = 1 / 0
          , i = [];
        e.forEach((function(e) {
            if (0 !== e.activeTargets.length) {
                var s = [];
                e.activeTargets.forEach((function(e) {
                    var i = new V(e.target)
                      , r = w(e.target);
                    s.push(i),
                    e.lastReportedSize = F(e.target, e.observedBox),
                    r < t && (t = r)
                }
                )),
                i.push((function() {
                    e.callback.call(e.observer, s, e.observer)
                }
                )),
                e.activeTargets.splice(0, e.activeTargets.length)
            }
        }
        ));
        for (var s = 0, r = i; s < r.length; s++) {
            (0,
            r[s])()
        }
        return t
    }, y = function(t) {
        e.forEach((function(e) {
            e.activeTargets.splice(0, e.activeTargets.length),
            e.skippedTargets.splice(0, e.skippedTargets.length),
            e.observationTargets.forEach((function(i) {
                i.isActive() && (w(i.target) > t ? e.activeTargets.push(i) : e.skippedTargets.push(i))
            }
            ))
        }
        ))
    }, L = function() {
        var t, s = 0;
        for (y(s); e.some((function(t) {
            return t.activeTargets.length > 0
        }
        )); )
            s = Y(),
            y(s);
        return e.some((function(t) {
            return t.skippedTargets.length > 0
        }
        )) && ("function" == typeof ErrorEvent ? t = new ErrorEvent("error",{
            message: i
        }) : ((t = document.createEvent("Event")).initEvent("error", !1, !1),
        t.message = i),
        window.dispatchEvent(t)),
        s > 0
    }, A = [], b = function(t) {
        if (!s) {
            var e = 0
              , i = document.createTextNode("");
            new MutationObserver((function() {
                return A.splice(0).forEach((function(t) {
                    return t()
                }
                ))
            }
            )).observe(i, {
                characterData: !0
            }),
            s = function() {
                i.textContent = "".concat(e ? e-- : e++)
            }
        }
        A.push(t),
        s()
    }, S = 0, E = {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    }, K = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"], x = function(t) {
        return void 0 === t && (t = 0),
        Date.now() + t
    }, I = !1, B = new (function() {
        function t() {
            var t = this;
            this.stopped = !0,
            this.listener = function() {
                return t.schedule()
            }
        }
        return t.prototype.run = function(t) {
            var e = this;
            if (void 0 === t && (t = 250),
            !I) {
                I = !0;
                var i, s = x(t);
                i = function() {
                    var i = !1;
                    try {
                        i = L()
                    } finally {
                        if (I = !1,
                        t = s - x(),
                        !S)
                            return;
                        i ? e.run(1e3) : t > 0 ? e.run(t) : e.start()
                    }
                }
                ,
                b((function() {
                    requestAnimationFrame(i)
                }
                ))
            }
        }
        ,
        t.prototype.schedule = function() {
            this.stop(),
            this.run()
        }
        ,
        t.prototype.observe = function() {
            var t = this
              , e = function() {
                return t.observer && t.observer.observe(document.body, E)
            };
            document.body ? e() : l.addEventListener("DOMContentLoaded", e)
        }
        ,
        t.prototype.start = function() {
            var t = this;
            this.stopped && (this.stopped = !1,
            this.observer = new MutationObserver(this.listener),
            this.observe(),
            K.forEach((function(e) {
                return l.addEventListener(e, t.listener, !0)
            }
            )))
        }
        ,
        t.prototype.stop = function() {
            var t = this;
            this.stopped || (this.observer && this.observer.disconnect(),
            K.forEach((function(e) {
                return l.removeEventListener(e, t.listener, !0)
            }
            )),
            this.stopped = !0)
        }
        ,
        t
    }()), f = function(t) {
        !S && t > 0 && B.start(),
        !(S += t) && B.stop()
    }, J = function() {
        function e(e, i) {
            this.target = e,
            this.observedBox = i || t.CONTENT_BOX,
            this.lastReportedSize = {
                inlineSize: 0,
                blockSize: 0
            }
        }
        return e.prototype.isActive = function() {
            var t, e = F(this.target, this.observedBox, !0);
            return t = this.target,
            a(t) || function(t) {
                switch (t.tagName) {
                case "INPUT":
                    if ("image" !== t.type)
                        break;
                case "VIDEO":
                case "AUDIO":
                case "EMBED":
                case "OBJECT":
                case "CANVAS":
                case "IFRAME":
                case "IMG":
                    return !0
                }
                return !1
            }(t) || "inline" !== getComputedStyle(t).display || (this.lastReportedSize = e),
            this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize
        }
        ,
        e
    }(), k = function(t, e) {
        this.activeTargets = [],
        this.skippedTargets = [],
        this.observationTargets = [],
        this.observer = t,
        this.callback = e
    }, D = new WeakMap, q = function(t, e) {
        for (var i = 0; i < t.length; i += 1)
            if (t[i].target === e)
                return i;
        return -1
    }, Z = function() {
        function t() {}
        return t.connect = function(t, e) {
            var i = new k(t,e);
            D.set(t, i)
        }
        ,
        t.observe = function(t, i, s) {
            var r = D.get(t)
              , n = 0 === r.observationTargets.length;
            q(r.observationTargets, i) < 0 && (n && e.push(r),
            r.observationTargets.push(new J(i,s && s.box)),
            f(1),
            B.schedule())
        }
        ,
        t.unobserve = function(t, i) {
            var s = D.get(t)
              , r = q(s.observationTargets, i)
              , n = 1 === s.observationTargets.length;
            r >= 0 && (n && e.splice(e.indexOf(s), 1),
            s.observationTargets.splice(r, 1),
            f(-1))
        }
        ,
        t.disconnect = function(t) {
            var e = this
              , i = D.get(t);
            i.observationTargets.slice().forEach((function(i) {
                return e.unobserve(t, i.target)
            }
            )),
            i.activeTargets.splice(0, i.activeTargets.length)
        }
        ,
        t
    }(), O = function() {
        function t(t) {
            if (0 === arguments.length)
                throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
            if ("function" != typeof t)
                throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
            Z.connect(this, t)
        }
        return t.prototype.observe = function(t, e) {
            if (0 === arguments.length)
                throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!c(t))
                throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Z.observe(this, t, e)
        }
        ,
        t.prototype.unobserve = function(t) {
            if (0 === arguments.length)
                throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
            if (!c(t))
                throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
            Z.unobserve(this, t)
        }
        ,
        t.prototype.disconnect = function() {
            Z.disconnect(this)
        }
        ,
        t.toString = function() {
            return "function ResizeObserver () { [polyfill code] }"
        }
        ,
        t
    }();
    var N = {
        chisato: {
            image: "/config/img/chisato.png",
            initialState: {
                i: .08,
                s: .1,
                d: .99,
                r: 1,
                y: 40,
                t: 0,
                w: 0
            }
        },
        takina: {
            image: "/config/img/takina.png",
            initialState: {
                i: .08,
                s: .1,
                d: .988,
                r: 12,
                y: 2,
                t: 0,
                w: 0
            }
        }
    };
    function R(t) {
        const e = typeof t;
        return null != t && ("object" === e || "function" === e)
    }
    function U(t) {
        return "function" == typeof window.structuredClone ? window.structuredClone(t) : JSON.parse(JSON.stringify(t))
    }
    function M(t, e) {
        const i = U(t)
          , s = U(e);
        return R(i) && R(s) ? (Object.keys(s).forEach((t=>{
            R(s[t]) ? (R(i[t]) || (i[t] = {}),
            i[t] = M(i[t], s[t])) : i[t] = s[t]
        }
        )),
        i) : i
    }
    function G(t) {
        let e, i = null;
        return function(...s) {
            var r;
            e = s,
            null === i && (i = requestAnimationFrame((r = this,
            ()=>{
                i = null,
                t.apply(r, e)
            }
            )))
        }
    }
    /*! sakana-widget | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
    const z = {
        size: 200,
        autoFit: !1,
        character: "chisato",
        controls: !0,
        rod: !0,
        draggable: !0,
        stroke: {
            color: "#b4b4b4",
            width: 10
        },
        threshold: .1,
        rotate: 0,
        title: !1
    };
    let T = null;
    function Q() {
        T || (T = {},
        Object.keys(N).forEach((t=>{
            const e = N[t];
            T[t] = U(e)
        }
        )))
    }
    class X {
        constructor(t={}) {
            this._lastRunUnix = Date.now(),
            this._frameUnix = 1e3 / 60,
            this._running = !0,
            this._magicForceTimeout = 0,
            this._magicForceEnabled = !1,
            this._resizeObserver = null,
            this._updateLimit = t=>{
                let e = t / 5;
                e < 30 ? e = 30 : e > 60 && (e = 60);
                const i = t / 4
                  , s = -i;
                this._limit = {
                    maxR: e,
                    maxY: i,
                    minY: s
                }
            }
            ,
            this._updateSize = t=>{
                this._options.size = t,
                this._imageSize = this._options.size / 1.25,
                this._canvasSize = 1.5 * this._options.size,
                this._domApp.style.width = `${t}px`,
                this._domApp.style.height = `${t}px`,
                this._domCanvas.style.width = `${this._canvasSize}px`,
                this._domCanvas.style.height = `${this._canvasSize}px`;
                const e = function(t, e, i=2 * (window.devicePixelRatio || 1)) {
                    const s = e * i;
                    t.width = s,
                    t.height = s;
                    const r = t.getContext("2d");
                    return r ? (r.setTransform(1, 0, 0, 1, 0, 0),
                    r.scale(i, i),
                    r) : null
                }(this._domCanvas, this._canvasSize);
                if (!e)
                    throw new Error("Invalid canvas context");
                this._domCanvasCtx = e,
                this._draw(),
                this._domMain.style.width = `${t}px`,
                this._domMain.style.height = `${t}px`,
                this._domImage.style.width = `${this._imageSize}px`,
                this._domImage.style.height = `${this._imageSize}px`,
                this._domImage.style.transformOrigin = `50% ${t}px`
            }
            ,
            this._updateDom = ()=>{
                const t = document.createElement("div");
                t.className = "sakana-widget-wrapper",
                this._domWrapper = t;
                const e = document.createElement("div");
                e.className = "sakana-widget-app",
                this._domApp = e,
                t.appendChild(e);
                const i = document.createElement("canvas");
                i.className = "sakana-widget-canvas",
                this._domCanvas = i,
                e.appendChild(i);
                const s = document.createElement("div");
                s.className = "sakana-widget-main",
                this._domMain = s,
                e.appendChild(s);
                const r = document.createElement("div");
                r.className = "sakana-widget-img",
                r.style.backgroundImage = `url('${this._image}')`,
                this._domImage = r,
                s.appendChild(r);
                const n = document.createElement("div");
                n.className = "sakana-widget-ctrl",
                this._options.controls && s.appendChild(n);
                const o = "sakana-widget-ctrl-item"
                  , a = document.createElement("div");
                a.className = o,
                a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="sakana-widget-icon" viewBox="0 0 512 512"><path fill="currentColor" d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32 124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58 4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z"/><path fill="currentColor" d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"/></svg>',
                a.role = "button",
                a.tabIndex = 0,
                this._options.title && (a.title = "Next Character"),
                this._domCtrlPerson = a,
                n.appendChild(a);
                const h = document.createElement("div");
                h.className = o,
                h.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="sakana-widget-icon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M351.82 271.87v-16A96.15 96.15 0 0 0 184.09 192m-24.2 48.17v16A96.22 96.22 0 0 0 327.81 320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m135.87 256 23.59-23.6 24.67 23.6m192 0-23.59 23.6-24.67-23.6"/></svg>',
                h.role = "button",
                h.tabIndex = 0,
                this._options.title && (h.title = "Auto Mode"),
                this._domCtrlMagic = h,
                n.appendChild(h);
                const c = document.createElement("a");
                c.className = o,
                c.href = "//github.com/dsrkafuu/sakana-widget",
                c.target = "_blank",
                c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="sakana-widget-icon" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/></svg>',
                this._options.title && (c.title = "GitHub Repository"),
                n.appendChild(c);
                const l = document.createElement("div");
                l.className = o,
                l.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="sakana-widget-icon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320 192 192m0 128 128-128"/></svg>',
                l.role = "button",
                l.tabIndex = 0,
                this._options.title && (l.title = "Close"),
                this._domCtrlClose = l,
                n.appendChild(l)
            }
            ,
            this._calcCenterPoint = (t,e,i,s)=>{
                const r = Math.PI / 180 * t
                  , n = Math.cos(r)
                  , o = Math.sin(r);
                return {
                    nx: o * e + n * i - o * s,
                    ny: n * e - n * s - o * i
                }
            }
            ,
            this._draw = ()=>{
                const {r: t, y: e} = this._state
                  , {size: i, controls: s, stroke: r} = this._options
                  , n = this._domImage
                  , o = this._imageSize
                  , a = this._domCanvasCtx
                  , h = 1 * t;
                if (n.style.transform = `rotate(${t}deg) translateX(${h}px) translateY(${e}px)`,
                a.clearRect(0, 0, this._canvasSize, this._canvasSize),
                a.save(),
                a.translate(this._canvasSize / 2, i + (this._canvasSize - i) / 2),
                a.strokeStyle = r.color,
                a.lineWidth = r.width,
                a.lineCap = "round",
                this._options.rod && a.beginPath(),
                s ? a.moveTo(0, -10) : a.moveTo(0, 10),
                this._options.rod) {
                    const s = i - o / 2
                      , {nx: r, ny: n} = this._calcCenterPoint(t, s, h, e);
                    a.lineTo(r, -n),
                    a.stroke()
                }
                a.restore()
            }
            ,
            this._run = ()=>{
                let t = this._options.rotate;
                t = Math.min(120, Math.max(0, t));
                const e = this._options.threshold;
                if (!this._running)
                    return;
                let {r: i, y: s, t: r, w: n} = this._state;
                const {d: o, i: a} = this._state
                  , h = Date.now();
                let c = a;
                const l = h - this._lastRunUnix;
                l < 16 && (c = a / this._frameUnix * l),
                this._lastRunUnix = h,
                n = n - 2 * i - t,
                i += n * c * 1.2,
                this._state.w = n * o,
                this._state.r = i,
                r -= 2 * s,
                s += r * c * 2,
                this._state.t = r * o,
                this._state.y = s,
                Math.max(Math.abs(this._state.w), Math.abs(this._state.r), Math.abs(this._state.t), Math.abs(this._state.y)) < e ? this._running = !1 : (this._draw(),
                requestAnimationFrame(this._run))
            }
            ,
            this._move = (t,e)=>{
                const {maxR: i, maxY: s, minY: r} = this._limit;
                let n = t * this._state.s;
                n = Math.max(-i, n),
                n = Math.min(i, n),
                e = e * this._state.s * 2,
                e = Math.max(r, e),
                e = Math.min(s, e),
                this._state.r = n,
                this._state.y = e,
                this._state.w = 0,
                this._state.t = 0,
                this._draw()
            }
            ,
            this._onMouseDown = t=>{
                t.preventDefault(),
                this._running = !1;
                const {pageY: e} = t
                  , i = e;
                this._state.w = 0,
                this._state.t = 0;
                const s = t=>{
                    const e = this._domMain.getBoundingClientRect()
                      , s = e.left + e.width / 2
                      , {pageX: r, pageY: n} = t
                      , o = r - s
                      , a = n - i;
                    this._move(o, a)
                }
                  , r = ()=>{
                    document.removeEventListener("mousemove", s),
                    document.removeEventListener("mouseup", r),
                    this._running = !0,
                    requestAnimationFrame(this._run)
                }
                ;
                document.addEventListener("mousemove", s),
                document.addEventListener("mouseup", r)
            }
            ,
            this._onTouchStart = t=>{
                if (t.preventDefault(),
                this._running = !1,
                !t.touches[0])
                    return;
                const {pageY: e} = t.touches[0]
                  , i = e;
                this._state.w = 0,
                this._state.t = 0;
                const s = t=>{
                    if (!t.touches[0])
                        return;
                    const e = this._domMain.getBoundingClientRect()
                      , s = e.left + e.width / 2
                      , {pageX: r, pageY: n} = t.touches[0]
                      , o = r - s
                      , a = n - i;
                    this._move(o, a)
                }
                  , r = ()=>{
                    document.removeEventListener("touchmove", s),
                    document.removeEventListener("touchend", r),
                    this._running = !0,
                    requestAnimationFrame(this._run)
                }
                ;
                document.addEventListener("touchmove", s),
                document.addEventListener("touchend", r)
            }
            ,
            this._magicForce = ()=>{
                if (Math.random() < .1) {
                    const t = Object.keys(T)
                      , e = t[Math.floor(Math.random() * t.length)];
                    this.setCharacter(e)
                } else
                    this._state.t = this._state.t + 150 * (Math.random() - .5),
                    this._state.w = this._state.w + 200 * (Math.random() - .5);
                this._running || (this._running = !0,
                requestAnimationFrame(this._run)),
                this._magicForceTimeout = window.setTimeout(this._magicForce, 3e3 * Math.random() + 2e3)
            }
            ,
            this.triggerAutoMode = ()=>{
                this._magicForceEnabled = !this._magicForceEnabled;
                const t = this._domCtrlMagic.querySelector("svg");
                this._magicForceEnabled ? t.classList.add("sakana-widget-icon--rotate") : t.classList.remove("sakana-widget-icon--rotate"),
                clearTimeout(this._magicForceTimeout),
                this._magicForceEnabled && (this._magicForceTimeout = window.setTimeout(this._magicForce, 1e3 * Math.random() + 500))
            }
            ,
            this.setState = t=>(this._state || (this._state = {}),
            this._state = M(this._state, U(t)),
            this),
            this.setCharacter = t=>{
                const e = T[t];
                if (!e)
                    throw new Error(`invalid character ${t}`);
                return this._char = t,
                this._image = e.image,
                this.setState(e.initialState),
                this._domImage && (this._domImage.style.backgroundImage = `url('${this._image}')`),
                this
            }
            ,
            this.nextCharacter = ()=>{
                const t = Object.keys(X.getCharacters()).sort()
                  , e = t.indexOf(this._char)
                  , i = t[(e + 1) % t.length];
                return this.setCharacter(i),
                this
            }
            ,
            this._onResize = t=>{
                let e = Math.min(t.width, t.height);
                e = Math.max(120, e),
                this._updateSize(e),
                this._updateLimit(e)
            }
            ,
            this.mount = t=>{
                let e;
                if (e = "string" == typeof t ? document.querySelector(t) : t,
                !e)
                    throw new Error("Invalid mounting element");
                const i = e.parentNode;
                if (!i)
                    throw new Error("Invalid mounting element parent");
                this._options.draggable && (this._domImage.addEventListener("mousedown", this._onMouseDown),
                this._domImage.addEventListener("touchstart", this._onTouchStart)),
                this._domCtrlPerson.addEventListener("click", this.nextCharacter),
                this._domCtrlMagic.addEventListener("click", this.triggerAutoMode),
                this._domCtrlClose.addEventListener("click", this.unmount),
                this._options.autoFit && (this._onResize(this._domWrapper.getBoundingClientRect()),
                this._resizeObserver = new O(G((t=>{
                    t && t[0] && this._onResize(t[0].contentRect)
                }
                ))),
                this._resizeObserver.observe(this._domWrapper));
                const s = e.cloneNode(!1);
                return s.appendChild(this._domWrapper),
                i.replaceChild(s, e),
                requestAnimationFrame(this._run),
                this
            }
            ,
            this.unmount = ()=>{
                this._domImage.removeEventListener("mousedown", this._onMouseDown),
                this._domImage.removeEventListener("touchstart", this._onTouchStart),
                this._domCtrlPerson.removeEventListener("click", this.nextCharacter),
                this._domCtrlMagic.removeEventListener("click", this.triggerAutoMode),
                this._domCtrlClose.removeEventListener("click", this.unmount),
                this._resizeObserver && this._resizeObserver.disconnect();
                const t = this._domWrapper.parentNode;
                if (!t)
                    throw new Error("Invalid mounting element");
                return t.removeChild(this._domWrapper),
                this
            }
            ,
            null == T && Q(),
            this._options = U(z),
            this._options = M(this._options, t),
            this.setCharacter(this._options.character),
            this._updateDom(),
            this._updateSize(this._options.size),
            this._updateLimit(this._options.size)
        }
    }
    return X.getCharacter = t=>{
        null == T && Q();
        const e = T[t];
        return e ? U(e) : null
    }
    ,
    X.getCharacters = ()=>(null == T && Q(),
    U(T)),
    X.registerCharacter = (t,e)=>{
        const i = U(e);
        let s = i.initialState.i;
        s = Math.min(.5, Math.max(0, s)),
        i.initialState.i = s,
        T[t] = i
    }
    ,
    X
}
));
//# sourceMappingURL=sakana.min.js.map
