(this["webpackJsonp@scaffold-eth/react-app"]=this["webpackJsonp@scaffold-eth/react-app"]||[]).push([[4,6],{822:function(e,t,n){"use strict";n.r(t),n.d(t,"a",(function(){return c})),n.d(t,"d",(function(){return f}));var o,r=n(1),i=n(1585),a=Object.defineProperty,u=function(e,t){return a(e,"name",{value:t,configurable:!0})};function s(e,t){return t.forEach((function(t){t&&"string"!==typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var o=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(e)}u(s,"_mergeNamespaces");var c={exports:{}};!function(e){function t(t,n,o){var r,i=t.getWrapperElement();return(r=i.appendChild(document.createElement("div"))).className=o?"CodeMirror-dialog CodeMirror-dialog-bottom":"CodeMirror-dialog CodeMirror-dialog-top","string"==typeof n?r.innerHTML=n:r.appendChild(n),e.addClass(i,"dialog-opened"),r}function n(e,t){e.state.currentNotificationClose&&e.state.currentNotificationClose(),e.state.currentNotificationClose=t}u(t,"dialogDiv"),u(n,"closeNotification"),e.defineExtension("openDialog",(function(o,r,i){i||(i={}),n(this,null);var a=t(this,o,i.bottom),s=!1,c=this;function l(t){if("string"==typeof t)p.value=t;else{if(s)return;s=!0,e.rmClass(a.parentNode,"dialog-opened"),a.parentNode.removeChild(a),c.focus(),i.onClose&&i.onClose(a)}}u(l,"close");var f,p=a.getElementsByTagName("input")[0];return p?(p.focus(),i.value&&(p.value=i.value,!1!==i.selectValueOnOpen&&p.select()),i.onInput&&e.on(p,"input",(function(e){i.onInput(e,p.value,l)})),i.onKeyUp&&e.on(p,"keyup",(function(e){i.onKeyUp(e,p.value,l)})),e.on(p,"keydown",(function(t){i&&i.onKeyDown&&i.onKeyDown(t,p.value,l)||((27==t.keyCode||!1!==i.closeOnEnter&&13==t.keyCode)&&(p.blur(),e.e_stop(t),l()),13==t.keyCode&&r(p.value,t))})),!1!==i.closeOnBlur&&e.on(a,"focusout",(function(e){null!==e.relatedTarget&&l()}))):(f=a.getElementsByTagName("button")[0])&&(e.on(f,"click",(function(){l(),c.focus()})),!1!==i.closeOnBlur&&e.on(f,"blur",l),f.focus()),l})),e.defineExtension("openConfirm",(function(o,r,i){n(this,null);var a=t(this,o,i&&i.bottom),s=a.getElementsByTagName("button"),c=!1,l=this,f=1;function p(){c||(c=!0,e.rmClass(a.parentNode,"dialog-opened"),a.parentNode.removeChild(a),l.focus())}u(p,"close"),s[0].focus();for(var d=0;d<s.length;++d){var m=s[d];!function(t){e.on(m,"click",(function(n){e.e_preventDefault(n),p(),t&&t(l)}))}(r[d]),e.on(m,"blur",(function(){--f,setTimeout((function(){f<=0&&p()}),200)})),e.on(m,"focus",(function(){++f}))}})),e.defineExtension("openNotification",(function(o,r){n(this,l);var i,a=t(this,o,r&&r.bottom),s=!1,c=r&&"undefined"!==typeof r.duration?r.duration:5e3;function l(){s||(s=!0,clearTimeout(i),e.rmClass(a.parentNode,"dialog-opened"),a.parentNode.removeChild(a))}return u(l,"close"),e.on(a,"click",(function(t){e.e_preventDefault(t),l()})),c&&(i=setTimeout(l,c)),l}))}(i.a.exports);var l=c.exports,f=Object.freeze(s((o={__proto__:null},Object(r.a)(o,Symbol.toStringTag,"Module"),Object(r.a)(o,"default",l),o),[c.exports]))},825:function(e,t,n){"use strict";n.r(t),n.d(t,"j",(function(){return p}));var o,r=n(1),i=n(1585),a=n(822),u=Object.defineProperty,s=function(e,t){return u(e,"name",{value:t,configurable:!0})};function c(e,t){return t.forEach((function(t){t&&"string"!==typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var o=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(e)}s(c,"_mergeNamespaces");var l={exports:{}};!function(e){function t(e,t,n,o,r){e.openDialog?e.openDialog(t,r,{value:o,selectValueOnOpen:!0,bottom:e.options.search.bottom}):r(prompt(n,o))}function n(e){return e.phrase("Jump to line:")+' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">'+e.phrase("(Use line:column or scroll% syntax)")+"</span>"}function o(e,t){var n=Number(t);return/^[-+]/.test(t)?e.getCursor().line+n:n-1}e.defineOption("search",{bottom:!1}),s(t,"dialog"),s(n,"getJumpDialog"),s(o,"interpretLine"),e.commands.jumpToLine=function(e){var r=e.getCursor();t(e,n(e),e.phrase("Jump to line:"),r.line+1+":"+r.ch,(function(t){var n;if(t)if(n=/^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(t))e.setCursor(o(e,n[1]),Number(n[2]));else if(n=/^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(t)){var i=Math.round(e.lineCount()*Number(n[1])/100);/^[-+]/.test(n[1])&&(i=r.line+i+1),e.setCursor(i-1,r.ch)}else(n=/^\s*\:?\s*([\+\-]?\d+)\s*/.exec(t))&&e.setCursor(o(e,n[1]),r.ch)}))},e.keyMap.default["Alt-G"]="jumpToLine"}(i.a.exports,a.a.exports);var f=l.exports,p=Object.freeze(c((o={__proto__:null},Object(r.a)(o,Symbol.toStringTag,"Module"),Object(r.a)(o,"default",f),o),[l.exports]))}}]);
//# sourceMappingURL=4.700c5b80.chunk.js.map