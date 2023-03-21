var r = /^((?:x|data)[:\-_])/,
    t = /^ngce[:\-_][^:\-_]+[:\-_]/;

function n(n) {
    return n.toLowerCase().replace(r, "").replace(t, "").replace(/_(.)/g, function(r, t) {
        return t.toUpperCase()
    })
}
var e = ["$exceptionHandler", "$parse", "$rootScope", function(r, t, e) {
    var o = /^(on[a-z]+|formaction)$/;

    function a(t) {
        try {
            t()
        } catch (t) {
            r(t)
        }
    }
    return {
        restrict: "A",
        priority: 100,
        compile: function(r, i) {
            var c = Object.keys(i).filter(function(r) {
                    return r.startsWith("ngceProp")
                }).map(function(r) {
                    return [n(i.$attr[r]), t(i[r])]
                }),
                u = Object.keys(i).filter(function(r) {
                    return r.startsWith("ngceOn")
                }).map(function(r) {
                    return [n(i.$attr[r]), t(i[r])]
                });
            return {
                pre: function(r, t) {
                    var n = c.map(function(n) {
                        var e = n[0],
                            a = n[1];
                        if (o.test(e)) throw new Error("Property bindings for HTML DOM event properties are disallowed.");
                        var i = function(r) {
                            return t.prop(e, r)
                        };
                        return i(a(r)), r.$watch(a, i)
                    });
                    t.on("$destroy", function() {
                        return n.forEach(a)
                    })
                },
                post: function(r, t) {
                    u.forEach(function(n) {
                        var o = n[1];
                        t.on(n[0], function(t) {
                            var n = o.bind(null, r, {
                                $event: t = t.originalEvent || t
                            });
                            e.$$phase ? a(n) : r.$apply(n)
                        })
                    })
                }
            }
        }
    }
}];
angular.module("ngCustomElement", []).directive("ngCustomElement", e);
//# sourceMappingURL=ng-custom-element.js.map