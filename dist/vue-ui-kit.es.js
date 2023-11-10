function vn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const F = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Nn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Qe = () => {
}, Sn = /^on[^a-z]/, xn = (e) => Sn.test(e), z = Object.assign, Cn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, On = Object.prototype.hasOwnProperty, w = (e, t) => On.call(e, t), h = Array.isArray, J = (e) => ze(e) === "[object Map]", Mt = (e) => ze(e) === "[object Set]", E = (e) => typeof e == "function", I = (e) => typeof e == "string", Pe = (e) => typeof e == "symbol", N = (e) => e !== null && typeof e == "object", $n = (e) => (N(e) || E(e)) && E(e.then) && E(e.catch), Dt = Object.prototype.toString, ze = (e) => Dt.call(e), Tt = (e) => ze(e).slice(8, -1), Pt = (e) => ze(e) === "[object Object]", Ze = (e) => I(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, zt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Rn = /-(\w)/g, Oe = zt((e) => e.replace(Rn, (t, n) => n ? n.toUpperCase() : "")), $e = zt((e) => e.charAt(0).toUpperCase() + e.slice(1)), ie = (e, t) => !Object.is(e, t), Vn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let pt;
const Be = () => pt || (pt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function D(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = I(s) ? Tn(s) : D(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (I(e) || N(e))
    return e;
}
const In = /;(?![^(]*\))/g, Mn = /:([^]+)/, Dn = /\/\*[^]*?\*\//g;
function Tn(e) {
  const t = {};
  return e.replace(Dn, "").split(In).forEach((n) => {
    if (n) {
      const s = n.split(Mn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ce(e) {
  let t = "";
  if (I(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const s = ce(e[n]);
      s && (t += s + " ");
    }
  else if (N(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const le = (e) => I(e) ? e : e == null ? "" : h(e) || N(e) && (e.toString === Dt || !E(e.toString)) ? JSON.stringify(e, At, 2) : String(e), At = (e, t) => t && t.__v_isRef ? At(e, t.value) : J(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Mt(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : N(t) && !h(t) && !Pt(t) ? String(t) : t;
function ht(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ft;
function Pn(e, t = Ft) {
  t && t.active && t.effects.push(e);
}
function zn() {
  return Ft;
}
const _e = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, kt = (e) => (e.w & U) > 0, jt = (e) => (e.n & U) > 0, An = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= U;
}, Fn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      kt(r) && !jt(r) ? r.delete(e) : t[n++] = r, r.w &= ~U, r.n &= ~U;
    }
    t.length = n;
  }
}, He = /* @__PURE__ */ new WeakMap();
let ue = 0, U = 1;
const Ke = 30;
let x;
const Y = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ge = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Bt {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Pn(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = x, n = K;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = x, x = this, K = !0, U = 1 << ++ue, ue <= Ke ? An(this) : _t(this), this.fn();
    } finally {
      ue <= Ke && Fn(this), U = 1 << --ue, x = this.parent, K = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    x === this ? this.deferStop = !0 : this.active && (_t(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function _t(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let K = !0;
const Ht = [];
function Kt() {
  Ht.push(K), K = !1;
}
function Gt() {
  const e = Ht.pop();
  K = e === void 0 ? !0 : e;
}
function O(e, t, n) {
  if (K && x) {
    let s = He.get(e);
    s || He.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = _e());
    const o = process.env.NODE_ENV !== "production" ? { effect: x, target: e, type: t, key: n } : void 0;
    Ue(r, o);
  }
}
function Ue(e, t) {
  let n = !1;
  ue <= Ke ? jt(e) || (e.n |= U, n = !kt(e)) : n = !e.has(x), n && (e.add(x), x.deps.push(e), process.env.NODE_ENV !== "production" && x.onTrack && x.onTrack(
    z(
      {
        effect: x
      },
      t
    )
  ));
}
function G(e, t, n, s, r, o) {
  const i = He.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const u = Number(s);
    i.forEach((p, l) => {
      (l === "length" || !Pe(l) && l >= u) && c.push(p);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Ze(n) && c.push(i.get("length")) : (c.push(i.get(Y)), J(e) && c.push(i.get(Ge)));
        break;
      case "delete":
        h(e) || (c.push(i.get(Y)), J(e) && c.push(i.get(Ge)));
        break;
      case "set":
        J(e) && c.push(i.get(Y));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: r, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? se(c[0], a) : se(c[0]));
  else {
    const u = [];
    for (const p of c)
      p && u.push(...p);
    process.env.NODE_ENV !== "production" ? se(_e(u), a) : se(_e(u));
  }
}
function se(e, t) {
  const n = h(e) ? e : [...e];
  for (const s of n)
    s.computed && mt(s, t);
  for (const s of n)
    s.computed || mt(s, t);
}
function mt(e, t) {
  (e !== x || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(z({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const kn = /* @__PURE__ */ vn("__proto__,__v_isRef,__isVue"), Ut = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pe)
), gt = /* @__PURE__ */ jn();
function jn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = d(this);
      for (let o = 0, i = this.length; o < i; o++)
        O(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(d)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Kt();
      const s = d(this)[t].apply(this, n);
      return Gt(), s;
    };
  }), e;
}
function Bn(e) {
  const t = d(this);
  return O(t, "has", e), t.hasOwnProperty(e);
}
class qt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._shallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw" && s === (r ? o ? Xt : Yt : o ? es : Jt).get(t))
      return t;
    const i = h(t);
    if (!r) {
      if (i && w(gt, n))
        return Reflect.get(gt, n, s);
      if (n === "hasOwnProperty")
        return Bn;
    }
    const c = Reflect.get(t, n, s);
    return (Pe(n) ? Ut.has(n) : kn(n)) || (r || O(t, "get", n), o) ? c : C(c) ? i && Ze(n) ? c : c.value : N(c) ? r ? Zt(c) : Qt(c) : c;
  }
}
class Hn extends qt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (ee(o) && C(o) && !C(s))
      return !1;
    if (!this._shallow && (!qe(s) && !ee(s) && (o = d(o), s = d(s)), !h(t) && C(o) && !C(s)))
      return o.value = s, !0;
    const i = h(t) && Ze(n) ? Number(n) < t.length : w(t, n), c = Reflect.set(t, n, s, r);
    return t === d(r) && (i ? ie(s, o) && G(t, "set", n, s, o) : G(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = w(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && G(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Pe(n) || !Ut.has(n)) && O(t, "has", n), s;
  }
  ownKeys(t) {
    return O(
      t,
      "iterate",
      h(t) ? "length" : Y
    ), Reflect.ownKeys(t);
  }
}
class Wt extends qt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && ht(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && ht(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Kn = /* @__PURE__ */ new Hn(), Gn = /* @__PURE__ */ new Wt(), Un = /* @__PURE__ */ new Wt(!0), et = (e) => e, Ae = (e) => Reflect.getPrototypeOf(e);
function ye(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = d(e), o = d(t);
  n || (ie(t, o) && O(r, "get", t), O(r, "get", o));
  const { has: i } = Ae(r), c = s ? et : n ? rt : st;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function be(e, t = !1) {
  const n = this.__v_raw, s = d(n), r = d(e);
  return t || (ie(e, r) && O(s, "has", e), O(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function we(e, t = !1) {
  return e = e.__v_raw, !t && O(d(e), "iterate", Y), Reflect.get(e, "size", e);
}
function yt(e) {
  e = d(e);
  const t = d(this);
  return Ae(t).has.call(t, e) || (t.add(e), G(t, "add", e, e)), this;
}
function bt(e, t) {
  t = d(t);
  const n = d(this), { has: s, get: r } = Ae(n);
  let o = s.call(n, e);
  o ? process.env.NODE_ENV !== "production" && Lt(n, s, e) : (e = d(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? ie(t, i) && G(n, "set", e, t, i) : G(n, "add", e, t), this;
}
function wt(e) {
  const t = d(this), { has: n, get: s } = Ae(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && Lt(t, n, e) : (e = d(e), r = n.call(t, e));
  const o = s ? s.call(t, e) : void 0, i = t.delete(e);
  return r && G(t, "delete", e, void 0, o), i;
}
function Et() {
  const e = d(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? J(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && G(e, "clear", void 0, void 0, n), s;
}
function Ee(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, c = d(i), a = t ? et : e ? rt : st;
    return !e && O(c, "iterate", Y), i.forEach((u, p) => s.call(r, a(u), a(p), o));
  };
}
function ve(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = d(r), i = J(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = r[e](...s), p = n ? et : t ? rt : st;
    return !t && O(
      o,
      "iterate",
      a ? Ge : Y
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: c ? [p(l[0]), p(l[1])] : p(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function j(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${$e(e)} operation ${n}failed: target is readonly.`,
        d(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function qn() {
  const e = {
    get(o) {
      return ye(this, o);
    },
    get size() {
      return we(this);
    },
    has: be,
    add: yt,
    set: bt,
    delete: wt,
    clear: Et,
    forEach: Ee(!1, !1)
  }, t = {
    get(o) {
      return ye(this, o, !1, !0);
    },
    get size() {
      return we(this);
    },
    has: be,
    add: yt,
    set: bt,
    delete: wt,
    clear: Et,
    forEach: Ee(!1, !0)
  }, n = {
    get(o) {
      return ye(this, o, !0);
    },
    get size() {
      return we(this, !0);
    },
    has(o) {
      return be.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: Ee(!0, !1)
  }, s = {
    get(o) {
      return ye(this, o, !0, !0);
    },
    get size() {
      return we(this, !0);
    },
    has(o) {
      return be.call(this, o, !0);
    },
    add: j("add"),
    set: j("set"),
    delete: j("delete"),
    clear: j("clear"),
    forEach: Ee(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = ve(
      o,
      !1,
      !1
    ), n[o] = ve(
      o,
      !0,
      !1
    ), t[o] = ve(
      o,
      !1,
      !0
    ), s[o] = ve(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Wn,
  Ln,
  Jn,
  Yn
] = /* @__PURE__ */ qn();
function tt(e, t) {
  const n = t ? e ? Yn : Jn : e ? Ln : Wn;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    w(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Xn = {
  get: /* @__PURE__ */ tt(!1, !1)
}, Qn = {
  get: /* @__PURE__ */ tt(!0, !1)
}, Zn = {
  get: /* @__PURE__ */ tt(!0, !0)
};
function Lt(e, t, n) {
  const s = d(n);
  if (s !== n && t.call(e, s)) {
    const r = Tt(e);
    console.warn(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Jt = /* @__PURE__ */ new WeakMap(), es = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap();
function ts(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ns(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ts(Tt(e));
}
function Qt(e) {
  return ee(e) ? e : nt(
    e,
    !1,
    Kn,
    Xn,
    Jt
  );
}
function Zt(e) {
  return nt(
    e,
    !0,
    Gn,
    Qn,
    Yt
  );
}
function Ne(e) {
  return nt(
    e,
    !0,
    Un,
    Zn,
    Xt
  );
}
function nt(e, t, n, s, r) {
  if (!N(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = ns(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function X(e) {
  return ee(e) ? X(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ee(e) {
  return !!(e && e.__v_isReadonly);
}
function qe(e) {
  return !!(e && e.__v_isShallow);
}
function We(e) {
  return X(e) || ee(e);
}
function d(e) {
  const t = e && e.__v_raw;
  return t ? d(t) : e;
}
function ss(e) {
  return Vn(e, "__v_skip", !0), e;
}
const st = (e) => N(e) ? Qt(e) : e, rt = (e) => N(e) ? Zt(e) : e;
function rs(e) {
  K && x && (e = d(e), process.env.NODE_ENV !== "production" ? Ue(e.dep || (e.dep = _e()), {
    target: e,
    type: "get",
    key: "value"
  }) : Ue(e.dep || (e.dep = _e())));
}
function os(e, t) {
  e = d(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? se(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : se(n));
}
function C(e) {
  return !!(e && e.__v_isRef === !0);
}
function de(e) {
  return C(e) ? e.value : e;
}
const is = {
  get: (e, t, n) => de(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return C(r) && !C(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function cs(e) {
  return X(e) ? e : new Proxy(e, is);
}
class ls {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Bt(t, () => {
      this._dirty || (this._dirty = !0, os(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = d(this);
    return rs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function as(e, t, n = !1) {
  let s, r;
  const o = E(e);
  o ? (s = e, r = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Qe) : (s = e.get, r = e.set);
  const i = new ls(s, r, o || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const Q = [];
function us(e) {
  Q.push(e);
}
function fs() {
  Q.pop();
}
function b(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  Kt();
  const n = Q.length ? Q[Q.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = ds();
  if (s)
    Z(
      s,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${gn(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...ps(r)), console.warn(...o);
  }
  Gt();
}
function ds() {
  let e = Q[Q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function ps(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...hs(n));
  }), t;
}
function hs({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${gn(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ..._s(e.props), o] : [r + o];
}
function _s(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...en(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function en(e, t, n) {
  return I(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : C(t) ? (t = en(e, d(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : E(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = d(t), n ? t : [`${e}=`, t]);
}
const tn = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Z(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (o) {
    nn(o, t, n);
  }
  return r;
}
function Le(e, t, n, s) {
  if (E(e)) {
    const o = Z(e, t, n, s);
    return o && $n(o) && o.catch((i) => {
      nn(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(Le(e[o], t, n, s));
  return r;
}
function nn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? tn[n] : n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      Z(
        a,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  ms(e, n, r, s);
}
function ms(e, t, n, s = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = tn[t];
    if (n && us(n), b(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && fs(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Re = !1, Je = !1;
const T = [];
let H = 0;
const oe = [];
let A = null, B = 0;
const sn = /* @__PURE__ */ Promise.resolve();
let ot = null;
const gs = 100;
function ys(e) {
  const t = ot || sn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function bs(e) {
  let t = H + 1, n = T.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = T[s], o = me(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function it(e) {
  (!T.length || !T.includes(
    e,
    Re && e.allowRecurse ? H + 1 : H
  )) && (e.id == null ? T.push(e) : T.splice(bs(e.id), 0, e), rn());
}
function rn() {
  !Re && !Je && (Je = !0, ot = sn.then(cn));
}
function on(e) {
  h(e) ? oe.push(...e) : (!A || !A.includes(
    e,
    e.allowRecurse ? B + 1 : B
  )) && oe.push(e), rn();
}
function ws(e) {
  if (oe.length) {
    const t = [...new Set(oe)];
    if (oe.length = 0, A) {
      A.push(...t);
      return;
    }
    for (A = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), A.sort((n, s) => me(n) - me(s)), B = 0; B < A.length; B++)
      process.env.NODE_ENV !== "production" && ln(e, A[B]) || A[B]();
    A = null, B = 0;
  }
}
const me = (e) => e.id == null ? 1 / 0 : e.id, Es = (e, t) => {
  const n = me(e) - me(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function cn(e) {
  Je = !1, Re = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort(Es);
  const t = process.env.NODE_ENV !== "production" ? (n) => ln(e, n) : Qe;
  try {
    for (H = 0; H < T.length; H++) {
      const n = T[H];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        Z(n, null, 14);
      }
    }
  } finally {
    H = 0, T.length = 0, ws(e), Re = !1, ot = null, (T.length || oe.length) && cn(e);
  }
}
function ln(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > gs) {
      const s = t.ownerInstance, r = s && ft(s.type);
      return b(
        `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const ae = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Be().__VUE_HMR_RUNTIME__ = {
  createRecord: Fe(vs),
  rerender: Fe(Ns),
  reload: Fe(Ss)
});
const Ve = /* @__PURE__ */ new Map();
function vs(e, t) {
  return Ve.has(e) ? !1 : (Ve.set(e, {
    initialDef: pe(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function pe(e) {
  return yn(e) ? e.__vccOpts : e;
}
function Ns(e, t) {
  const n = Ve.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, pe(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function Ss(e, t) {
  const n = Ve.get(e);
  if (!n)
    return;
  t = pe(t), vt(n.initialDef, t);
  const s = [...n.instances];
  for (const r of s) {
    const o = pe(r.type);
    ae.has(o) || (o !== n.initialDef && vt(o, t), ae.add(o)), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (ae.add(o), r.ceReload(t.styles), ae.delete(o)) : r.parent ? it(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  on(() => {
    for (const r of s)
      ae.delete(
        pe(r.type)
      );
  });
}
function vt(e, t) {
  z(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Fe(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let V = null, ct = null;
function xs(e) {
  ct = e;
}
function Cs() {
  ct = null;
}
const Os = (e) => e.__isSuspense;
function $s(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : on(e);
}
const Se = {};
function Rs(e, t, { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = F) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && b(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), s !== void 0 && b(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (g) => {
    b(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = zn() === ((c = W) == null ? void 0 : c.scope) ? W : null;
  let p, l = !1, f = !1;
  if (C(e) ? (p = () => e.value, l = qe(e)) : X(e) ? (p = () => e, s = !0) : h(e) ? (f = !0, l = e.some((g) => X(g) || qe(g)), p = () => e.map((g) => {
    if (C(g))
      return g.value;
    if (X(g))
      return re(g);
    if (E(g))
      return Z(g, u, 2);
    process.env.NODE_ENV !== "production" && a(g);
  })) : E(e) ? t ? p = () => Z(e, u, 2) : p = () => {
    if (!(u && u.isUnmounted))
      return m && m(), Le(
        e,
        u,
        3,
        [$]
      );
  } : (p = Qe, process.env.NODE_ENV !== "production" && a(e)), t && s) {
    const g = p;
    p = () => re(g());
  }
  let m, $ = (g) => {
    m = M.onStop = () => {
      Z(g, u, 4);
    };
  }, R = f ? new Array(e.length).fill(Se) : Se;
  const L = () => {
    if (M.active)
      if (t) {
        const g = M.run();
        (s || l || (f ? g.some((wn, En) => ie(wn, R[En])) : ie(g, R))) && (m && m(), Le(t, u, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          R === Se ? void 0 : f && R[0] === Se ? [] : R,
          $
        ]), R = g);
      } else
        M.run();
  };
  L.allowRecurse = !!t;
  let ge;
  r === "sync" ? ge = L : r === "post" ? ge = () => Rt(L, u && u.suspense) : (L.pre = !0, u && (L.id = u.uid), ge = () => it(L));
  const M = new Bt(p, ge);
  return process.env.NODE_ENV !== "production" && (M.onTrack = o, M.onTrigger = i), t ? n ? L() : R = M.run() : r === "post" ? Rt(
    M.run.bind(M),
    u && u.suspense
  ) : M.run(), () => {
    M.stop(), u && u.scope && Cn(u.scope.effects, M);
  };
}
function Vs(e, t, n) {
  const s = this.proxy, r = I(e) ? e.includes(".") ? Is(s, e) : () => s[e] : e.bind(s, s);
  let o;
  E(t) ? o = t : (o = t.handler, n = t);
  const i = W;
  It(this);
  const c = Rs(r, o.bind(s), n);
  return i ? It(i) : Xs(), c;
}
function Is(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function re(e, t) {
  if (!N(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), C(e))
    re(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      re(e[n], t);
  else if (Mt(e) || J(e))
    e.forEach((n) => {
      re(n, t);
    });
  else if (Pt(e))
    for (const n in e)
      re(e[n], t);
  return e;
}
const Ms = (e) => !!e.type.__asyncLoader, Ye = "components";
function Ds(e, t) {
  return Ps(Ye, e, !0, t) || e;
}
const Ts = Symbol.for("v-ndc");
function Ps(e, t, n = !0, s = !1) {
  const r = W;
  if (r) {
    const o = r.type;
    if (e === Ye) {
      const c = ft(
        o,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (c && (c === t || c === Oe(t) || c === $e(Oe(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Nt(r[e] || o[e], t) || // global registration
      Nt(r.appContext[e], t)
    );
    if (!i && s)
      return o;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const c = e === Ye ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      b(`Failed to resolve ${e.slice(0, -1)}: ${t}${c}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && b(
      `resolve${$e(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Nt(e, t) {
  return e && (e[t] || e[Oe(t)] || e[$e(Oe(t))]);
}
function Ie(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (h(e) || I(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && b(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (N(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, c) => t(i, c, void 0, o && o[c])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let c = 0, a = i.length; c < a; c++) {
        const u = i[c];
        r[c] = t(e[u], u, c, o && o[c]);
      }
    }
  else
    r = [];
  return n && (n[s] = r), r;
}
function zs(e, t, n = {}, s, r) {
  if (V.isCE || V.parent && Ms(V.parent) && V.parent.isCE)
    return t !== "default" && (n.name = t), te("slot", n, s && s());
  let o = e[t];
  process.env.NODE_ENV !== "production" && o && o.length > 1 && (b(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), o = () => []), o && o._c && (o._d = !1), _();
  const i = o && an(o(n)), c = lt(
    q,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !r && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function an(e) {
  return e.some((t) => fn(t) ? !(t.type === De || t.type === q && !an(t.children)) : !0) ? e : null;
}
const Xe = (e) => e ? Qs(e) ? er(e) || e.proxy : Xe(e.parent) : null, he = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Ne(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Ne(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Ne(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Ne(e.refs) : e.refs,
    $parent: (e) => Xe(e.parent),
    $root: (e) => Xe(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ks(e),
    $forceUpdate: (e) => e.f || (e.f = () => it(e.update)),
    $nextTick: (e) => e.n || (e.n = ys.bind(e.proxy)),
    $watch: (e) => Vs.bind(e)
  })
), As = (e) => e === "_" || e === "$", ke = (e, t) => e !== F && !e.__isScriptSetup && w(e, t), Fs = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ke(s, t))
          return i[t] = 1, s[t];
        if (r !== F && w(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && w(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== F && w(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const p = he[t];
    let l, f;
    if (p)
      return t === "$attrs" ? (O(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && O(e, "get", t), p(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== F && w(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, w(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && V && (!I(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== F && As(t[0]) && w(r, t) ? b(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === V && b(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return ke(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && w(r, t) ? (b(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== F && w(s, t) ? (s[t] = n, !0) : w(e.props, t) ? (process.env.NODE_ENV !== "production" && b(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && b(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== F && w(e, i) || ke(t, i) || (c = o[0]) && w(c, i) || w(s, i) || w(he, i) || w(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : w(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Fs.ownKeys = (e) => (b(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function St(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ks(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (u) => Me(a, u, i, !0)
  ), Me(a, t, i)), N(t) && o.set(t, a), a;
}
function Me(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && Me(e, o, n, !0), r && r.forEach(
    (i) => Me(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && b(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = js[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const js = {
  data: xt,
  props: Ot,
  emits: Ot,
  // objects
  methods: fe,
  computed: fe,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: fe,
  directives: fe,
  // watch
  watch: Hs,
  // provide / inject
  provide: xt,
  inject: Bs
};
function xt(e, t) {
  return t ? e ? function() {
    return z(
      E(e) ? e.call(this, this) : e,
      E(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Bs(e, t) {
  return fe(Ct(e), Ct(t));
}
function Ct(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function fe(e, t) {
  return e ? z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ot(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : z(
    /* @__PURE__ */ Object.create(null),
    St(e),
    St(t ?? {})
  ) : t;
}
function Hs(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = z(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let $t = null;
function Ks(e, t, n = !1) {
  const s = W || V;
  if (s || $t) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : $t._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && E(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && b(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && b("inject() can only be used inside setup() or functional components.");
}
const Rt = $s, Gs = (e) => e.__isTeleport, q = Symbol.for("v-fgt"), Us = Symbol.for("v-txt"), De = Symbol.for("v-cmt"), xe = [];
let P = null;
function _(e = !1) {
  xe.push(P = e ? null : []);
}
function qs() {
  xe.pop(), P = xe[xe.length - 1] || null;
}
function un(e) {
  return e.dynamicChildren = P || Nn, qs(), P && P.push(e), e;
}
function y(e, t, n, s, r, o) {
  return un(
    v(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function lt(e, t, n, s, r) {
  return un(
    te(
      e,
      t,
      n,
      s,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ws = (...e) => hn(
  ...e
), dn = "__vInternal", pn = ({ key: e }) => e ?? null, Ce = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? I(e) || C(e) || E(e) ? { i: V, r: e, k: t, f: !!n } : e : null);
function v(e, t = null, n = null, s = 0, r = null, o = e === q ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && pn(t),
    ref: t && Ce(t),
    scopeId: ct,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: V
  };
  return c ? (at(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= I(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && b("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  P && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && P.push(a), a;
}
const te = process.env.NODE_ENV !== "production" ? Ws : hn;
function hn(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Ts) && (process.env.NODE_ENV !== "production" && !e && b(`Invalid vnode type when creating vnode: ${e}.`), e = De), fn(e)) {
    const c = Te(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && at(c, n), !o && P && (c.shapeFlag & 6 ? P[P.indexOf(e)] = c : P.push(c)), c.patchFlag |= -2, c;
  }
  if (yn(e) && (e = e.__vccOpts), t) {
    t = Ls(t);
    let { class: c, style: a } = t;
    c && !I(c) && (t.class = ce(c)), N(a) && (We(a) && !h(a) && (a = z({}, a)), t.style = D(a));
  }
  const i = I(e) ? 1 : Os(e) ? 128 : Gs(e) ? 64 : N(e) ? 4 : E(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && We(e) && (e = d(e), b(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), v(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Ls(e) {
  return e ? We(e) || dn in e ? z({}, e) : e : null;
}
function Te(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, c = t ? Ys(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && pn(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? h(r) ? r.concat(Ce(t)) : [r, Ce(t)] : Ce(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(_n) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== q ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Te(e.ssContent),
    ssFallback: e.ssFallback && Te(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function _n(e) {
  const t = Te(e);
  return h(e.children) && (t.children = e.children.map(_n)), t;
}
function mn(e = " ", t = 0) {
  return te(Us, null, e, t);
}
function Js(e = "", t = !1) {
  return t ? (_(), lt(De, null, e)) : te(De, null, e);
}
function at(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), at(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(dn in t) ? t._ctx = V : r === 3 && V && (V.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    E(t) ? (t = { default: t, _ctx: V }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [mn(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ys(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ce([t.class, s.class]));
      else if (r === "style")
        t.style = D([t.style, s.style]);
      else if (xn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(h(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
let W = null, ut, ne, Vt = "__VUE_INSTANCE_SETTERS__";
(ne = Be()[Vt]) || (ne = Be()[Vt] = []), ne.push((e) => W = e), ut = (e) => {
  ne.length > 1 ? ne.forEach((t) => t(e)) : ne[0](e);
};
const It = (e) => {
  ut(e), e.scope.on();
}, Xs = () => {
  W && W.scope.off(), ut(null);
};
function Qs(e) {
  return e.vnode.shapeFlag & 4;
}
let Zs = !1;
function er(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(cs(ss(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in he)
          return he[n](e);
      },
      has(t, n) {
        return n in t || n in he;
      }
    }));
}
const tr = /(?:^|[-_])(\w)/g, nr = (e) => e.replace(tr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ft(e, t = !0) {
  return E(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function gn(e, t, n = !1) {
  let s = ft(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? nr(s) : n ? "App" : "Anonymous";
}
function yn(e) {
  return E(e) && "__vccOpts" in e;
}
const sr = (e, t) => as(e, t, Zs);
function je(e) {
  return !!(e && e.__v_isShallow);
}
function rr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, r = {
    header(l) {
      return N(l) ? l.__isVue ? ["div", e, "VueInstance"] : C(l) ? [
        "div",
        {},
        ["span", e, p(l)],
        "<",
        c(l.value),
        ">"
      ] : X(l) ? [
        "div",
        {},
        ["span", e, je(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${ee(l) ? " (readonly)" : ""}`
      ] : ee(l) ? [
        "div",
        {},
        ["span", e, je(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", d(l.props))), l.setupState !== F && f.push(i("setup", l.setupState)), l.data !== F && f.push(i("data", d(l.data)));
    const m = a(l, "computed");
    m && f.push(i("computed", m));
    const $ = a(l, "inject");
    return $ && f.push(i("injected", $)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = z({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          c(f[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : N(l) ? ["object", { object: f ? d(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const m = l.type;
    if (E(m))
      return;
    const $ = {};
    for (const R in l.ctx)
      u(m, R, f) && ($[R] = l.ctx[R]);
    return $;
  }
  function u(l, f, m) {
    const $ = l[m];
    if (h($) && $.includes(f) || N($) && f in $ || l.extends && u(l.extends, f, m) || l.mixins && l.mixins.some((R) => u(R, f, m)))
      return !0;
  }
  function p(l) {
    return je(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function or() {
  rr();
}
process.env.NODE_ENV !== "production" && or();
const k = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, ir = ["disabled"], cr = { key: 0 }, lr = { key: 1 }, ar = {
  __name: "MyButton",
  props: {
    isRounded: {
      type: Boolean,
      default: !1,
      required: !1
    },
    isDisabled: {
      type: Boolean,
      default: !1,
      required: !1
    },
    isOutlined: {
      type: Boolean,
      default: !1,
      required: !1
    },
    color: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      required: !1
    },
    size: {
      type: String,
      default: ""
    }
  },
  emits: ["onClick"],
  setup(e, { emit: t }) {
    const n = t, { color: s, isRounded: r, isDisabled: o, isOutlined: i, icon: c, size: a } = e, u = sr(() => ({
      btn: !0,
      btn_large: a,
      [`btn_${s}`]: !0,
      btn_rounded: r,
      btn_disabled: o,
      btn_outlined: i,
      btn_icon: c
    }));
    return (p, l) => {
      const f = Ds("font-awesome-icon");
      return _(), y("button", {
        onClick: l[0] || (l[0] = (m) => n("onClick")),
        class: ce(u.value),
        disabled: e.isDisabled
      }, [
        e.icon ? (_(), y("span", cr, [
          te(f, {
            icon: `fa-regular fa-${e.icon}`
          }, null, 8, ["icon"])
        ])) : (_(), y("span", lr, [
          zs(p.$slots, "default", {}, () => [
            mn("Click me")
          ], !0)
        ]))
      ], 10, ir);
    };
  }
}, ur = /* @__PURE__ */ k(ar, [["__scopeId", "data-v-a6ebc3e4"]]);
const fr = { class: "input-block" }, dr = ["checked", "disabled", "name", "id"], pr = ["for"], hr = {
  __name: "MyCheckbox",
  props: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    checked: {
      type: Boolean
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    isGroup: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: "checkbox"
    }
  },
  emits: ["update:checked", "updateCheckedGroup"],
  setup(e, { emit: t }) {
    const n = t, { disabled: s, name: r, label: o, id: i, isGroup: c, checked: a, type: u } = e, p = (l) => {
      c ? n("updateCheckedGroup", { id: i, checked: l.target.checked }) : n("update:checked", l.target.checked);
    };
    return (l, f) => (_(), y("div", fr, [
      v("input", {
        onChange: p,
        checked: e.checked,
        disabled: e.disabled,
        name: e.name,
        id: e.id,
        type: "checkbox",
        class: ce({ checkbox: e.type === "checkbox", switch: e.type === "switch" })
      }, null, 42, dr),
      v("label", {
        class: "label",
        for: e.id
      }, le(e.label), 9, pr)
    ]));
  }
}, bn = /* @__PURE__ */ k(hr, [["__scopeId", "data-v-60b2620f"]]);
const _r = {
  __name: "MyCheckboxGroup",
  props: ["options", "valuesGroup"],
  emits: ["update:valuesGroup"],
  setup(e, { emit: t }) {
    const n = e, s = t, r = ({ checked: o, id: i }) => {
      const c = [...n.valuesGroup];
      o ? c.push(i) : c.splice(c.indexOf(i), 1), s("update:valuesGroup", c);
    };
    return (o, i) => (_(!0), y(q, null, Ie(e.options, (c) => (_(), lt(de(bn), {
      key: c.id,
      checked: e.valuesGroup.includes(c.id),
      onUpdateCheckedGroup: r,
      id: c.id,
      name: c.name,
      isGroup: !0,
      label: c.id
    }, null, 8, ["checked", "id", "name", "label"]))), 128));
  }
}, mr = /* @__PURE__ */ k(_r, [["__scopeId", "data-v-688b84e5"]]);
const gr = { class: "progress-circle" }, yr = {
  width: "120",
  height: "120",
  viewBox: "0 0 120 120",
  class: "progress-circle-svg"
}, br = ["cx", "cy", "stroke"], wr = ["cx", "cy", "stroke"], Er = {
  __name: "MyCircle",
  props: {
    progressPercent: {
      type: Number,
      required: !0
    },
    size: {
      type: String,
      default: "60"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(e) {
    return (t, n) => (_(), y("div", gr, [
      v("span", {
        class: "progress-circle-percent",
        style: D({ color: `var(--${e.color})` })
      }, le(e.progressPercent), 5),
      (_(), y("svg", yr, [
        v("circle", {
          cx: e.size,
          cy: e.size,
          r: "54",
          fill: "none",
          "stroke-width": "12",
          stroke: `var(--${e.color}-hover)`
        }, null, 8, br),
        v("circle", {
          class: "progress-circle-line",
          style: D({ "stroke-dashoffset": `calc(100 - ${e.progressPercent})` }),
          cx: e.size,
          cy: e.size,
          r: "54",
          fill: "none",
          "stroke-width": "12",
          pathLength: "100",
          stroke: `var(--${e.color})`
        }, null, 12, wr)
      ]))
    ]));
  }
}, vr = /* @__PURE__ */ k(Er, [["__scopeId", "data-v-90c324e5"]]);
const Nr = {
  __name: "MyProgress",
  props: {
    progressPercent: {
      type: Number,
      required: !0
    },
    width: {
      type: String
    },
    height: {
      type: String,
      default: "40px"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(e) {
    return (t, n) => (_(), y("div", {
      class: "progress-container",
      style: D({ width: e.width, height: e.height })
    }, [
      v("span", {
        class: "progress-text",
        style: D({
          color: `var(--${e.color})`
        })
      }, le(e.progressPercent) + "%", 5),
      v("div", {
        class: "progress-wrapper",
        style: D({
          backgroundColor: `var(--${e.color}-hover)`
        })
      }, [
        v("div", {
          class: "progress",
          style: D({ backgroundColor: `var(--${e.color})`, width: `${e.progressPercent}%` })
        }, null, 4)
      ], 4)
    ], 4));
  }
}, Sr = /* @__PURE__ */ k(Nr, [["__scopeId", "data-v-3ddbb617"]]);
const xr = { class: "line" }, Cr = ["id", "name", "disabled", "checked", "value"], Or = ["for"], $r = {
  __name: "MyRadio",
  props: {
    id: {
      type: String
    },
    radioValue: {
      type: String
    },
    name: {
      type: String
    },
    value: {
      type: String
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    type: {
      type: String,
      default: "checkbox"
    }
  },
  emits: ["update:radioValue"],
  setup(e, { emit: t }) {
    const n = t, s = (r) => {
      n("update:radioValue", r.target.value);
    };
    return (r, o) => (_(), y("div", xr, [
      v("input", {
        type: "radio",
        id: e.id,
        name: e.name,
        onChange: s,
        disabled: e.disabled,
        checked: e.radioValue === e.id,
        value: e.value,
        class: "radio"
      }, null, 40, Cr),
      v("label", {
        for: e.id,
        class: "heading-2 label"
      }, le(e.label), 9, Or)
    ]));
  }
}, Rr = /* @__PURE__ */ k($r, [["__scopeId", "data-v-6484a673"]]);
const dt = (e) => (xs("data-v-fbe5338a"), e = e(), Cs(), e), Vr = ["onClick"], Ir = { class: "label" }, Mr = ["transform"], Dr = /* @__PURE__ */ dt(() => /* @__PURE__ */ v("g", {
  id: "SVGRepo_bgCarrier",
  "stroke-width": "0"
}, null, -1)), Tr = /* @__PURE__ */ dt(() => /* @__PURE__ */ v("g", {
  id: "SVGRepo_tracerCarrier",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1)), Pr = /* @__PURE__ */ dt(() => /* @__PURE__ */ v("g", { id: "SVGRepo_iconCarrier" }, [
  /* @__PURE__ */ v("path", {
    id: "XMLID_224_",
    d: "M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
  })
], -1)), zr = [
  Dr,
  Tr,
  Pr
], Ar = {
  __name: "MyTHead",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    headerColor: {
      type: String,
      default: "success"
    },
    templateColumnsSizes: {
      type: String,
      default: "repeat(auto-fit, minmax(100px, auto))"
    }
  },
  setup(e) {
    const { changeSortField: t, sortType: n, sortField: s } = Ks("thead");
    return (r, o) => (_(), y("div", {
      class: "thead",
      style: D({ "grid-template-columns": e.templateColumnsSizes })
    }, [
      (_(!0), y(q, null, Ie(e.columns, (i) => (_(), y("div", {
        key: i.id,
        class: ce(["thead-col", { isSorted: i.isSorted }]),
        onClick: (c) => de(t)(i.label),
        style: D({ backgroundColor: `var(--${e.headerColor})` })
      }, [
        v("span", Ir, le(i.label), 1),
        i.isSorted ? (_(), y("svg", {
          key: 0,
          class: "sort-img",
          fill: "#000000",
          transform: de(n) === "desc" && de(s) === i.label ? "rotate(180)" : void 0,
          height: "20px",
          width: "20px",
          version: "1.1",
          id: "Layer_1",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          viewBox: "0 0 330 330",
          "xml:space": "preserve"
        }, zr, 8, Mr)) : Js("", !0)
      ], 14, Vr))), 128))
    ], 4));
  }
}, Fr = /* @__PURE__ */ k(Ar, [["__scopeId", "data-v-fbe5338a"]]);
const kr = { class: "tbody" }, jr = {
  key: 0,
  class: "tbody-img-wrapper"
}, Br = ["src"], Hr = { key: 1 }, Kr = {
  __name: "MyTBody",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    rows: {
      type: Array,
      required: !0
    },
    templateColumnsSizes: {
      type: String,
      default: "repeat(auto-fit, minmax(100px, auto))"
    }
  },
  setup(e) {
    return (t, n) => (_(), y("div", kr, [
      (_(!0), y(q, null, Ie(e.rows, (s) => (_(), y("div", {
        key: s.id,
        style: D({ "grid-template-columns": e.templateColumnsSizes }),
        class: "tbody-row"
      }, [
        (_(!0), y(q, null, Ie(e.columns, ({ label: r }, o) => (_(), y("div", {
          key: o,
          class: "tbody-cell"
        }, [
          /http/ig.test(s[r]) ? (_(), y("div", jr, [
            v("img", {
              class: "img",
              src: s[r],
              alt: "url"
            }, null, 8, Br)
          ])) : (_(), y("div", Hr, le(s[r]), 1))
        ]))), 128))
      ], 4))), 128))
    ]));
  }
}, Gr = /* @__PURE__ */ k(Kr, [["__scopeId", "data-v-9871408e"]]);
const Ur = { class: "table" }, qr = {
  __name: "MyTable",
  props: {
    columns: {
      type: Array,
      required: !0
    },
    rows: {
      type: Array,
      required: !0
    },
    headerColor: {
      type: String,
      default: "success"
    },
    templateColumnsSizes: {
      type: String,
      default: "repeat(auto-fit, minmax(100px, auto))"
    }
  },
  setup(e) {
    return (t, n) => (_(), y("div", Ur, [
      te(Fr, {
        columns: e.columns,
        headerColor: e.headerColor,
        templateColumnsSizes: e.templateColumnsSizes
      }, null, 8, ["columns", "headerColor", "templateColumnsSizes"]),
      te(Gr, {
        rows: e.rows,
        columns: e.columns,
        templateColumnsSizes: e.templateColumnsSizes
      }, null, 8, ["rows", "columns", "templateColumnsSizes"])
    ]));
  }
}, Wr = /* @__PURE__ */ k(qr, [["__scopeId", "data-v-1e5a77c3"]]), Jr = {
  install(e) {
    e.component("my-radio", Rr), e.component("my-table", Wr), e.component("my-button", ur), e.component("my-circle", vr), e.component("my-progress", Sr), e.component("my-checkbox", bn), e.component("my-checkboxGroup", mr);
  }
};
export {
  Jr as default
};
