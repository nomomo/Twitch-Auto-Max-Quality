// ==UserScript==
// @name        Twitch-Auto-Max-Quality
// @namespace   Twitch-Auto-Max-Quality
// @version     0.2.1
// @author      Nomo
// @description Always start playing live video with source quality on twitch.tv
// @supportURL  https://github.com/nomomo/Twitch-Auto-Max-Quality/issues
// @homepage https://github.com/nomomo/Twitch-Auto-Max-Quality/
// @downloadURL https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js
// @include     *://*.twitch.tv/*
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @run-at      document-start
// @grant       GM.addStyle
// @grant       GM_addStyle
// @grant       GM.getValue
// @grant       GM_getValue
// @grant       GM.setValue
// @grant       GM_setValue
// @grant       GM.deleteValue
// @grant       GM_deleteValue
// @grant       GM.listValues
// @grant       GM_listValues
// @grant       GM.info
// @grant       GM_info
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @grant       GM.notification
// @grant       GM_notification
// @grant       GM.addValueChangeListener
// @grant       GM_addValueChangeListener
// @grant       GM.removeValueChangeListener
// @grant       GM_removeValueChangeListener
// @grant       unsafeWindow
// ==/UserScript==
// @icon        https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/images/logo.png
/* eslint-disable no-undef */
"use strict";
(async () => {
    console.log("[TAMQ]   RUNNING TWITCH AUTO MAX QUALITY", document.location.href);
    var DEBUG = await GM.getValue("DEBUG", false);

    ////////////////////////////////////////////////////////////////////////////////////
    // libs
    ////////////////////////////////////////////////////////////////////////////////////
    var NOMO_DEBUG = function ( /**/ ) {
        if (!DEBUG) return;
        var args = arguments, args_length = args.length, args_copy = args;
        for (var i = args_length; i > 0; i--) args[i] = args_copy[i - 1];
        args[0] = "[TAMQ]  ";
        args.length = args_length + 1;
        console.log.apply(console, args);
    };

    /* arrive.js
    * v2.4.1
    * https://github.com/uzairfarooq/arrive
    * MIT licensed
    * Copyright (c) 2014-2017 Uzair Farooq
    */
    // eslint-disable-next-line no-cond-assign
    const Arrive = function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback);}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave");}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n);},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n;};},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback);},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r);},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r;},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t;}};}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null;};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i;},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null);}},e.prototype.beforeAdding=function(e){this._beforeAdding=e;},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e;},e;}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n);});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o;}),i.beforeRemoving(function(e){e.observer.disconnect();}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n);},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1;});},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1;}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1;},i.removeEvent(t);},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1;});},this;},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t;}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t);});}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1;}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a);}c.call(this,e,t,r);},f;},u=function(){function e(){var e={childList:!0,subtree:!0};return e;}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t);});}function r(e,t){return l.matchesSelector(e,t.selector);}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r);},d;},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h;}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);
    
    /* HackTimer.js by turuslan
    * v1.1.0
    * https://github.com/turuslan/HackTimer
    * MIT licensed
    */
    // eslint-disable-next-line no-cond-assign
    var HackTimerWorker_min_js, HackTimerWorker_min_js_blob;
    const disableJavascriptTimer = function() {
        if(unsafeWindow["TAMQuseHackTimer"] !== undefined){
            return;
        }
        unsafeWindow["TAMQuseHackTimer"] = true;
        HackTimerWorker_min_js = `var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}`;
        HackTimerWorker_min_js_blob = new Blob([HackTimerWorker_min_js], {type: 'application/javascript'});

        // eslint-disable-next-line no-cond-assign
        // eslint-disable-next-line no-empty
        (function(s){var w,f={},o=window,l=console,m=Math,z='postMessage',p=0,r='hasOwnProperty',y=[].slice,x='fail',v=o.Worker;function d(){do{p=0x7FFFFFFF>p?p+1:0;}while(f[r](p));return p;}if(!/MSIE 10/i.test(navigator.userAgent)){try{s=o.URL.createObjectURL(new Blob(["var f={},p=postMessage,r='hasOwnProperty';onmessage=function(e){var d=e.data,i=d.i,t=d[r]('t')?d.t:0;switch(d.n){case'a':f[i]=setInterval(function(){p(i)},t);break;case'b':if(f[r](i)){clearInterval(f[i]);delete f[i]}break;case'c':f[i]=setTimeout(function(){p(i);if(f[r](i))delete f[i]},t);break;case'd':if(f[r](i)){clearTimeout(f[i]);delete f[i]}break}}"]));}catch(e){}}if(typeof(v)!=='undefined'){try{w=new v(s);o.setInterval=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2)};w[z]({n:'a',i:i,t:t});return i;};o.clearInterval=function(i){if(f[r](i))delete f[i],w[z]({n:'b',i:i});};o.setTimeout=function(c,t){var i=d();f[i]={c:c,p:y.call(arguments,2),t:!0};w[z]({n:'c',i:i,t:t});return i;};o.clearTimeout=function(i){if(f[r](i))delete f[i],w[z]({n:'d',i:i});};w.onmessage=function(e){var i=e.data,c,n;if(f[r](i)){n=f[i];c=n.c;if(n[r]('t'))delete f[i];}if(typeof(c)=='string')try{c=new Function(c);}catch(k){}if(typeof(c)=='function')c.apply(o,n.p);};}catch(e){l.log(x);}}else l.log(x);})(HackTimerWorker_min_js_blob);//('HackTimerWorker.min.js');
    };

    /* GM_setting.js
    * Version: Mar. 4, 2022
    * MIT licensed
    * https://github.com/nomomo/
    * nomotg@gmail.com
    * Copyright (c) 2017-2022 NOMO
    */
    // eslint-disable-next-line
    var GM_setting=function(t,e,n){var i,a=void 0,s="",r=[],o={},l={},_={},d={},p=!1,g=function(){if(p){for(var t=arguments,e=t.length,n=t,i=e;i>0;i--)t[i]=n[i-1];t[0]="+[GM_SETTINGS]  ",t.length=e+1,console.log.apply(console,t)}},c=(navigator.language||navigator.userLanguage).toLowerCase().substring(0,2),u=c,v="ko",f=!1;const G={en:{title_settings:"Settings",title_reset:"Reset",button_reset_settings:"Reset Settings",confirm_reset_settings:"Are you sure you want to reset the settings?",complete_reset_settings:"Settings reset complete!",button_reset_settings_all:"Script reset (refresh is required)",confirm_reset_settings_all:"Do you really want to reset script?",complete_reset_settings_all:"Script initialization complete!",auto_saved:"Autosaved: ",err_val_req:"A value must be entered.",err_num_req:"Only numbers can be entered.",err_num_over:"The input value must be a number greater than or equal to : ",err_num_not_more_than:"The input value must be a number less than or equal to: ",err_valid_array_string:"Only English letters, numbers, commas (,) and underscores (_) can be entered.",err_value_empty:"Something for which no value exists, such as an empty value.",err_value_dup:"Duplicate value exists: ",err_value_blank:"There is an item of a space in the string: "},ko:{title_settings:"Settings",title_reset:"Reset",button_reset_settings:"Reset Settings",confirm_reset_settings:"진짜 설정을 초기화 할까요?",complete_reset_settings:"설정 초기화 완료!",button_reset_settings_all:"전체 초기화(새로고침 필요)",confirm_reset_settings_all:"진짜 스크립트를 모두 초기화 할까요?",complete_reset_settings_all:"스크립트 초기화 완료!",auto_saved:"자동 저장 됨: ",err_val_req:"반드시 값이 입력되어야 합니다.",err_num_req:"숫자만 입력 가능합니다.",err_num_over:"입력 값은 다음 값 이상의 숫자이어야 합니다. : ",err_num_not_more_than:"입력 값은 다음 값 이하의 숫자이어야 합니다. : ",err_valid_array_string:"영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.",err_value_empty:"공백 값 등 값이 존재하지 않는 항목이 존재합니다.",err_value_dup:"중복된 값이 존재합니다: ",err_value_blank:"문자열 내 공백이 존재하는 항목이 있습니다: "}};var h=function(t){var e="";if("object"==typeof t){var n=Object.keys(t);if(0===n.length)return e;e=void 0!==t[u]?t[u]:void 0!==t[v]?t[u]:t[n[0]]}else e=t;return e},M=function(t){return void 0!==G[u]?G[u][t]:void 0!==G[v]?G[v][t]:""},x=async function(){""!==s&&await GM.setValue(s,_),e[s]=_,t.each(r,function(t,e){void 0!==l[e].change&&l[e].change(_[e])}),r=[]},m=async function(){g("load_"),""!==s&&(_=await GM.getValue(s,_)),_.Lang=await y(),e[s]=_},y=async function(){return u=await GM.getValue("GM_SETTING_LANG",c),g("loadLang_",u),u},b=function(e){d={};var n=t(e);i=n,0!==n.find("#GM_setting_container").length&&n.empty();var s=t("<div id='GM_setting_container'></div>"),r=t(`\n<div id='GM_setting_head'>\n<div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>\n<div style='display:flex;height:25px;float:right;'>\n    <div id='GM_homepage_link' style='align-self: flex-end;'>\n        <a href='${GM.info.script.homepage}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${GM.info.script.name} v${GM.info.script.version} (${GM.info.script.homepage})</a>\n    </div>\n    <div id='GM_multilang' style='margin-left:15px;'>\n        <select id='GM_multilang_select' class="form-control input-sm">\n            <option value="ko">한국어</option>\n            <option value="en">English</option>\n        </select>\n    </div>\n</div>\n</div>`);void 0!==GM.info&&null!==GM.info&&void 0!==GM.info.script&&null!==GM.info.script&&void 0!==GM.info.script.homepage&&null!==GM.info.script.homepage&&""!==GM.info.script.homepage?r.find("#GM_homepage_link").show():r.find("#GM_homepage_link").hide();var o=r.find("#GM_multilang");if(f){o.show();var _=o.find("#GM_multilang_select");_.val(u),_.on("change",async function(e){var n=u;t("option:selected",this),this.value;u=this.value,g(`LANG VALUE CHANGED FROM ${n} TO ${u}`),await async function(t){null==t?(await GM.setValue("GM_SETTING_LANG",u),g("saveLang_",u)):(await GM.setValue("GM_SETTING_LANG",t),g("saveLang_",t))}(),null!=a?(t(a).empty(),b(a)):g("NO CREATED LAYOUT")})}else o.hide();var p,c=t("<ul id='GM_setting'></ul>"),v=void 0;for(var G in n.append(s),s.append(r).append(c),l){var m,y,L=l[G].category,$=l[G].depth,N=l[G].type,E=h(l[G].title),O=h(l[G].desc),C=h(l[G].category_name),D=l[G].radio_enable_value,q=t("<div class='GM_setting_input_container form-group'></div>"),V="tag"===N||"textarea"===N;if("radio"===N){var U=l[G].radio;for(var I in m=t("<div GM_setting_type='radio'></div>"),U){var j=t("<label class='radio-inline'>"+h(U[I].title)+"</label>");t("<input name='GM_setting_"+G+"' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({value:U[I].value,type:"set"===N?"text"===N:"tag"===N?"textarea":N,GM_setting_type:N,GM_setting_key:G,GM_setting_category:void 0===L?"default":L,GM_setting_radio_enable_value:void 0===D?"none":D}).prependTo(j),m.append(j)}}else m=t(`<${V?"textarea ":"input "} class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' ${"checkbox"===N?"onfocus='this.blur()'":""}${V?"></textarea>":" />"}`).attr({type:"set"===N?"text"===N:"tag"===N?"textarea":N,GM_setting_type:N,GM_setting_key:G,GM_setting_category:void 0===L?"default":L,GM_setting_radio_enable_value:void 0===D?"none":D});y=t(void 0!==C?`<div class='GM_setting_category_name'>${C}</div>`:"<div class='GM_setting_category_blank'></div>");var R=t("<div class='GM_setting_list_head'></div>"),B=t(`<span class='GM_setting_title'>${E}</span>`),F=t(`<span class='GM_setting_desc'>${O}</span>`),H=t(`<li ${void 0!==l[G].radio_enable_value?" GM_setting_radio_enable_value='"+l[G].radio_enable_value+"'":""} GM_setting_key='${G}' GM_setting_depth='${$}' class='${l[G].under_dev?"GM_setting_under_dev ":""} ${void 0!==C&&void 0!==v&&L!==v.category?"GM_setting_category ":""} GM_setting_depth${$}'></li>`);if(c.append(H),R.append(B).append(F),"checkbox"===N)t('<label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>').prepend(m).appendTo(q),m.on("change",function(){t(this).is(":checked")?t(this).closest("label").addClass("active"):t(this).closest("label").removeClass("active"),t(this).is(":disabled")?t(this).closest("label").addClass("disable").prop("disabled",!0):t(this).closest("label").removeClass("disable").prop("disabled",!1)});else q.append(m);H.append(y).append(R).append(q),d[G]=m,void 0!==l[G].append&&q.append(l[G].append),v=l[G]}n.find("input[type='checkbox']").on("click",function(){A(n)}),n.find("input[type='radio']").on("click",function(){A(n)}),n.find("input, textarea").on("input",function(){g("GM_setting - text change");var e=t(this),i=T(e),a=e.attr("GM_setting_key"),s=z(a,i);e.closest("div").find(".invalid_text").remove(),s.valid?e.closest("div").removeClass("invalid"):(g("validation",s),e.closest("div").addClass("invalid"),e.after("<div class='invalid_text'>"+s.message+"</div>")),clearTimeout(p),p=setTimeout(function(){var e=!0;t.each(d,function(t,n){if(!z(t,T(n)).valid)return e=!1,!1}),e&&(k(),x(),w(M("auto_saved")+(new Date).toLocaleTimeString(),n))},1e3)}),S(),A(n),c.append(`<li class="GM_setting_category GM_setting_depth1">\n            <div class="GM_setting_category_name">${M("title_reset")}</div>\n            <div class="GM_setting_list_head">\n                <span class="GM_setting_title">\n                    <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">${M("button_reset_settings")}</span>\n                    \x3c!--<span class="GM_setting_reset_all btn btn-primary">button_reset_settings_all</span>--\x3e\n                </span>\n                <span class="GM_setting_desc"></span>\n            </div>\n            <div class="GM_setting_input_container form-group">\n            </div>\n        </li>`),c.find(".GM_setting_reset").on("click",async function(){confirm(M("confirm_reset_settings"))&&(await GM_setting.reset(),GM_setting.createlayout(i),w(M("complete_reset_settings")+(new Date).toLocaleTimeString(),i))}),c.find(".GM_setting_reset_all").on("click",async function(){if(confirm(M("confirm_reset_settings_all"))){for(var t=await GM.listValues(),e=0;e<t.length;e++){var n=t[e];await GM.deleteValue(n)}await GM_setting.reset(),GM_setting.createlayout(i),w(M("complete_reset_settings_all")+(new Date).toLocaleTimeString(),i)}})},w=function(e,n){if(void 0!==n){var i="GM_setting_autosaved";n.find("."+i).animate({bottom:"+=40px"},{duration:300,queue:!1}),t("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='"+i+" btn btn-success'>"+e+"</div>").appendTo(n).fadeIn("fast").animate({opacity:1},6e3,function(){t(this).fadeOut("fast").delay(600).remove()}).animate({left:"+=30px"},{duration:300,queue:!1})}},k=async function(){for(var e in g("read_"),d){var n=d[e],i=T(n);"tag"===l[e].type&&(1===(i=i.split(",")).length&&""===i[0]&&(i=[]),t.each(i,function(t,e){i[t]=e.replace(/^\s*|\s*$/g,"")})),_[e]!==i&&-1===r.indexOf(e)&&r.push(e),_[e]=i}},S=async function(){for(var t in g("write_"),d){var e=d[t];L(e,_[t])}},T=function(t){var e;switch(t.attr("GM_setting_type")){case"checkbox":e=t.prop("checked");break;case"set":case"text":case"tag":case"textarea":e=t.val();break;case"radio":e=t.find("input:checked").val();break;default:e=void 0}return e},L=function(t,e){switch(t.attr("GM_setting_type")){case"checkbox":t.prop("checked",e).trigger("change");break;case"set":case"text":t.val(e);break;case"tag":case"textarea":t.val(e),t.height("auto"),t.height(t.prop("scrollHeight")+"px");break;case"radio":t.find("input[value="+e+"]").prop("checked",!0)}},A=async function(e){var n=e.find("li");n.removeClass("GM_setting_item_disable"),n.find("input, textarea").prop("disabled",!1),n.find("input[type='checkbox']").trigger("change");for(var i,a,s=[!0,!0],r=0;r<n.length;r++){var o=t(n[r]),_=o.attr("GM_setting_depth"),d=o.attr("GM_setting_key"),p=o.attr("GM_setting_radio_enable_value");if(0==r);else{var g=(i=t(n[r-1])).attr("GM_setting_depth");if(g==_&&g>0)void 0!==a&&(s[g-1]=a==p);else if(g<_){a=void 0;var c=i.find("input[type='checkbox']"),u=i.find("input[type='radio']");0!==c.length&&c.is(":checked")?s[g]=!0:0!==u.length?(a=i.find("input[type='radio']:checked").val(),i.find("input[type='radio']:checked").val()==p?s[g]=!0:s[g]=!1):s[g]=!1}}for(var v=0;v<_;v++)if(l[d].disable||!s[v]){o.addClass("GM_setting_item_disable"),o.find("input, textarea").prop("disabled",!0),o.find("input[type='checkbox']").trigger("change");break}}},z=function(e,n){var i,a,s,r=!0,o="";if("number"===l[e].valid)r=t.isNumeric(n),""===n?o+=M("err_val_req"):r?void 0!==l[e].min_value&&l[e].min_value>n?(r=!1,o+=M("err_num_over")+l[e].min_value):void 0!==l[e].max_value&&l[e].max_value<n&&(r=!1,o+=M("err_num_not_more_than")+l[e].max_value):o+=M("err_num_req");else if(""!==n&&"array_string"===l[e].valid){i=t.map(n.split(","),t.trim);var _=n.match(/^[A-Za-z0-9 _,]*$/);if(null===_||0===_.length)r=!1,o+=M("err_valid_array_string");else if(-1!==t.inArray("",i))r=!1,o+=M("err_value_empty"),g(i,t.inArray("",i));else if(new Set(i).size!==i.length){r=!1,a=[],s=i.sort();for(var d=0;d<i.length-1;d++)s[d+1]==s[d]&&-1===t.inArray(s[d],a)&&a.push(s[d]);o+=M("err_value_dup")+a.join(",")}else for(var p=0;p<i.length;p++)if(-1!==i[p].indexOf(" ")){r=!1,o+=M("err_value_blank")+i[p];break}}else if(""!==n&&"array_word"===l[e].valid)if(i=t.map(n.split(","),t.trim),-1!==t.inArray("",i))r=!1,o+=M("err_value_empty"),g(i,t.inArray("",i));else if(new Set(i).size!==i.length){r=!1,a=[],s=i.sort();for(var c=0;c<i.length-1;c++)s[c+1]==s[c]&&-1===t.inArray(s[c],a)&&a.push(s[c]);o+=M("err_value_dup")+a.join(",")}return{valid:r,message:o}},$=function(t,e){var n=Object.keys(t).sort(),i=Object.keys(e).sort();return JSON.stringify(n)===JSON.stringify(i)};return{init:async function(e,i){s=e,await async function(t){for(var e in g("init_",l),t&&(t.DEBUG&&g("GM_setting - DEBUG",p=!0),t.CONSOLE_MSG&&(g=t.CONSOLE_MSG),t.SETTINGS&&(l=t.SETTINGS),t.MULTILANG&&(f=!0,t.LANG_DEFAULT&&(v=t.LANG_DEFAULT))),l)o[e]=l[e].value;if(o.Lang="",await m(),!$(o,_)){for(e in o)void 0===_[e]&&(_[e]=o[e]);for(e in _)void 0===o[e]&&delete _[e];await x()}}(i),await async function(){"function"==typeof GM.addValueChangeListener&&(g("설정에 대한 addValueChangeListener 바인드"),GM.addValueChangeListener(s,async function(e,n,i,a){a&&(g("다른 창에서 설정 변경됨. val_name, old_value, new_value:",e,n,i),await m(),t.each(n,function(t,e){void 0!==l[t]&&void 0!==l[t].change&&n[t]!==i[t]&&l[t].change(_[t])}),r=[])})),t(n).on("input","input[gm_setting_key='under_dev']",function(){g("실험실 기능 온오프 이벤트"),t(this).is(":checked")?t(".GM_setting_under_dev").css("opacity",0).slideDown("fast").animate({opacity:1},{queue:!1,duration:"fast"}):t(".GM_setting_under_dev").css("opacity",1).slideUp("fast").animate({opacity:0},{queue:!1,duration:"fast"})})}(),GM.addStyle('\n#GM_setting .btn {font-size:12px;}\n.GM_setting_autosaved.btn {\n    max-width:100%;\n    font-size:12px;\n    white-space:pre-wrap;\n    user-select:text;\n}\n#GM_setting .btn-xxs {\n    cursor: pointer;\n    padding: 4px 4px;\n}\n#GM_setting label.btn-xxs {\n    box-sizing: content-box;\n    width:11px;\n    height:11px;\n}\n#GM_setting a{\n    color: #428bca;\n    text-decoration: none;\n}\n#GM_setting a:hover, #GM_setting a:focus {\n    color: #2a6496;\n    text-decoration: underline;\n}\n#GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;font-size:13px;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}\n#GM_setting li {list-style:none;margin:0px;padding:8px;border-top:1px solid #eee;}\n\n#GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:20px;padding-top:10px;}\n#GM_setting li[GM_setting_key=\'version_check\'] {margin-top:0px !important}\n\n#GM_setting .GM_setting_category_name{display:table-cell;width:110px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}\n#GM_setting .GM_setting_category_blank{display:table-cell;width:110px;padding:0 0 0 0px;vertical-align:top;}\n\n#GM_setting .GM_setting_list_head{display:table-cell;box-sizing:content-box;vertical-align:top;}\n#GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:0px;width:300px;}\n#GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:30px;width:270px;}\n#GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:60px;width:240px;}\n#GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:90px;width:210px;}\n#GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:120px;width:180px;}\n\n#GM_setting .GM_setting_title{display:block;font-weight:700;}\n#GM_setting .GM_setting_desc{display:block;font-size:11px;}\n\n#GM_setting .GM_setting_input_container {display:table-cell;padding:0 0 0 30px;vertical-align:top;}\n#GM_setting .GM_setting_input_container span{vertical-align:top;}\n#GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}\n#GM_setting input{display:inline}\n#GM_setting input[type="text"]{ width: 100px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting textarea{ width: 250px; height: 30px; padding: 5px 5px; font-size:12px; }\n#GM_setting input[type="checkbox"] { display:none; width: 20px;height:20px; padding: 0; margin:0; }\n#GM_setting input[type="radio"] {width: 20px;height:20px; padding: 0; margin:0; }\n\n#GM_setting .radio-inline{ padding-left:0; padding-right:10px; }\n#GM_setting .radio-inline input{ margin:0 5px 0 0; }\n\n#GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#ccc !important}\n#GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}\n#GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}\n#GM_setting .invalid {color:#dc3545}\n#GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}\n\n#GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}\n\n#GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/\n#GM_setting .btn-xxs .glyphicon{}\n#GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}\n#GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}\n#GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}\n')},load:async function(){g("GM_setting - load"),await m()},save:async function(){g("GM_setting - save"),await x()},save_overwrite:async function(){var n=_,i=e[s];ADD_DEBUG("_settings",l),t.each(n,function(t,e){void 0!==l[t]&&void 0!==l[t].change&&n[t]!==i[t]&&l[t].change(i[t])}),_=e[s],g("GM_setting - save_overwrite"),await x()},reset:async function(){await GM.setValue(s,o),await m()},createlayout:function(t){a=t,b(t)},getType:function(t){return void 0!==l[t]?l[t].type:void 0},message:function(t,e){w(t,e)}}}(jQuery,window,document);

    const _settings = {
        disable_visibilitychange: {
            category: "general",  category_name: "General", depth: 1, type: "checkbox", value: true,
            title: {en:"Prevent automatic change of video quality when tab is disabled", ko:"탭이 비활성된 경우 화질 변경을 방지"},
            desc: ""
        },
        max_quality_start: {
            category: "general", depth: 1, type: "checkbox", value: true,
            title: {en:"Start live stream with user-preferred quality", ko:"라이브 스트림을 선호하는 화질로 시작"},
            desc: {en:"This script provides several methods for selecting video quality. Choose your preferred method below.", ko:"이 스크립트는 비디오 품질을 선택하기 위한 여러 방법을 제공합니다. 알잘딱으로 적용됩니다. 적용하길 원하는 방법들을 아래에서 선택하세요."}
        },
        only_source_quality: {
            category: "general", depth: 2, type: "checkbox", value: false,
            title: {en:"[1. Only source quality method]", ko:"[1. \"오로지 원본 화질만\" 방식]"},
            desc: {
                en:"Removes all other selectable video quality except \"source quality\". So even if the Twitch player sets the video quality to \"Auto\", the only selectable \"Source quality\" is set. <strong>This option is recommended for users who always want to watch videos in the best quality.</strong><br />Caution: Enabling this option may conflict with other scripts (eg TwitchAdSolution.), causing problems with video playback or the scripts not working properly. In this case, turn this option off. If you change this option, you must refresh the web page.",
                ko:"\"원본\"을 제외한 모든 비디오 품질을 제거합니다. 따라서 Twitch 플레이어가 화질을 \"자동\"으로 설정하더라도, 선택가능한 화질은 \"원본\" 화질밖에 없으므로 자연스럽게 최고 화질로 재생됩니다. <strong>이 옵션은 언제나 최고 품질로 비디오를 보고 싶은 유저에게 권장됩니다.</strong><br />주의: 이 옵션을 활성화하면 다른 스크립트(예: TwitchAdSolution)와 충돌하여 여러 문제가 발생할 수도 있습니다. 이 경우 이 옵션을 끄고 다른 방법을 사용하세요. 옵션 수정 후 새로 고침 필요."
            }
        },
        only_source_quality_clip: {
            category: "general", depth: 3, type: "checkbox", value: true,
            title: {en:"Apply \"Only source quality method\" to the clip page", ko:"오로지 원본 화질만 사용하기 방법을 클립 페이지에도 적용"},
            desc: {
                en:"Removes all selectable quality except \"Source\" when playing clips on Twitch.tv. This feature is not yet supported for clips inserted in an iframe method on an external page other than Twitch.",
                ko:"Twitch.tv 에서 클립을 재생할 때 \"원본\"을 제외한 모든 비디오 품질을 제거합니다. Twitch 가 아닌 외부 페이지에 iframe 방식으로 삽입된 클립에 대해서는 아직 이 기능을 지원하지 않습니다."
            }
        },
        max_quality_menu_trigger: {
            category: "general", depth: 2, type: "checkbox", value: true,
            title: {en:"[2. Simulate settings button method]", ko:"[2. 설정 버튼 매크로 방식]"},
            desc: {
                en:"Try to fix to user-preferred video quality by virtually clicking the quality setting button & menu. This method is like a kind of Macro.<br />The script looks for text that corresponds to the user's preferred quality in the quality settings menu of Twitch Player. The script will first try to set the \"most preferred video quality\". If the script cannot find the \"most preferred video quality\", the script will look for a \"second preferred video quality\". If the second preferred video quality does not exist, video quality will be selected as the source quality. <br />If the player's setting button does not work properly, turn this feature off. If you change this option, you must refresh the web page.",
                ko:"화질 설정 버튼과 메뉴를 가상으로 클릭하여 사용자가 원하는 영상 화질로 설정합니다. 이 방법은 일종의 매크로 입니다.<br />스크립트는 Twitch Player 의 화질 설정 메뉴에서 사용자가 선호하는 화질에 해당하는 텍스트를 찾아 설정을 시도합니다. 텍스트를 찾는 것에 실패한 경우 비디오 품질이 \"원본\" 품질로 선택됩니다. <br />플레이어의 설정 버튼이 제대로 작동하지 않으면 이 기능을 끄십시오. 옵션 수정 후 새로 고침 필요."
            }
        },
        max_quality_menu_trigger_prefer_1st : {
            category:"general", depth:3, type: "text", value: "best",
            title:{en:"1st preferred quality for simulate settings button method", ko:"가장 선호하는 비디오 품질 (설정 버튼 매크로 방법)"},
            desc:{
                en:`(Choose one of the following: <strong>best</strong>, <strong>worst</strong>, 1080p, 720p, 720p60, 720p30, 480p, 360p, 160p, ...)`,
                ko:`(다음 중 하나를 선택하여 입력하세요: <strong>best</strong>, <strong>worst</strong>, 1080p, 720p, 720p60, 720p30, 480p, 360p, 160p, ...)`
            }
        },
        max_quality_menu_trigger_prefer_2nd : {
            category:"general", depth:3, type: "text", value: "720p",
            title:{en:"2nd preferred quality for simulate settings button method", ko:"두 번째로 선호하는 비디오 품질 (설정 버튼 매크로 방법)"},
            desc:{
                en:`(Choose one of the following: 1080p, 720p, 720p60, 720p30, 480p, 360p, 160p, ...)`,
                ko:`(다음 중 하나를 선택하여 입력하세요: 1080p, 720p, 720p60, 720p30, 480p, 360p, 160p, ...)`
            }
        },
        max_quality_menu_trigger_delay : {
            category:"general", depth:3, type: "text", value: 1000, valid:"number", min_value:0, max_value:100000,
            title:{en:"Delay until the first virtual click.", ko:"첫 번째 매크로 클릭 까지의 딜레이 시간"},
            desc:{en:"(Unit:ms, Default: 1000, Range: 200~100000)", ko:"(단위:ms, 기본값: 1000, 범위: 200~100000)"}
        },
        max_quality_menu_trigger_clip: {
            category: "general", depth: 3, type: "checkbox", value: true,
            title: {
                en:"Apply \"Simulate settings button method\" to the clip page on twitch.tv",
                ko:"설정 버튼 매크로 방법을 Twitch.tv 의 클립 페이지에도 적용"
            },
            desc: "",
        },
        max_quality_localstorage: {
            category: "general", depth: 2, type: "checkbox", value: true,
            title: {en:"[3. Localstorage modify method]", ko:"[3. Localstorage 수정 방식]"},
            desc: {
                en:`Modify local storage related to video quality.<br />This feature directly modifies the quality settings stored in Twitch Player, and the settings will be overwritten when Twitch Player loads. It is recommended to turn on these two options together if you want to set the source quality.<br />This function does not work properly if the script does not have permission to access Localstorage, such as Incognito mode in Google Chrome."`,
                ko:`동영상 품질과 관련된 Localstorage 값을 수정합니다.<br />이 기능은 Twitch Player에 저장된 화질 설정을 직접 수정하며, Twitch Player가 로드될 때 설정을 덮어씁니다. 일반적으로 원본 화질로 설정하길 원하는 경우 이 두 옵션을 함께 켜는 것을 권장합니다.<br />Google Chrome 의 시크릿 창에서는 Localstorage 에 대한 액세스 권한이 없어 이 기능이 제대로 작동하지 않습니다.`
            }
        },
        max_quality_localstorage_prefer_1st : {
            category:"general", depth:3, type: "text", value: "best",
            title: {en:"Video quality for localstorage modify method.", ko:"Localstorage 수정 시 설정할 비디오 품질"},
            desc: {
                en:`(Choose one of the following: best(=chunked), 720p60, 720p30, 480p30, 360p30, 160p30)<br />If you enter an incorrect value or your preferred video quality is not supported, Twitch Player may choose "Auto".<br />Anything other than best(chunked) may not work. In this case, use the Simulate settings button method.`,
                ko:`(다음 중 하나를 선택하여 입력하세요: best(=chunked), 720p60, 720p30, 480p30, 360p30, 160p30)<br />잘못된 값을 입력하거나 원하는 비디오 품질이 지원되지 않는 경우 Twitch Player는 아마도 "자동"을 선택할 것입니다.<br />best(chunked) 이외의 것을 입력했을 때 적절히 작동하지 않을 수도 있으며, 이 경우 설정 버튼 매크로 방법을 대신 사용하세요.`
            }
        },
        set_volume_when_stream_starts: {
            category: "general", depth: 2, type: "checkbox", value: false,
            title: {en:"Set the volume when stream starts", ko:"스트림 시작 시 특정 사운드 볼륨(Volume)으로 시작"},
            desc: ""
        },
        target_start_volume : {
            category:"general", depth:3, type: "text", value: 1.0, valid:"number", min_value:0.0, max_value:1.0,
            title:{en:"Volume", ko:"Volume"},
            desc:{en:"(Max Volume: 1.0, Mute: 0.0, Range: 0.0 ~ 1.0)", ko:"(Max Volume: 1.0, 음소거: 0.0, 범위: 0.0 ~ 1.0)"} },
        disable_javascript_timer: {
            category: "TAMQLabs",  category_name: "TAMQ Labs", depth: 1, type: "checkbox", value: false,
            title: {en:"Disable power saving for inactive tabs (Disable JavaScript Timer Throttling)", ko:"비활성 탭의 절전 기능 비활성화 (Disable JavaScript Timer Throttling)"},
            desc: {en:"If you often have problems playing videos in inactive tabs, try using this feature.<br />By enabling this option, you can disable some of the power saving features (Javascript Timer Throttling) for inactive tabs supported by Chrome-based browsers. You must refresh the page after changing this option.", 
                    ko:"만약 Twitch.tv 탭을 비활성 상태로 사용할 때 동영상 재생 중 문제가 발생하는 경우가 많다고 느꼈다면 이 옵션을 켜보세요.<br />이 옵션은 크롬 계열 브라우저에서 지원하는 비활성 탭에 대한 power saving 기능(Javascript Timer Throttling)의 일부를 비활성화 하여, 비활성 탭에 있는 동영상을 재생 중일 때 발생할 수 있는 문제를 개선할 수 있습니다.<br />이 실험실 기능은 알 수 없는 문제를 발생시킬 수도 있습니다. 옵션 변경 후 새로고침 필요."}
        },
    };
    window.GM_setting = GM_setting;
    await GM_setting.init("GM_SETTINGS", {"DEBUG":DEBUG, "SETTINGS":_settings, "CONSOLE_MSG":NOMO_DEBUG, "MULTILANG":true});

    ////////////////////////////////////////////////////////////////////////////////////
    // Initialize
    ////////////////////////////////////////////////////////////////////////////////////
    var first_url = document.location.href.toLowerCase();
    var is_player = (first_url.indexOf("//player.twitch.tv") !== -1 ? true : false);
    var is_clip = (first_url.indexOf("//clips.twitch.tv") !== 1 ? true : false);
    var date_n = Number(new Date());

    GM.addStyle(/*css*/`
        #nomo_settings { color: #000; overflow-y: scroll; }
        #nomo_settings::-webkit-scrollbar { width: 8px; height: 8px; background: #ccc; }
        #nomo_settings::-webkit-scrollbar-thumb { background: #772ce8; }
        #GM_setting_head { color: #000; }
        #GM_setting .btn{ background-color: #6441a4; border-color: #6441a4; color: #fff;}
        #GM_setting .btn:hover{ background-color: #7d5bbe; border-color: #7d5bbe; color: #fff; }
        #GM_setting .bth:active{ background-color: #6441a4; border-color: #7d5bbe; box-shadow: 0 0 6px 0 #7d5bbe; color: #fff; }
        #GM_setting .btn:focus{ background-color: #7d5bbe; border-color: #9a7fcc; box-shadow: 0 0 6px 0 #7d5bbe; color: #fff; }
        #GM_setting .GM_setting_desc{ font-size: 13px !important; word-break: keep-all;}
        #GM_setting .GM_setting_category_name, #GM_setting .GM_setting_title{ font-size: 14px !important;  }

        body.pl-menu-hide div.pl-menu,
        body.pl-menu-hide .pl-settings-icon,
        body.pl-menu-hide button[data-a-target='player-settings-button'],
        body.pl-menu-hide div[data-a-target='player-settings-menu'],
        body.pl-menu-hide div.settings-menu-button-component{ display:none; opacity:0; }

        #GM_setting .GM_setting_depth1 .GM_setting_list_head{ width: 500px !important; }
        #GM_setting .GM_setting_depth2 .GM_setting_list_head{ width: 470px !important; }
        #GM_setting .GM_setting_depth3 .GM_setting_list_head{ width: 440px !important; }
    `);

    ////////////////////////////////////////////////////////////////////////////////////
    // disable_javascript_timer
    if(GM_SETTINGS.disable_javascript_timer){
        disableJavascriptTimer();
    }
    var debugHackTimer = false;
    var startDate = new Date();
    var countSettimeout = 0, countSetInterval = 0;
    if(debugHackTimer){
        (function(){
            setTimeout(function(){
                countSettimeout += 1;
                setTimeoutDebug();
                if(countSettimeout % 10 == 0){
                    var IDEALCOUNT = (Number(new Date()) - Number(startDate)) / 1000;
                    console.log(`setTimeoutDebug::::: IDEAL COUNT = ${IDEALCOUNT.toFixed(2)}\tCURRENT COUNT = ${countSettimeout}\tERROR = ${(IDEALCOUNT - countSettimeout).toFixed(2)}\tdocument.hidden = ${document.hidden}\tdocument.visibilityState = ${document.visibilityState}`);
                }
            },1000);
        })();
        (function(){
            setInterval(function(){
                countSetInterval += 1;
                if(countSetInterval % 10 == 0){
                    var IDEALCOUNT = (Number(new Date()) - Number(startDate)) / 1000;
                    console.log(`setIntervalDebug:::: IDEAL COUNT = ${IDEALCOUNT.toFixed(2)}\tCURRENT COUNT = ${countSetInterval}\tERROR = ${(IDEALCOUNT - countSetInterval).toFixed(2)}\tdocument.hidden = ${document.hidden}\tdocument.visibilityState = ${document.visibilityState}`);
                }
            },1000);
        })();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////
    // set_volume_when_stream_starts
    var is_volume_changed = false;
    if(GM_SETTINGS.set_volume_when_stream_starts){
        localStorage.setItem('volume', GM_SETTINGS.target_start_volume);

        if(GM_SETTINGS.target_start_volume !== 0){
            localStorage.setItem('video-muted', {default:false});
        }
    }

    
    ////////////////////////////////////////////////////////////////////////////////////
    // only_source_quality method
    if(GM_SETTINGS.max_quality_start && GM_SETTINGS.only_source_quality){

        // only_source_quality method for live stream and vod
        var realWorker = unsafeWindow.Worker;
        unsafeWindow.Worker = function (input) {
            var newInput = String(input);

            // 19-09-18 wasmworker version: 2.14.0
            var myBlob = "importScripts('https://static.twitchcdn.net/assets/amazon-ivs-wasmworker.min-7da53ec1e6fb32a92d1d.js');";

            var req = new XMLHttpRequest();
            req.open('GET', newInput, false);
            req.send();
            var resText = req.responseText;
            if(req.status == 200 || req.status == 201){
                myBlob = resText;
            }

            // rewrite blob
            var workerBlob = new Blob(
                [ /*javascript*/ `
                    // ${myBlob};
                    var DEBUG_WORKER2 = ${DEBUG};
                    var NOMO_DEBUG = function ( /**/ ) {
                        if (!DEBUG_WORKER2) return;
                        var args = arguments, args_length = args.length, args_copy = args;
                        for (var i = args_length; i > 0; i--) args[i] = args_copy[i - 1];
                        args[0] = "[TMWS][WORKER]  ";
                        args.length = args_length + 1;
                        console.log.apply(console, args);
                    };

                    // Worker fetch
                    var originalFetch2 = self.fetch;
                    self.fetch = async function(input, init){
                        if(input.toLowerCase().indexOf(".m3u8") !== -1 
                        && (input.toLowerCase().indexOf('usher.ttvnw.net/api/channel/hls') !== -1 || input.toLowerCase().indexOf('usher.ttvnw.net/vod/') !== -1)){
                            var m3u8_fetch = await originalFetch2.apply(this, arguments);
                            var m3u8_text = await m3u8_fetch.text();
                            NOMO_DEBUG("\\n", input, "\\n", (new Date()), "\\n", m3u8_text);

                            var type = 0;
                            var found = false;
                            if(type == 0){
                                var regex = /(\\n#EXT-X-MEDIA:.+\\n.+\\n.+\\.m3u8)/gi;
                                var mat = m3u8_text.match(regex);
                                NOMO_DEBUG("mat", mat);
                                found = mat !== null;
                                if(found){
                                    for(var i=1; i<mat.length; ++i){
                                        m3u8_text = m3u8_text.replace(mat[i], "");
                                    }
                                    NOMO_DEBUG("CONVERTED m3u8_text", m3u8_text);
                                    var m3u8_blob = new Blob([m3u8_text], {type: 'text/plain'});
                                    var m3u8_blob_url = URL.createObjectURL(m3u8_blob);
                                    var new_arg = arguments;
                                    new_arg[0] = m3u8_blob_url;

                                    // REVOKE after 10s
                                    setTimeout(function(){URL.revokeObjectURL(m3u8_blob_url);},10000);
                                    return originalFetch2.apply(this, new_arg);
                                }
                            }
                            else{
                                // return with blob
                                var regexMasterPlaylist = /(https:\\/\\/.+\\.m3u8)/gi;
                                var masterplaylistmatch = m3u8_text.match(regexMasterPlaylist);

                                var regexBandWidth = /(BANDWIDTH=[0-9]+)/gi;
                                var bandwidthmatch = m3u8_text.match(regexBandWidth);

                                var regexCodecs = /(CODECS=\\".+\\")/gi;
                                var codecsmatch = m3u8_text.match(regexCodecs);

                                NOMO_DEBUG("masterplaylistmatch", masterplaylistmatch);
                                NOMO_DEBUG("bandwidthmatch", bandwidthmatch);
                                NOMO_DEBUG("codecsmatch", codecsmatch);

                                found = masterplaylistmatch !== null && bandwidthmatch !== null && codecsmatch !== null;
                                if(found){
                                    var firstm3u8 = masterplaylistmatch[0];
                                    m3u8_text = m3u8_text.replace(regexMasterPlaylist,firstm3u8);
                                    m3u8_text = m3u8_text.replace(regexBandWidth, bandwidthmatch[0]);
                                    m3u8_text = m3u8_text.replace(regexCodecs, codecsmatch[0]);

                                    NOMO_DEBUG("CONVERTED", m3u8_text);
                                    var m3u8_blob = new Blob([m3u8_text], {
                                        type: 'text/plain'
                                    });
                                    var m3u8_blob_url = URL.createObjectURL(m3u8_blob);
                                    var new_arg = arguments;
                                    new_arg[0] = m3u8_blob_url;

                                    // REVOKE after 10s
                                    setTimeout(function(){URL.revokeObjectURL(m3u8_blob_url)},10000);
                                    return originalFetch2.apply(this, new_arg);
                                }
                            }

                        }

                        return originalFetch2.apply(this, arguments);
                    };

                    ${myBlob};
                `], {
                    type: 'text/javascript'
                }
            );
            // rewrite blob end

            var workerBlobUrl = URL.createObjectURL(workerBlob);
            var workerBlobWrapper = new Blob(
                [ /*javascript*/ `
                importScripts('${workerBlobUrl}');
               `], {
                    type: 'text/javascript'
                });

            var workerBlobWrapperUrl = URL.createObjectURL(workerBlobWrapper);
            var my_worker = new realWorker(workerBlobWrapperUrl);
            NOMO_DEBUG("my_worker", my_worker);
            return my_worker;   // return modified worker to original function
        };

        // only_source_quality method for clip
        if(GM_SETTINGS.only_source_quality_clip){
            var realFetch = unsafeWindow.fetch;
            unsafeWindow.fetch = async function(input, init){
                if(input.toLowerCase().indexOf("https://gql.twitch.tv/gql") !== -1 && init !== undefined && init.method === "POST" && init.body !== undefined){
                    var body = JSON.parse(init.body);
                    var found = -1;
                    for(var i=0; i<body.length; i++){
                        if(body[i].operationName !== undefined && body[i].operationName == "VideoAccessToken_Clip"){
                            found = i;
                            break;
                        }
                    }

                    if(found !== -1){
                        try {
                            NOMO_DEBUG("gql", input, init);
                            var fetch_temp = await realFetch.apply(this, arguments);
                            var fetch_text = await fetch_temp.text();
                            var fetch_JSON = JSON.parse(fetch_text);
                            
                            NOMO_DEBUG("CONVERTED gql_text", found, fetch_JSON);

                            if(fetch_JSON !== undefined && fetch_JSON[found] !== undefined && fetch_JSON[found].data !== undefined 
                                && fetch_JSON[found].data.clip !== undefined && fetch_JSON[found].data.clip.videoQualities !== undefined){
                                    NOMO_DEBUG("fetch_temp", fetch_temp);
                                fetch_JSON[found].data.clip.videoQualities = fetch_JSON[found].data.clip.videoQualities.slice(0, 1);
                                // for(var j=0; j<fetch_JSON[found].data.clip.videoQualities.length; j++){
                                //     if(j == 0) continue;
                                //     fetch_JSON[found].data.clip.videoQualities[j].sourceURL = fetch_JSON[found].data.clip.videoQualities[0].sourceURL;
                                // }

                                fetch_text = JSON.stringify(fetch_JSON);

                                var temp_blob = new Blob([fetch_text], {
                                    type: 'application/json'
                                });
                                var temp_blob_url = URL.createObjectURL(temp_blob);
                                var new_arg = [];//arguments
                                new_arg[0] = temp_blob_url;

                                // REVOKE after 10s
                                setTimeout(function(){URL.revokeObjectURL(temp_blob_url);},10000);
                                NOMO_DEBUG("HERE", fetch_JSON);
                                return realFetch.apply(this, new_arg);
                            }
                        }
                        catch(e){
                            NOMO_DEBUG("error from only_source_quality_clip", e);
                            return realFetch.apply(this, arguments);
                        }
                    }
                }
                
                return realFetch.apply(this, arguments);
            };
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    function updateLocalStorage(){
        try{
            if (!GM_SETTINGS.max_quality_localstorage || GM_SETTINGS.only_source_quality) {
                return;
            }
            var q1st = GM_SETTINGS.max_quality_localstorage_prefer_1st.toLowerCase().trim();
            if(q1st == "best" || q1st == "chunked" || q1st == "max" || q1st == "highest" || q1st == "high"){
                q1st = "chunked";
            }

            NOMO_DEBUG("updateLocalStorage : ", q1st);
            
            localStorage.setItem('video-quality', `{"default":"${q1st}"}`);
            localStorage.setItem('s-qs-ts', "" + Number(new Date()));
        }
        catch(e){
            NOMO_DEBUG("updateLocalStorage error", e);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // disable_visibilitychange 화면 이동 시 화질 저하 무력화
    if (GM_SETTINGS.disable_visibilitychange) {
        NOMO_DEBUG("GM_SETTINGS.disable_visibilitychange: true");
        // 1. document object 덮어쓰기
        try{
            Object.defineProperty(document, 'hidden', {
                value: false,
                writable: false
            });
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - hidden redefine", e);
        }

        try{
            Object.defineProperty(document, 'visibilityState', {
                value: 'visible',
                writable: false
            });
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - visibilityState redefine", e);
        }

        try{
            Object.defineProperty(document, 'webkitVisibilityState', {
                value: 'visible',
                writable: false
            });
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - webkitVisibilityState redefine", e);
        }

        try{
            document.dispatchEvent(new Event('visibilitychange'));
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - visibilitychange dispatchEvent", e);
        }

        try{
            document.hasFocus = function () {
                return true;
            };
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - hasFocus return true", e);
        }

        // 2. overwrite window addEventListener
        try{
            unsafeWindow["_addEventListener_" + date_n] = unsafeWindow.addEventListener;
            unsafeWindow.addEventListener = function (a, b, c) {
                if (a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange") {
                    // NOMO_DEBUG("player.twitch.tv window 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if (c == undefined){
                    c = false;
                }
                unsafeWindow["_addEventListener_" + date_n](a, b, c);
            };
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - overwrite window addEventListener", e);
        }

        // 3. overwrite document addEventListener
        try{
            unsafeWindow.document["_addEventListener_" + date_n] = unsafeWindow.document.addEventListener;
            unsafeWindow.document.addEventListener = function (a, b, c) {
                if (a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange") {
                    // NOMO_DEBUG("player.twitch.tv document 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if (c == undefined){
                    c = false;
                }
                unsafeWindow.document["_addEventListener_" + date_n](a, b, c);
            };
        }
        catch(e){
            NOMO_DEBUG("disable_visibilitychange error - overwrite document addEventListener", e);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // 	Start live stream with user-preferred quality
    try {
        var setting_elem_selector = "button[data-a-target='player-settings-button']";
        var quality_elem_selector = "button[data-a-target='player-settings-menu-item-quality']";
        var max_quality_elem_selector = "input[data-a-target='tw-radio']";
        var menu_elem_selector = "div[data-a-target='player-settings-menu']";
        var play_pause_selector = "button[data-a-target='player-play-pause-button']";

        // max_quality_start
        if (GM_SETTINGS.max_quality_start) {
            var use_qob = true;
            var SETTIMEOUT_PL_MENU = undefined;
            var prev_qu_time = Number(new Date());

            // 5초 동안 대기 후 실패 시 unbind
            var video_quality_unbind = function () {
                setTimeout(function () {
                    $(document).unbindArrive(setting_elem_selector);
                    $(document).unbindArrive(quality_elem_selector);
                    $(document).unbindArrive(max_quality_elem_selector);
                }, 1);
            };
            var PL_MENU_SHOW_DELAY = function () {
                clearTimeout(SETTIMEOUT_PL_MENU);
                SETTIMEOUT_PL_MENU = setTimeout(function () {
                    $("body").removeClass("pl-menu-hide");
                    video_quality_unbind();
                    NOMO_DEBUG("5초 경과하여 자동 해제됨");
                }, 5000);
            };

            updateLocalStorage();

            // Video Player 가 감지되거나, src 값이 바뀌면 화질 설정
            var mutationTarget = document;
            var mutationOption = {
                attributes: true,
                attributeFilter: ['src'],
                attributeOldValue: true,
                characterData: false,
                characterDataOldValue: false,
                childList: false,
                subtree: true
            };
            var videoMutation = new MutationObserver(function (mutations) {
                mutations.some(function (mutation) {
                    NOMO_DEBUG('Old src: ', mutation.oldValue, 'New src: ', mutation.target.src, mutation);
                    var isClip = mutation.target.src.indexOf("clip") !== -1;

                    if (mutation.target.nodeName.toLowerCase() !== "video" ||
                        mutation.type !== 'attributes' ||
                        mutation.attributeName !== 'src' ||
                        mutation.target.src === undefined ||
                        mutation.target.src === null ||
                        mutation.target.src === ""
                        //|| mutation.target.src.indexOf("clip") !== -1
                        //|| (GM_SETTINGS.max_quality_target_blob && mutation.target.src.indexOf("blob") === -1)
                    ){
                        return false;
                    }

                    // DEBUG: 이전 mutation 시간과의 시간 비교
                    var curr_qu_time = Number(new Date());
                    var mutation_duration = curr_qu_time - prev_qu_time;
                    prev_qu_time = curr_qu_time;
                    NOMO_DEBUG("mutation delay: ", mutation_duration/1000, " s");

                    // set_volume_when_stream_starts
                    try {
                        if(GM_SETTINGS.set_volume_when_stream_starts && !is_volume_changed){
                            NOMO_DEBUG("set_volume");
                            if(mutation.target.volume !== undefined){
                                NOMO_DEBUG("MUTE?", mutation.target.muted, "CURRENT VOLUME", mutation.target.volume, "TARGET VOLUME", GM_SETTINGS.target_start_volume);
                                setTimeout(function(){
                                    if(GM_SETTINGS.target_start_volume !== 0.0){
                                        mutation.target.muted = false;
                                    }
                                    mutation.target.volume = GM_SETTINGS.target_start_volume;
                                    is_volume_changed = true;
                                },100);
                            }
                        }
                    } catch (e) {
                        NOMO_DEBUG("ERROR FROM set_volume_when_stream_starts", e);
                    }

                    // video_quality_max
                    try {
                        // max_quality_localstorage
                        updateLocalStorage();
                        // max_quality_menu_trigger
                        if (!GM_SETTINGS.only_source_quality && GM_SETTINGS.max_quality_menu_trigger) {
                            if(isClip && !GM_SETTINGS.max_quality_menu_trigger_clip){
                                return true;
                            }

                            // 스쿼드 스트리밍일 경우 현재 지원하지 않음
                            if(/https?:\/\/(?:www\.)?twitch\.tv\/[a-zA-Z0-9-_]+\/squad$/.test(document.location.href)){
                                NOMO_DEBUG("squad streaming is not supported");
                                return true;
                            }

                            setTimeout(function(){
                                video_quality_unbind();
                                clearTimeout(SETTIMEOUT_PL_MENU);

                                $("body").addClass("pl-menu-hide");
                                PL_MENU_SHOW_DELAY();

                                // 이미 메뉴 존재 시
                                if ($(menu_elem_selector).length !== 0) {
                                    NOMO_DEBUG("이미 메뉴 존재");
                                    $(setting_elem_selector).click();
                                }

                                // 설정 버튼 클릭
                                $(document).arrive(setting_elem_selector, { onlyOnce: true, existing: true }, function () {
                                    NOMO_DEBUG("ARRIVE FIRED 1");
                                    
                                    use_qob = true;

                                    video_quality_unbind();
                                    $(this).click();
                                    PL_MENU_SHOW_DELAY();

                                    // 화질 버튼 클릭
                                    $(document).arrive(quality_elem_selector, { onlyOnce: true, existing: true }, function () {
                                        NOMO_DEBUG("ARRIVE FIRED 2");

                                        video_quality_unbind();
                                        $(this).click();
                                        PL_MENU_SHOW_DELAY();

                                        // source 버튼 클릭
                                        $(document).arrive(max_quality_elem_selector, { onlyOnce: true, existing: true }, function () {
                                            NOMO_DEBUG("ARRIVE FIRED 3");

                                            video_quality_unbind();
                                            var $qb = $(max_quality_elem_selector);
                                            var qualityTextOri = [];
                                            var qualityText = [];
                                            var targetIndex = 1;
                                            var targetIndex1st = -1;
                                            var targetIndex2nd = -1;

                                            if (use_qob && $qb.length >= 2) {
                                                use_qob = false;

                                                var q1st = GM_SETTINGS.max_quality_menu_trigger_prefer_1st.toLowerCase();
                                                var q2nd = GM_SETTINGS.max_quality_menu_trigger_prefer_2nd.toLowerCase();
                                                NOMO_DEBUG(`TARGET Q 1st:${q1st}, 2nd:${q2nd}`);

                                                if(q1st == "best" || q1st == "chunked" || q1st == "max" || q1st == "highest" || q1st == "high"){
                                                    if(isClip){
                                                        targetIndex = 0;
                                                    }
                                                    else{
                                                        targetIndex = 1;
                                                    }
                                                }
                                                else if(q1st == "worst" || q1st == "lowest" || q1st == "low" || q1st == "min"){
                                                    targetIndex = $qb.length - 1;
                                                }
                                                else{
                                                    for(var i=0;i<$qb.length;i++){
                                                        qualityTextOri.push($($qb[i]).closest("div").text());

                                                        qualityText.push((qualityTextOri[i]).replace(/\s(.+)/,"").trim());
                                                        // NOMO_DEBUG(`Q${i+1} "${qualityText[i]}"`);

                                                        if(i !== 0 && !(/p\d{2}/gi.test(qualityText[i]))){
                                                            qualityText[i] = qualityText[i]+"30";
                                                        }
    
                                                        if(targetIndex1st === -1 && qualityText[i].indexOf(q1st) !== -1){
                                                            targetIndex1st = i;
                                                        }
                                                        if(targetIndex2nd === -1 && qualityText[i].indexOf(q2nd) !== -1){
                                                            targetIndex2nd = i;
                                                        }
                                                    }

                                                    if(targetIndex1st !== -1){
                                                        targetIndex = targetIndex1st;
                                                    }
                                                    else if(targetIndex2nd !== -1){
                                                        targetIndex = targetIndex2nd;
                                                    }
                                                    else{
                                                        targetIndex = 1;
                                                    }

                                                    NOMO_DEBUG(`TARGET INDEX: ${targetIndex}:${qualityTextOri[targetIndex]}(${qualityText[targetIndex]})`);
                                                }
                                                NOMO_DEBUG("FINAL TARGET INDEX:", targetIndex);

                                                $(max_quality_elem_selector)[targetIndex].click();
                                                if($(menu_elem_selector).length > 0){
                                                    $(setting_elem_selector).click();
                                                }
                                                clearTimeout(SETTIMEOUT_PL_MENU);
                                                $("body").removeClass("pl-menu-hide");
                                                video_quality_unbind();
                                            }

                                            // 강제 화질 변경 감지
                                            setTimeout(function(){
                                                var $icon_spin = $(".pl-settings-icon--spin");
                                                if($icon_spin.length == 0){
                                                    return;
                                                }
                                                NOMO_DEBUG("강제 화질 변경 감지");
                                                var $pause_play_button = $(play_pause_selector);
                                                if($pause_play_button.length !== 0){
                                                    $(play_pause_selector).click();
                                                    setTimeout(function(){
                                                        $(play_pause_selector).click();
                                                    },50);
                                                }
                                            },1000);
                                        });

                                    });
                                });
                            },GM_SETTINGS.max_quality_menu_trigger_delay);
                        }
                    } catch (e) {
                        NOMO_DEBUG("ERROR FROM video_quality_max", e);
                    }
                    return true;
                });
            });
            
            videoMutation.observe(mutationTarget, mutationOption);
        }
    } catch (e) {
        NOMO_DEBUG("max_quality_start error", e);
    }

    // 설정 메뉴 추가 및 관리
    function openSettingsMenu(){
        try{
            if(document === undefined){
                NOMO_DEBUG("Document is undefined from openSettingsMenu");
                return;
            }
            NOMO_DEBUG("msg from openSettingsMenu");
            var GM_Setting_Bootstrap = 'GM_Setting_Bootstrap';
            $("#nomo_settings_container").remove();

            var $container = $( /*html*/ `
            <div id="nomo_settings_container" style="display:none;cursor:pointer;position:absolute;top:0;left:0;width:100%;height:100%;z-index:200000;background:rgba(0,0,0,0.9);">
                <div id="nomo_settings" style="cursor:default;font-size:12px;max-width:800px;max-height:calc(100% - 40px);margin:20px auto;background:#fff;padding:10px 20px;border-radius:5px;"></div>
            </div>`).appendTo("body");
            $container.on("click", function () {
                $(this).fadeOut(500, function () {
                    $(this).remove();
                    $("#GM_Setting_Bootstrap").remove();
                });
            });
            $container.find("#nomo_settings").on("click", function (e) {
                e.stopPropagation();
            });

            if (!document.getElementById(GM_Setting_Bootstrap)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = GM_Setting_Bootstrap;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css';
                link.media = 'all';
                head.appendChild(link);
            }

            $("#nomo_settings_container").fadeIn(500);
            GM_setting.createlayout($("#nomo_settings"));
        }
        catch(e){
            NOMO_DEBUG("Error from openSettingsMenu function", e);
        }
    }
    $(document).ready(function (){
        NOMO_DEBUG("DOCUMENT_READY");
        if (typeof GM_registerMenuCommand === "function") {
            var menustr = "Open Settings Menu";
            console.log(GM_SETTINGS);
            if(GM_SETTINGS !== undefined && GM_SETTINGS.Lang !== undefined){
                if(GM_SETTINGS.Lang === "ko"){
                    menustr = "설정 메뉴 열기";
                }
            }
            GM_registerMenuCommand(menustr, openSettingsMenu);
        }
    });

    
})();
