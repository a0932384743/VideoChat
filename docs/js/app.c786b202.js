(function(e) {
    function t(t) {
        for (var o, a, s = t[0], c = t[1], u = t[2], d = 0, l = []; d < s.length; d++)
            a = s[d],
            Object.prototype.hasOwnProperty.call(r, a) && r[a] && l.push(r[a][0]),
            r[a] = 0;
        for (o in c)
            Object.prototype.hasOwnProperty.call(c, o) && (e[o] = c[o]);
        f && f(t);
        while (l.length)
            l.shift()();
        return i.push.apply(i, u || []),
        n()
    }
    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], o = !0, a = 1; a < n.length; a++) {
                var s = n[a];
                0 !== r[s] && (o = !1)
            }
            o && (i.splice(t--, 1),
            e = c(c.s = n[0]))
        }
        return e
    }
    var o = {}
      , a = {
        1: 0
    }
      , r = {
        1: 0
    }
      , i = [];
    function s(e) {
        return c.p + "js/" + ({}[e] || e) + "." + {
            2: "3bb611b1",
            3: "d08df2cb",
            4: "7a6c64d9",
            5: "6c4561e7",
            6: "e046e213",
            7: "a9b05e29",
            8: "0bac004c",
            9: "56e16909",
            10: "0732ac6f",
            11: "816e0d65",
            12: "33f4b0b8",
            13: "0522e234",
            14: "f364c5a1",
            15: "c0bca5a8",
            16: "561b8124"
        }[e] + ".js"
    }
    function c(t) {
        if (o[t])
            return o[t].exports;
        var n = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, c),
        n.l = !0,
        n.exports
    }
    c.e = function(e) {
        var t = []
          , n = {
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            6: 1,
            7: 1,
            8: 1,
            9: 1
        };
        a[e] ? t.push(a[e]) : 0 !== a[e] && n[e] && t.push(a[e] = new Promise((function(t, n) {
            for (var o = "VideoChat/css/" + ({}[e] || e) + "." + {
                2: "5bc25301",
                3: "3b206dcb",
                4: "42156d82",
                5: "2cf7f828",
                6: "f0a7d220",
                7: "0fb7f5c3",
                8: "337dbb40",
                9: "6e38b696",
                10: "31d6cfe0",
                11: "31d6cfe0",
                12: "31d6cfe0",
                13: "31d6cfe0",
                14: "31d6cfe0",
                15: "31d6cfe0",
                16: "31d6cfe0"
            }[e] + ".css", r = c.p + o, i = document.getElementsByTagName("link"), s = 0; s < i.length; s++) {
                var u = i[s]
                  , d = u.getAttribute("data-href") || u.getAttribute("href");
                if ("stylesheet" === u.rel && (d === o || d === r))
                    return t()
            }
            var l = document.getElementsByTagName("style");
            for (s = 0; s < l.length; s++) {
                u = l[s],
                d = u.getAttribute("data-href");
                if (d === o || d === r)
                    return t()
            }
            var f = document.createElement("link");
            f.rel = "stylesheet",
            f.type = "text/css",
            f.onload = t,
            f.onerror = function(t) {
                var o = t && t.target && t.target.src || r
                  , i = new Error("Loading CSS chunk " + e + " failed.\n(" + o + ")");
                i.code = "CSS_CHUNK_LOAD_FAILED",
                i.request = o,
                delete a[e],
                f.parentNode.removeChild(f),
                n(i)
            }
            ,
            f.href = r;
            var m = document.getElementsByTagName("head")[0];
            m.appendChild(f)
        }
        )).then((function() {
            a[e] = 0
        }
        )));
        var o = r[e];
        if (0 !== o)
            if (o)
                t.push(o[2]);
            else {
                var i = new Promise((function(t, n) {
                    o = r[e] = [t, n]
                }
                ));
                t.push(o[2] = i);
                var u, d = document.createElement("script");
                d.charset = "utf-8",
                d.timeout = 120,
                c.nc && d.setAttribute("nonce", c.nc),
                d.src = s(e);
                var l = new Error;
                u = function(t) {
                    d.onerror = d.onload = null,
                    clearTimeout(f);
                    var n = r[e];
                    if (0 !== n) {
                        if (n) {
                            var o = t && ("load" === t.type ? "missing" : t.type)
                              , a = t && t.target && t.target.src;
                            l.message = "Loading chunk " + e + " failed.\n(" + o + ": " + a + ")",
                            l.name = "ChunkLoadError",
                            l.type = o,
                            l.request = a,
                            n[1](l)
                        }
                        r[e] = void 0
                    }
                }
                ;
                var f = setTimeout((function() {
                    u({
                        type: "timeout",
                        target: d
                    })
                }
                ), 12e4);
                d.onerror = d.onload = u,
                document.head.appendChild(d)
            }
        return Promise.all(t)
    }
    ,
    c.m = e,
    c.c = o,
    c.d = function(e, t, n) {
        c.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    c.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    c.t = function(e, t) {
        if (1 & t && (e = c(e)),
        8 & t)
            return e;
        if (4 & t && "object" === typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (c.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var o in e)
                c.d(n, o, function(t) {
                    return e[t]
                }
                .bind(null, o));
        return n
    }
    ,
    c.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        }
        : function() {
            return e
        }
        ;
        return c.d(t, "a", t),
        t
    }
    ,
    c.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    c.p = "/VideoChat/",
    c.oe = function(e) {
        throw console.error(e),
        e
    }
    ;
    var u = window["webpackJsonp"] = window["webpackJsonp"] || []
      , d = u.push.bind(u);
    u.push = t,
    u = u.slice();
    for (var l = 0; l < u.length; l++)
        t(u[l]);
    var f = d;
    i.push([0, 0]),
    n()
}
)({
    0: function(e, t, n) {
        e.exports = n("2f39")
    },
    "0047": function(e, t, n) {},
    1: function(e, t) {},
    "2f39": function(e, t, n) {
        "use strict";
        n.r(t);
        n("5319"),
        n("7d6e"),
        n("e54f"),
        n("4439"),
        n("4605"),
        n("f580"),
        n("5b2b"),
        n("8753"),
        n("2967"),
        n("7e67"),
        n("d770"),
        n("dd82"),
        n("922c"),
        n("d7fb"),
        n("a533"),
        n("c32e"),
        n("a151"),
        n("8bc7"),
        n("e80f"),
        n("5fec"),
        n("e42f"),
        n("57fc"),
        n("d67f"),
        n("880e"),
        n("1c10"),
        n("9482"),
        n("e797"),
        n("4848"),
        n("53d0"),
        n("63b1"),
        n("e9fd"),
        n("195c"),
        n("64e9"),
        n("33c5"),
        n("4f62"),
        n("0dbc"),
        n("7c38"),
        n("0756"),
        n("4953"),
        n("81db"),
        n("2e52"),
        n("2248"),
        n("7797"),
        n("12a1"),
        n("ce96"),
        n("70ca"),
        n("2318"),
        n("24bd"),
        n("8f27"),
        n("3064"),
        n("c9a2"),
        n("8767"),
        n("4a8e"),
        n("b828"),
        n("3c1c"),
        n("21cb"),
        n("c00e"),
        n("e4a8"),
        n("e4d3"),
        n("f4d9"),
        n("fffd"),
        n("f645"),
        n("639e"),
        n("34ee"),
        n("b794"),
        n("af24"),
        n("7c9c"),
        n("7bb2"),
        n("64f7"),
        n("c382"),
        n("053c"),
        n("c48f"),
        n("f5d1"),
        n("3cec"),
        n("c00ee"),
        n("d450"),
        n("ca07"),
        n("14e3"),
        n("9393"),
        n("9227"),
        n("1dba"),
        n("674a"),
        n("de26"),
        n("6721"),
        n("9cb5"),
        n("ed9b"),
        n("fc83"),
        n("98e5"),
        n("605a"),
        n("ba60"),
        n("df07"),
        n("7903"),
        n("e046"),
        n("58af"),
        n("7713"),
        n("0571"),
        n("3e27"),
        n("6837"),
        n("3fc9"),
        n("0693"),
        n("bf41"),
        n("985d"),
        n("0047");
        var o = n("2b0e")
          , a = n("1f91")
          , r = n("42d2")
          , i = n("b05d")
          , s = n("2a19")
          , c = n("f508")
          , u = n("436b")
          , d = n("18d6")
          , l = n("515f");
        o["a"].use(i["a"], {
            config: {
                notify: {
                    position: "top-right",
                    timeout: 2500,
                    textColor: "white",
                    actions: [{
                        icon: "close",
                        color: "white"
                    }]
                }
            },
            lang: a["a"],
            iconSet: r["a"],
            plugins: {
                Notify: s["a"],
                Loading: c["a"],
                Dialog: u["a"],
                LocalStorage: d["a"],
                Cookies: l["a"]
            }
        });
        var f = function() {
            var e = this
              , t = e.$createElement
              , n = e._self._c || t;
            return e.isLoading ? n("div", {
                attrs: {
                    id: "q-app"
                }
            }, [n("router-view")], 1) : e._e()
        }
          , m = []
          , p = n("60a3")
          , h = n("a6c8")
          , b = function(e, t, n, o) {
            var a, r = arguments.length, i = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" === typeof Reflect && "function" === typeof Reflect.decorate)
                i = Reflect.decorate(e, t, n, o);
            else
                for (var s = e.length - 1; s >= 0; s--)
                    (a = e[s]) && (i = (r < 3 ? a(i) : r > 3 ? a(t, n, i) : a(t, n)) || i);
            return r > 3 && i && Object.defineProperty(t, n, i),
            i
        };
        let g = class extends p["d"] {
            constructor() {
                super(...arguments),
                this.isLoading = !1
            }
            mounted() {
                h["b"].onAuthStateChanged((e=>{
                    this.$store.dispatch("authModule/authStateChanged", e).then((()=>{
                        !this.$store.state.authModule.authenticated && this.$route.meta.ifAuthenticated && this.$router.push({
                            name: "SignIn"
                        }),
                        this.isLoading = !0
                    }
                    ))
                }
                ))
            }
        }
        ;
        g = b([p["a"]], g);
        var y = g
          , v = y
          , w = (n("5c0b"),
        n("2877"))
          , P = Object(w["a"])(v, f, m, !1, null, null, null)
          , U = P.exports
          , A = n("2f62");
        const S = {
            namespaced: !0,
            state: {
                appName: "Adjoined"
            },
            actions: {},
            mutations: {}
        };
        var j = S
          , C = function(e, t, n, o) {
            function a(e) {
                return e instanceof n ? e : new n((function(t) {
                    t(e)
                }
                ))
            }
            return new (n || (n = Promise))((function(n, r) {
                function i(e) {
                    try {
                        c(o.next(e))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(e) {
                    try {
                        c(o["throw"](e))
                    } catch (t) {
                        r(t)
                    }
                }
                function c(e) {
                    e.done ? n(e.value) : a(e.value).then(i, s)
                }
                c((o = o.apply(e, t || [])).next())
            }
            ))
        };
        const O = {
            namespaced: !0,
            state: {
                authenticated: !1,
                guest: !1
            },
            getters: {
                isAuth(e) {
                    return e.authenticated
                },
                isGuest(e) {
                    return e.guest
                }
            },
            actions: {
                login: ({commit: e, dispatch: t},n)=>h["b"].signInWithEmailAndPassword(n.email, n.password).then((n=>{
                    const o = n.user && n.user.uid;
                    if (!o)
                        throw new Error("User does not exist");
                    if (n.user && !n.user.emailVerified)
                        throw t("logout"),
                        new Error("Please verify your email");
                    return e("authStateChanged", n.user),
                    t("userModule/loginUser", {
                        uid: o
                    }, {
                        root: !0
                    })
                }
                )),
                resetPassword: ()=>{
                    const {email: e} = h["b"].currentUser;
                    return h["b"].sendPasswordResetEmail(e)
                }
                ,
                verifyPasswordResetCode: ({},{actionCode: e})=>h["b"].verifyPasswordResetCode(e),
                confirmPasswordReset: ({},{actionCode: e, password: t})=>h["b"].confirmPasswordReset(e, t),
                applyActionCode: ({},{actionCode: e})=>h["b"].applyActionCode(e),
                logout: ({commit: e})=>h["b"].signOut().then((()=>{
                    e("authStateChanged")
                }
                )),
                loginAsGuest: ({commit: e, dispatch: t})=>h["b"].signInAnonymously().then((n=>C(void 0, void 0, void 0, (function*() {
                    const {user: o} = n;
                    return e("setGuest"),
                    o && o.uid ? yield t("userModule/createUser", {
                        uid: o.uid
                    }, {
                        root: !0
                    }) : n
                }
                )))),
                register: ({commit: e, dispatch: t},n)=>h["b"].createUserWithEmailAndPassword(n.email, n.password).then((e=>{
                    h["b"].currentUser && h["b"].currentUser.sendEmailVerification();
                    const {displayName: o} = n
                      , a = e.user && e.user.uid;
                    if (!a)
                        throw new Error("User does not exist");
                    return t("userModule/createUser", {
                        uid: a,
                        displayName: o
                    }, {
                        root: !0
                    })
                }
                )),
                authToggle: ({commit: e},t)=>{
                    e("authToggle", t)
                }
                ,
                setGuest: ({commit: e})=>{
                    e("setGuest")
                }
                ,
                authStateChanged: ({commit: e, dispatch: t},n)=>(e("authStateChanged", n),
                t("userModule/authStateChanged", n, {
                    root: !0
                }))
            },
            mutations: {
                authToggle: (e,t)=>{
                    e.authenticated = t,
                    e.guest = !1
                }
                ,
                setGuest: e=>{
                    e.authenticated = !0,
                    e.guest = !0
                }
                ,
                authStateChanged: (e,t)=>{
                    e.authenticated = t && !t.isAnonymous && t.emailVerified,
                    e.guest = !t || t.isAnonymous || !t.emailVerified
                }
            }
        };
        var E = O
          , x = function(e, t, n, o) {
            function a(e) {
                return e instanceof n ? e : new n((function(t) {
                    t(e)
                }
                ))
            }
            return new (n || (n = Promise))((function(n, r) {
                function i(e) {
                    try {
                        c(o.next(e))
                    } catch (t) {
                        r(t)
                    }
                }
                function s(e) {
                    try {
                        c(o["throw"](e))
                    } catch (t) {
                        r(t)
                    }
                }
                function c(e) {
                    e.done ? n(e.value) : a(e.value).then(i, s)
                }
                c((o = o.apply(e, t || [])).next())
            }
            ))
        };
        const N = {
            namespaced: !0,
            state: {
                uid: "",
                email: "",
                displayName: "",
                emailVerified: !1,
                isPremium: !1,
                photoURL: "",
                profile: {}
            },
            actions: {
                loginUser: ({commit: e},t)=>h["c"].collection("users").doc(t.uid).get().then((n=>{
                    const o = Object.assign({
                        uid: t.uid
                    }, n.data());
                    return e("setUser", o),
                    o
                }
                )),
                authStateChanged({commit: e, dispatch: t}, n) {
                    return x(this, void 0, void 0, (function*() {
                        if (!n)
                            return t("unsetUser", null);
                        const o = yield h["c"].collection("users").doc(n.uid).get();
                        e("setUser", Object.assign(Object.assign({
                            uid: n.uid
                        }, o.data()), n))
                    }
                    ))
                },
                loadUserProfile({commit: e, state: t}, n) {
                    return h["c"].collection(`users/${n || t.uid}/details`).doc(n || t.uid).get().then((t=>{
                        const o = t.data();
                        return n || e("updateProfile", o),
                        o
                    }
                    ))
                },
                onSetPremium({commit: e, state: t}) {
                    return h["c"].collection("users").doc(t.uid).update({
                        isPremium: !t.isPremium
                    }).then((()=>(e("setPremium", !t.isPremium),
                    t.isPremium)))
                },
                setUser: ({commit: e},t)=>(e("setUser", t),
                !0),
                setGuestUser: ({commit: e},t)=>{
                    e("setGuestUser", t)
                }
                ,
                unsetUser: ({commit: e})=>{
                    e("unsetUser")
                }
                ,
                setRating: ({commit: e},t)=>h["c"].collection("ratings").add(t),
                updateProfile({commit: e, dispatch: t, state: n}, o) {
                    const {user: a, profile: r} = o;
                    return h["b"].currentUser && a.displayName && h["b"].currentUser.updateProfile({
                        displayName: a.displayName
                    }),
                    t("updateUser", {
                        data: o.user
                    }),
                    h["c"].collection("users").doc(n.uid).collection("details").doc(n.uid).set(r).then((t=>{
                        console.log(t),
                        e("updateProfile", r),
                        e("updateUserName", a.displayName)
                    }
                    ))
                },
                createUser: ({},e)=>h["c"].collection("users").doc(e.uid).set({
                    displayName: e.displayName || "",
                    isPremium: !1,
                    createdAt: h["e"].FieldValue.serverTimestamp()
                }),
                updateUser: ({commit: e, state: t},n)=>h["c"].collection("users").doc(n.uid || t.uid).update(n.data),
                setToStateUserEmail({commit: e}, t) {
                    e("setToStateUserEmail", t)
                },
                uploadAvatar: ({commit: e, dispatch: t},n)=>h["d"].ref(`users/${n.uid}/`).child(n.file.name).put(n.file).then((n=>{
                    n.ref.getDownloadURL().then((n=>x(void 0, void 0, void 0, (function*() {
                        e("uploadAvatar", n);
                        const o = {
                            photoURL: n
                        };
                        return h["b"].currentUser && (yield h["b"].currentUser.updateProfile(o)),
                        t("updateUser", {
                            data: o
                        })
                    }
                    ))))
                }
                ))
            },
            mutations: {
                updateUserName: (e,t)=>{
                    e.displayName = t
                }
                ,
                setToStateUserEmail: (e,t)=>{
                    e.email = t
                }
                ,
                uploadAvatar: (e,t)=>{
                    e.photoURL = t
                }
                ,
                updateProfile: (e,t)=>{
                    e.profile = t
                }
                ,
                setPremium: (e,t)=>{
                    e.isPremium = t
                }
                ,
                setUser: (e,t)=>{
                    e.uid = t.uid || "",
                    e.email = t.email || "",
                    e.displayName = t.displayName || "",
                    e.photoURL = t.photoURL || "",
                    e.emailVerified = t.emailVerified || !1,
                    e.isPremium = t.isPremium || !1,
                    e.profile = t.profile || {}
                }
                ,
                setGuestUser: (e,t)=>{
                    e.uid = t.uid
                }
                ,
                unsetUser: e=>{
                    e.uid = "",
                    e.email = "",
                    e.displayName = "",
                    e.photoURL = "",
                    e.emailVerified = !1
                }
            }
        };
        var R = N;
        o["a"].use(A["a"]);
        var L = new A["a"].Store({
            strict: !0,
            modules: {
                appModule: j,
                authModule: E,
                userModule: R
            }
        })
          , V = n("4bde")
          , M = n("8c4f");
        const T = [{
            path: "/",
            name: "Welcome",
            component: ()=>Promise.all([n.e(0), n.e(6)]).then(n.bind(null, "35a8"))
        }, {
            path: "/auth",
            name: "Auth",
            redirect: "/auth/sign-in",
            component: ()=>Promise.all([n.e(0), n.e(7)]).then(n.bind(null, "fa72")),
            children: [{
                path: "sign-in",
                name: "SignIn",
                component: ()=>Promise.all([n.e(0), n.e(10)]).then(n.bind(null, "a1c0"))
            }, {
                path: "sign-up",
                name: "SignUp",
                component: ()=>Promise.all([n.e(0), n.e(11)]).then(n.bind(null, "f789"))
            }, {
                path: "forgot-password",
                name: "ForgotPassword",
                component: ()=>Promise.all([n.e(0), n.e(13)]).then(n.bind(null, "66e9"))
            }, {
                path: "reset-password/:token",
                name: "ResetPassword",
                component: ()=>Promise.all([n.e(0), n.e(14)]).then(n.bind(null, "6127"))
            }]
        }, {
            path: "/video-chat",
            component: ()=>Promise.all([n.e(0), n.e(3)]).then(n.bind(null, "713b")),
            redirect: "/video-chat/start-matching",
            children: [{
                path: "start-matching",
                name: "StartMatching",
                component: ()=>Promise.all([n.e(0), n.e(16)]).then(n.bind(null, "170c")),
                meta: {
                    ifAuthenticated: !0
                }
            }, {
                path: "matching",
                name: "Matching",
                component: ()=>Promise.all([n.e(0), n.e(4)]).then(n.bind(null, "525a")),
                meta: {
                    ifAuthenticated: !0
                }
            }, {
                path: "table/:roomId",
                name: "VideoChatTable",
                component: ()=>Promise.all([n.e(0), n.e(2)]).then(n.bind(null, "7984"))
            }, {
                path: "invite/:roomId",
                name: "VideoChatInviteTable",
                component: ()=>Promise.all([n.e(0), n.e(15)]).then(n.bind(null, "b85c"))
            }, {
                path: "full-room",
                name: "FullRoom",
                component: ()=>Promise.all([n.e(0), n.e(8)]).then(n.bind(null, "da42"))
            }, {
                path: "rating",
                name: "Rating",
                component: ()=>Promise.all([n.e(0), n.e(9)]).then(n.bind(null, "506b")),
                meta: {
                    ifAuthenticated: !0
                }
            }]
        }, {
            path: "/email-actions",
            name: "FirebaseEmailActions",
            component: ()=>Promise.all([n.e(0), n.e(5)]).then(n.bind(null, "bb4c"))
        }, {
            path: "*",
            name: "Error404",
            component: ()=>Promise.all([n.e(0), n.e(12)]).then(n.bind(null, "e51e"))
        }];
        var k = T
          , I = Object(V["route"])((({Vue: e})=>{
            e.use(M["a"]);
            const t = new M["a"]({
                scrollBehavior: ()=>({
                    x: 0,
                    y: 0
                }),
                routes: k,
                mode: "history",
                base: "/"
            });
            return t.beforeEach(((e,t,n)=>{
                n()
            }
            )),
            t
        }
        ))
          , _ = async function() {
            const e = "function" === typeof L ? await L({
                Vue: o["a"]
            }) : L
              , t = "function" === typeof I ? await I({
                Vue: o["a"],
                store: e
            }) : I;
            e.$router = t;
            const n = {
                router: t,
                store: e,
                render: e=>e(U),
                el: "#q-app"
            };
            return {
                app: n,
                store: e,
                router: t
            }
        }
          , G = n("4eb5")
          , $ = n.n(G);
        o["a"].use($.a);
        var D = n("6293")
          , B = n.n(D)
          , q = n("8055");
        window.io = q,
        o["a"].use(B.a);
        var F = o["a"].extend({
            mixins: []
        })
          , W = Object(V["boot"])((({Vue: e})=>{
            e.mixin(F)
        }
        ))
          , K = {
            failed: "Action failed",
            success: "Action was successful"
        }
          , z = {
            "en-us": K
        }
          , J = n("a925");
        o["a"].use(J["a"]);
        const X = new J["a"]({
            locale: "en-us",
            fallbackLocale: "en-us",
            messages: z
        });
        var H = Object(V["boot"])((({app: e})=>{
            e.i18n = X
        }
        ))
          , Q = n("bc3a")
          , Z = n.n(Q)
          , Y = Object(V["boot"])((({Vue: e})=>{
            e.prototype.$axios = Z.a
        }
        ));
        const ee = "/";
        async function te() {
            const {app: e, store: t, router: n} = await _();
            let a = !1;
            const r = e=>{
                a = !0;
                const t = Object(e) === e ? n.resolve(e).route.fullPath : e;
                window.location.href = t
            }
              , i = window.location.href.replace(window.location.origin, "")
              , s = [void 0, h["default"], void 0, W, H, Y];
            for (let u = 0; !1 === a && u < s.length; u++)
                if ("function" === typeof s[u])
                    try {
                        await s[u]({
                            app: e,
                            router: n,
                            store: t,
                            Vue: o["a"],
                            ssrContext: null,
                            redirect: r,
                            urlPath: i,
                            publicPath: ee
                        })
                    } catch (c) {
                        return c && c.url ? void (window.location.href = c.url) : void console.error("[Quasar] boot error:", c)
                    }
            !0 !== a && new o["a"](e)
        }
        te()
    },
    "5c0b": function(e, t, n) {
        "use strict";
        n("ffd0")
    },
    a6c8: function(e, t, n) {
        "use strict";
        n.d(t, "b", (function() {
            return s
        }
        )),
        n.d(t, "c", (function() {
            return c
        }
        )),
        n.d(t, "d", (function() {
            return u
        }
        )),
        n.d(t, "e", (function() {
            return d
        }
        ));
        var o = n("2b0e")
          , a = n("59ca")
          , r = (n("ea7b"),
        n("e71f"),
        n("588e"),
        n("0ff2"));
        o["a"].use(r["a"]);
        const i = {
            apiKey: "AIzaSyAEZhEXkBo332UMUaVX7hKDy1r1WOqcOyU",
            authDomain: "adjoined-b367d.firebaseapp.com",
            databaseURL: "https://adjoined-b367d-default-rtdb.firebaseio.com",
            projectId: "adjoined-b367d",
            storageBucket: "adjoined-b367d.appspot.com",
            messagingSenderId: 0xf59b554af7,
            appId: "1:1054873045751:web:604479465729592f4d61f2"
        };
        a["initializeApp"](i);
        const s = a["auth"]()
          , c = a["firestore"]()
          , u = a["storage"]()
          , {firestore: d} = a
    },
    ffd0: function(e, t, n) {}
});
