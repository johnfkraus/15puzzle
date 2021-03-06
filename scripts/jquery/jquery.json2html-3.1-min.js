(function (a) {
    a.fn.json2html = function (f, c, b) {
        var e;
        var d = jQuery.type(f);
        switch (d) {
            case"string":
                e = jQuery.parseJSON(f);
                break;
            default:
                e = f;
                break
        }
        if (b != undefined) {
            a.extend(a.json2html.options, b)
        }
        return this.each(function () {
            if (a.json2html.options.prepend) {
                a.fn.prepend.apply(a(this), a.json2html(e, c))
            } else {
                a.fn.append.apply(a(this), a.json2html(e, c))
            }
        })
    };
    a.json2html = function (e, d) {
        var f = jQuery.type(e);
        if (d === undefined || e === undefined) {
            return(undefined)
        }
        var g = [];
        switch (f) {
            case"array":
                var b = e.length;
                for (var c = 0; c < b; ++c) {
                    g = g.concat(a.json2html.apply(e[c], d, c))
                }
                break;
            case"object":
                g = g.concat(a.json2html.apply(e, d));
                break
        }
        return(g)
    };
    a.json2html.options = {eventData: undefined, prepend: false};
    a.json2html.apply = function (d, c, b) {
        var e = [];
        i = 0;
        var g = a.json2html.applyTransform(d, c, b);
        var f = jQuery.type(g);
        switch (f) {
            case"array":
                e = e.concat(g);
                i += g.length;
                break;
            default:
                e[i] = g;
                i++;
                break
        }
        return(e)
    };
    a.json2html.applyTransform = function (f, c, h) {
        var n = [];
        var g = 0;
        var j = jQuery.type(c);
        switch (j) {
            case"array":
                var k = c.length;
                for (var o = 0; o < k; ++o) {
                    n = n.concat(a.json2html.applyTransform(f, c[o], h))
                }
                break;
            case"object":
                var q = c.tag;
                if (q !== undefined) {
                    var e = a(document.createElement(q));
                    for (var m in c) {
                        switch (m) {
                            case"tag":
                                break;
                            case"children":
                                var b = c.children;
                                var l = jQuery.type(b);
                                switch (l) {
                                    case"function":
                                        a.fn.append.apply(a(e), b.call(f, f));
                                        break;
                                    case"array":
                                        a.fn.append.apply(a(e), a.json2html.applyTransform(f, c.children, h));
                                        break;
                                    default:
                                        break
                                }
                                break;
                            case"html":
                                a(e).html(a.json2html.getValue(f, c, "html", h));
                                break;
                            default:
                                var p = false;
                                if (m.charAt(0) === "o") {
                                    if (m.charAt(1) === "n") {
                                        var d = {action: c[m], obj: f, data: a.json2html.options.eventData, index: h};
                                        a(e).bind(m.substring(m.indexOf("on") + 2), d, function (r) {
                                            d.event = r;
                                            d.action.call(a(this), d)
                                        });
                                        p = true
                                    }
                                }
                                if (!p) {
                                    a(e).attr(m, a.json2html.getValue(f, c, m, h))
                                }
                                break
                        }
                    }
                    n[g] = e;
                    g++
                }
                break
        }
        return(n)
    };
    a.json2html.getValue = function (h, d, e, c) {
        var b = "";
        var j = d[e];
        var g = jQuery.type(j);
        switch (g) {
            case"function":
                return(j.call(h, h, c));
                break;
            case"string":
                var f = new a.json2html.tokenizer([/\${([^\}\{]+)}/], function (l, m, k) {
                    return m ? l.replace(k, function (s, q) {
                        var t = q.split(".");
                        var o = h;
                        var u = "";
                        var n = t.length;
                        for (var r = 0; r < n; ++r) {
                            if (t[r].length > 0) {
                                var p = o[t[r]];
                                o = p;
                                if (o === null || o === undefined) {
                                    break
                                }
                            }
                        }
                        if (o !== null && o !== undefined) {
                            u = o
                        }
                        return(u)
                    }) : l
                });
                b = f.parse(j).join("");
                break
        }
        return(b)
    };
    a.json2html.tokenizer = function (c, b) {
        if (!(this instanceof a.json2html.tokenizer)) {
            return new a.json2html.tokenizer(c, onEnd, onFound)
        }
        this.tokenizers = c.splice ? c : [c];
        if (b) {
            this.doBuild = b
        }
        this.parse = function (d) {
            this.src = d;
            this.ended = false;
            this.tokens = [];
            do {
                this.next()
            } while (!this.ended);
            return this.tokens
        };
        this.build = function (d, e) {
            if (d) {
                this.tokens.push(!this.doBuild ? d : this.doBuild(d, e, this.tkn))
            }
        };
        this.next = function () {
            var d = this, e;
            d.findMin();
            e = d.src.slice(0, d.min);
            d.build(e, false);
            d.src = d.src.slice(d.min).replace(d.tkn, function (f) {
                d.build(f, true);
                return""
            });
            if (!d.src) {
                d.ended = true
            }
        };
        this.findMin = function () {
            var f = this, g = 0, e, d;
            f.min = -1;
            f.tkn = "";
            while ((e = f.tokenizers[g++]) !== undefined) {
                d = f.src[e.test ? "search" : "indexOf"](e);
                if (d != -1 && (f.min == -1 || d < f.min)) {
                    f.tkn = e;
                    f.min = d
                }
            }
            if (f.min == -1) {
                f.min = f.src.length
            }
        }
    }
})(jQuery);
