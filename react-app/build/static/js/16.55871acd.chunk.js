(this["webpackJsonp@scaffold-eth/react-app"]=this["webpackJsonp@scaffold-eth/react-app"]||[]).push([[16],{1597:function(e,t,n){"use strict";n.r(t);var r=n(1585),i=n(19),a=n(66),o=n(1648),l=(n(80),n(0),n(81),Object.defineProperty),u=function(e,t){return l(e,"name",{value:t,configurable:!0})};function c(e,t,n){var r=f(n,p(t.string));if(r){var i=null!==t.type&&/"|\w/.test(t.string[0])?t.start:t.end;return{list:r,from:{line:e.line,ch:i},to:{line:e.line,ch:t.end}}}}function f(e,t){return t?s(s(e.map((function(e){return{proximity:d(p(e.text),t),entry:e}})),(function(e){return e.proximity<=2})),(function(e){return!e.entry.isDeprecated})).sort((function(e,t){return(e.entry.isDeprecated?1:0)-(t.entry.isDeprecated?1:0)||e.proximity-t.proximity||e.entry.text.length-t.entry.text.length})).map((function(e){return e.entry})):s(e,(function(e){return!e.isDeprecated}))}function s(e,t){var n=e.filter(t);return 0===n.length?e:n}function p(e){return e.toLowerCase().replace(/\W/g,"")}function d(e,t){var n=y(t,e);return e.length>t.length&&(n-=e.length-t.length-1,n+=0===e.indexOf(t)?0:.5),n}function y(e,t){var n,r,i=[],a=e.length,o=t.length;for(n=0;n<=a;n++)i[n]=[n];for(r=1;r<=o;r++)i[0][r]=r;for(n=1;n<=a;n++)for(r=1;r<=o;r++){var l=e[n-1]===t[r-1]?0:1;i[n][r]=Math.min(i[n-1][r]+1,i[n][r-1]+1,i[n-1][r-1]+l),n>1&&r>1&&e[n-1]===t[r-2]&&e[n-2]===t[r-1]&&(i[n][r]=Math.min(i[n][r],i[n-2][r-2]+l))}return i[a][o]}function v(e,t,n){var r="Invalid"===t.state.kind?t.state.prevState:t.state,o=r.kind,l=r.step;if("Document"===o&&0===l)return c(e,t,[{text:"{"}]);var u=n.variableToType;if(u){var f=m(u,t.state);if("Document"===o||"Variable"===o&&0===l)return c(e,t,Object.keys(u).map((function(e){return{text:'"'.concat(e,'": '),type:u[e]}})));if("ObjectValue"===o||"ObjectField"===o&&0===l)if(f.fields)return c(e,t,Object.keys(f.fields).map((function(e){return f.fields[e]})).map((function(e){return{text:'"'.concat(e.name,'": '),type:e.type,description:e.description}})));if("StringValue"===o||"NumberValue"===o||"BooleanValue"===o||"NullValue"===o||"ListValue"===o&&1===l||"ObjectField"===o&&2===l||"Variable"===o&&2===l){var s=f.type?Object(i.n)(f.type):void 0;if(s instanceof i.b)return c(e,t,[{text:"{"}]);if(s instanceof i.a)return c(e,t,s.getValues().map((function(e){return{text:'"'.concat(e.name,'"'),type:s,description:e.description}})));if(s===a.a)return c(e,t,[{text:"true",type:a.a,description:"Not false."},{text:"false",type:a.a,description:"Not true."}])}}}function m(e,t){var n={type:null,fields:null};return Object(o.a)(t,(function(t){if("Variable"===t.kind)n.type=e[t.name];else if("ListValue"===t.kind){var r=n.type?Object(i.o)(n.type):void 0;n.type=r instanceof i.d?r.ofType:null}else if("ObjectValue"===t.kind){var a=n.type?Object(i.n)(n.type):void 0;n.fields=a instanceof i.b?a.getFields():null}else if("ObjectField"===t.kind){var o=t.name&&n.fields?n.fields[t.name]:null;n.type=null===o||void 0===o?void 0:o.type}})),n}u(c,"hintList"),u(f,"filterAndSortList"),u(s,"filterNonEmpty"),u(p,"normalizeText"),u(d,"getProximity"),u(y,"lexicalDistance"),r.C.registerHelper("hint","graphql-variables",(function(e,t){var n=e.getCursor(),i=e.getTokenAt(n),a=v(n,i,t);return(null===a||void 0===a?void 0:a.list)&&a.list.length>0&&(a.from=r.C.Pos(a.from.line,a.from.ch),a.to=r.C.Pos(a.to.line,a.to.ch),r.C.signal(e,"hasCompletion",e,a,i)),a})),u(v,"getVariablesHint"),u(m,"getTypeInfo")},1648:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));function r(e,t){for(var n=[],r=e;null===r||void 0===r?void 0:r.kind;)n.push(r),r=r.prevState;for(var i=n.length-1;i>=0;i--)t(n[i])}(0,Object.defineProperty)(r,"name",{value:"forEachState",configurable:!0})}}]);
//# sourceMappingURL=16.55871acd.chunk.js.map