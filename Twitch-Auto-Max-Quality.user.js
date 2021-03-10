// ==UserScript==
// @name        Twitch-Auto-Max-Quality
// @namespace   Twitch-Auto-Max-Quality
// @version     0.0.6
// @author      Nomo
// @description Always start playing live video with source quality on twitch.tv
// @supportURL  https://github.com/nomomo/Twitch-Auto-Max-Quality/issues
// @homepage https://github.com/nomomo/Twitch-Auto-Max-Quality/
// @downloadURL https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js
// @include     *://*.twitch.tv/*
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
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
        if (DEBUG) {
            var args = arguments,
                args_length = args.length,
                args_copy = args;
            for (var i = args_length; i > 0; i--) {
                args[i] = args_copy[i - 1];
            }
            args[0] = "[TAMQ]  ";
            args.length = args_length + 1;
            console.log.apply(console, args);
        }
    };

    /* arrive.js
     * v2.4.1
     * https://github.com/uzairfarooq/arrive
     * MIT licensed
     * Copyright (c) 2014-2017 Uzair Farooq
     */
    // eslint-disable-next-line no-cond-assign
    const Arrive = function(e,t,n){"use strict";function r(e,t,n){l.addMethod(t,n,e.unbindEvent),l.addMethod(t,n,e.unbindEventWithSelectorOrCallback),l.addMethod(t,n,e.unbindEventWithSelectorAndCallback);}function i(e){e.arrive=f.bindEvent,r(f,e,"unbindArrive"),e.leave=d.bindEvent,r(d,e,"unbindLeave");}if(e.MutationObserver&&"undefined"!=typeof HTMLElement){var o=0,l=function(){var t=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;return{matchesSelector:function(e,n){return e instanceof HTMLElement&&t.call(e,n);},addMethod:function(e,t,r){var i=e[t];e[t]=function(){return r.length==arguments.length?r.apply(this,arguments):"function"==typeof i?i.apply(this,arguments):n;};},callCallbacks:function(e,t){t&&t.options.onceOnly&&1==t.firedElems.length&&(e=[e[0]]);for(var n,r=0;n=e[r];r++)n&&n.callback&&n.callback.call(n.elem,n.elem);t&&t.options.onceOnly&&1==t.firedElems.length&&t.me.unbindEventWithSelectorAndCallback.call(t.target,t.selector,t.callback);},checkChildNodesRecursively:function(e,t,n,r){for(var i,o=0;i=e[o];o++)n(i,t,r)&&r.push({callback:t.callback,elem:i}),i.childNodes.length>0&&l.checkChildNodesRecursively(i.childNodes,t,n,r);},mergeArrays:function(e,t){var n,r={};for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n]);for(n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r;},toElementsArray:function(t){return n===t||"number"==typeof t.length&&t!==e||(t=[t]),t;}};}(),c=function(){var e=function(){this._eventsBucket=[],this._beforeAdding=null,this._beforeRemoving=null;};return e.prototype.addEvent=function(e,t,n,r){var i={target:e,selector:t,options:n,callback:r,firedElems:[]};return this._beforeAdding&&this._beforeAdding(i),this._eventsBucket.push(i),i;},e.prototype.removeEvent=function(e){for(var t,n=this._eventsBucket.length-1;t=this._eventsBucket[n];n--)if(e(t)){this._beforeRemoving&&this._beforeRemoving(t);var r=this._eventsBucket.splice(n,1);r&&r.length&&(r[0].callback=null);}},e.prototype.beforeAdding=function(e){this._beforeAdding=e;},e.prototype.beforeRemoving=function(e){this._beforeRemoving=e;},e;}(),a=function(t,r){var i=new c,o=this,a={fireOnAttributesModification:!1};return i.beforeAdding(function(n){var i,l=n.target;(l===e.document||l===e)&&(l=document.getElementsByTagName("html")[0]),i=new MutationObserver(function(e){r.call(this,e,n);});var c=t(n.options);i.observe(l,c),n.observer=i,n.me=o;}),i.beforeRemoving(function(e){e.observer.disconnect();}),this.bindEvent=function(e,t,n){t=l.mergeArrays(a,t);for(var r=l.toElementsArray(this),o=0;o<r.length;o++)i.addEvent(r[o],e,t,n);},this.unbindEvent=function(){var e=l.toElementsArray(this);i.removeEvent(function(t){for(var r=0;r<e.length;r++)if(this===n||t.target===e[r])return!0;return!1;});},this.unbindEventWithSelectorOrCallback=function(e){var t,r=l.toElementsArray(this),o=e;t="function"==typeof e?function(e){for(var t=0;t<r.length;t++)if((this===n||e.target===r[t])&&e.callback===o)return!0;return!1;}:function(t){for(var i=0;i<r.length;i++)if((this===n||t.target===r[i])&&t.selector===e)return!0;return!1;},i.removeEvent(t);},this.unbindEventWithSelectorAndCallback=function(e,t){var r=l.toElementsArray(this);i.removeEvent(function(i){for(var o=0;o<r.length;o++)if((this===n||i.target===r[o])&&i.selector===e&&i.callback===t)return!0;return!1;});},this;},s=function(){function e(e){var t={attributes:!1,childList:!0,subtree:!0};return e.fireOnAttributesModification&&(t.attributes=!0),t;}function t(e,t){e.forEach(function(e){var n=e.addedNodes,i=e.target,o=[];null!==n&&n.length>0?l.checkChildNodesRecursively(n,t,r,o):"attributes"===e.type&&r(i,t,o)&&o.push({callback:t.callback,elem:i}),l.callCallbacks(o,t);});}function r(e,t){return l.matchesSelector(e,t.selector)&&(e._id===n&&(e._id=o++),-1==t.firedElems.indexOf(e._id))?(t.firedElems.push(e._id),!0):!1;}var i={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};f=new a(e,t);var c=f.bindEvent;return f.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t);var o=l.toElementsArray(this);if(t.existing){for(var a=[],s=0;s<o.length;s++)for(var u=o[s].querySelectorAll(e),f=0;f<u.length;f++)a.push({callback:r,elem:u[f]});if(t.onceOnly&&a.length)return r.call(a[0].elem,a[0].elem);setTimeout(l.callCallbacks,1,a);}c.call(this,e,t,r);},f;},u=function(){function e(){var e={childList:!0,subtree:!0};return e;}function t(e,t){e.forEach(function(e){var n=e.removedNodes,i=[];null!==n&&n.length>0&&l.checkChildNodesRecursively(n,t,r,i),l.callCallbacks(i,t);});}function r(e,t){return l.matchesSelector(e,t.selector);}var i={};d=new a(e,t);var o=d.bindEvent;return d.bindEvent=function(e,t,r){n===r?(r=t,t=i):t=l.mergeArrays(i,t),o.call(this,e,t,r);},d;},f=new s,d=new u;t&&i(t.fn),i(HTMLElement.prototype),i(NodeList.prototype),i(HTMLCollection.prototype),i(HTMLDocument.prototype),i(Window.prototype);var h={};return r(f,h,"unbindAllArrive"),r(d,h,"unbindAllLeave"),h;}}(window,"undefined"==typeof jQuery?null:jQuery,void 0);
    

    /* GM_setting */
    var GM_setting = (function ($, global, document) { // 
        NOMO_DEBUG("GM_setting 시작");
        // local vars
        var $g_elem;
        var name_ = "";
        var changed_key = [];
        const settings_full = {
            disable_visibilitychange: {
                category: "general",
                category_name: "General",
                depth: 1,
                type: "checkbox",
                value: true,
                title: "Prevent automatic change of video quality when tab is disabled",
                desc: ""
            },
            max_quality_start: {
                category: "general",
                depth: 1,
                type: "checkbox",
                value: true,
                title: "Start live video with source quality",
                desc: ""
            },
            max_quality_localstorage: {
                category: "general",
                depth: 2,
                type: "checkbox",
                value: true,
                title: "Localstorage modify method",
                desc: "Modify local storage related to video quality."
            },
            max_quality_menu_trigger: {
                category: "general",
                depth: 2,
                type: "checkbox",
                value: true,
                title: "Simulate settings button method",
                desc: "Try to fix to maximum video quality by virtually clicking the quality setting button & menu. If the player's setting button does not work properly, turn this feature off."
            },
            max_quality_menu_trigger_delay : {
                category:"general",
                depth:3,
                type: "text",
                value: 1000,
                valid:"number",
                min_value:0,
                max_value:100000,
                title:"Delay until the first virtual click.", desc:"(Default: 1000, Range: 200~100000)" },
            max_quality_menu_trigger_legacy: {
                category: "general",
                depth: 3,
                type: "checkbox",
                value: false,
                title: "Use regacy mode",
                desc: "In May 2020, the structure of the Twitch player inserted as an iframe seems to have changed. So I modified the code to make the script work again. However, there may be users who still use the Twitch Player before it is changed (idk). If 'Simulate settings button method' does not work properly, try turning on this feature."
            },
            max_quality_iframe_twitch: {
                category: "general",
                depth: 2,
                type: "checkbox",
                value: false,
                title: "Use the Twitch EMBED API in an Iframe",
                desc: "Try to use the Twitch EMBED API for maximum quality inserted as an Iframe on player.twitch.tv. Use this method if the above two methods do not work properly in an iframe."
            },
            max_quality_target_blob: {
                category: "general",
                depth: 2,
                type: "checkbox",
                value: false,
                title: "Use for live video where url starts with blob",
                desc: "Turn this function on when the video quality is set to forcibly low in vod, clip, etc."
            },
            // max_quality_page_change: {
            //     category: "general",
            //     depth: 2,
            //     type: "checkbox",
            //     value: true,
            //     title: "화면 전환 시 매번 최대 화질로 고정 시도",
            //     desc: "페이지 이동, 앞뒤로가기 동작 시에도 최대 화질로 고정합니다. 본 기능을 비활성화 시 첫 접속시에만 최대 화질로 시작합니다."
            // },
            twitch_error_control: {
                category: "general",
                depth: 1,
                type: "checkbox",
                value: false,
                title: "Automatic restart on error (under dev.)",
                desc: "Ex) # 2000"
            }
        };
        var settings_init = {};
        var settings = {};
        var $inputs = {};

        /////////////////////////////////////////////////
        // private functions
        var init_ = async function () {
            //NOMO_DEBUG("init_");
            for (var key in settings_full) {
                settings_init[key] = settings_full[key].value;
            }

            await load_();
            if (!hasSameKey_(settings_init, settings)) {
                // 추가
                for (key in settings_init) {
                    if (settings[key] === undefined) {
                        settings[key] = settings_init[key];
                    }
                }
                // 삭제
                for (key in settings) {
                    if (settings_init[key] === undefined) {
                        delete settings[key];
                    }
                }
                await save_();
            }
        };
        var save_ = async function () {
            //NOMO_DEBUG("save_");
            if (name_ !== "") {
                await GM.setValue(name_, settings);
            }
            global[name_] = settings;

            // changed_key: 배열,       인덱스번호, 값(키)
            $.each(changed_key, function (eindex, evalue) {
                if (settings_full[evalue].change !== undefined) {
                    settings_full[evalue].change(settings[evalue]);
                }
            });
            changed_key = [];
        };
        var load_ = async function () {
            NOMO_DEBUG("load_");
            if (name_ !== "") {
                settings = await GM.getValue(name_, settings);
            }
            global[name_] = settings;
        };
        var event_ = async function () {
            if (typeof GM.addValueChangeListener === "function") {
                NOMO_DEBUG("설정에 대한 addValueChangeListener 바인드");
                GM.addValueChangeListener(name_, async function (val_name, old_value, new_value, remote) {
                    if (remote) {
                        NOMO_DEBUG("다른 창에서 설정 변경됨. val_name, old_value, new_value:", val_name, old_value, new_value);
                        await load_();
                        // old_value: obj,       ekey:키, evalue:값(old 설정값)
                        $.each(old_value, function (ekey, _evalue) {
                            if (settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                                settings_full[ekey].change(settings[ekey]);
                            }
                        });
                        changed_key = [];
                        // 설정 변경 시 바뀌는 이벤트들
                    }
                });
            }

            $(document).on("input", "input[gm_setting_key='under_dev']", function () {
                NOMO_DEBUG("실험실 기능 온오프 이벤트");
                var $this = $(this);
                if ($this.is(":checked")) {
                    $(".GM_setting_under_dev").css("opacity", 0).slideDown("fast").animate({
                        opacity: 1
                    }, {
                        queue: false,
                        duration: "fast"
                    });
                } else {
                    $(".GM_setting_under_dev").css("opacity", 1).slideUp("fast").animate({
                        opacity: 0.0
                    }, {
                        queue: false,
                        duration: "fast"
                    });
                }
            });
        };
        var addStyle_ = function () {
            GM.addStyle( /*css*/ `
    #GM_setting .btn {font-size:12px;}
    .GM_setting_autosaved.btn {
        max-width:100%;
        font-size:12px;
        white-space:pre-wrap;
        user-select:text;
    }
    #GM_setting .btn-xxs {
        cursor: pointer;
        padding: 4px 4px;
    }
    #GM_setting label.btn-xxs {
        box-sizing: content-box;
        width:11px;
        height:11px;
    }
    #GM_setting a{
        color: #428bca;
        text-decoration: none;
    }
    #GM_setting a:hover, #GM_setting a:focus {
        color: #2a6496;
        text-decoration: underline;
    }
    #GM_setting {clear:both;margin-left:auto; margin-right:auto; padding:0;font-size:13px;max-width:1400px; min-width:750px; box-sizing:content-box;}
    #GM_setting_head{margin-left:auto; margin-right:auto; padding:20px 0px 10px 10px;font-size:18px;font-weight:800;max-width:1400px; min-width:750px; box-sizing:content-box;}
    #GM_setting li {list-style:none;margin:0px;padding:8px;border-top:1px solid #eee;}

    #GM_setting .GM_setting_depth1.GM_setting_category {border-top: 2px solid #999;margin-top:20px;padding-top:10px;}
    #GM_setting li[GM_setting_key='version_check'] {margin-top:0px !important}

    #GM_setting .GM_setting_category_name{display:table-cell;width:110px;padding:0 0 0 0px;font-weight:700;vertical-align:top;}
    #GM_setting .GM_setting_category_blank{display:table-cell;width:110px;padding:0 0 0 0px;vertical-align:top;}

    #GM_setting .GM_setting_list_head{display:table-cell;box-sizing:content-box;vertical-align:top;}
    #GM_setting .GM_setting_depth1 .GM_setting_list_head {padding-left:0px;width:300px;}
    #GM_setting .GM_setting_depth2 .GM_setting_list_head {padding-left:30px;width:270px;}
    #GM_setting .GM_setting_depth3 .GM_setting_list_head {padding-left:60px;width:240px;}
    #GM_setting .GM_setting_depth4 .GM_setting_list_head {padding-left:90px;width:210px;}
    #GM_setting .GM_setting_depth5 .GM_setting_list_head {padding-left:120px;width:180px;}

    #GM_setting .GM_setting_title{display:block;font-weight:700;}
    #GM_setting .GM_setting_desc{display:block;font-size:11px;}

    #GM_setting .GM_setting_input_container {display:table-cell;padding:0 0 0 30px;vertical-align:top;}
    #GM_setting .GM_setting_input_container span{vertical-align:top;}
    #GM_setting .GM_setting_input_container span.btn{margin:0 0 0 10px;}
    #GM_setting input{display:inline}
    #GM_setting input[type="text"]{
    width: 100px;
    height: 30px;
    padding: 5px 5px;
    font-size:12px;
    }
    #GM_setting textarea{
    width: 250px;
    height: 30px;
    padding: 5px 5px;
    font-size:12px;
    }
    #GM_setting input[type="checkbox"] {
    display:none;
    width: 20px;height:20px;
    padding: 0; margin:0;
    }
    #GM_setting input[type="radio"] {
    width: 20px;height:20px;
    padding: 0; margin:0;
    }

    #GM_setting .radio-inline{
    padding-left:0;
    padding-right:10px;
    }
    #GM_setting .radio-inline input{
    margin:0 5px 0 0;
    }

    #GM_setting .GM_setting_item_disable, #GM_setting .GM_setting_item_disable .GM_setting_title, #GM_setting .GM_setting_item_disable .GM_setting_desc{color:#ccc !important}
    #GM_setting .invalid input, #GM_setting .invalid textarea{border-color:#dc3545;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;color:#dc3545;}
    #GM_setting .invalid input:focus, #GM_setting .invalid textarea:focus{border-color:#dc3545;box-shadow:0 0 0 0.2rem rgba(220,53,69,.25);outline:0;color:#dc3545;}
    #GM_setting .invalid {color:#dc3545}
    #GM_setting .invalid_text {font-size:12px;padding:5px 0 0 5px;}

    #GM_setting .GM_setting_under_dev .GM_setting_title{color:#6441a5;font-style:italic}

    #GM_setting .btn-xxs {cursor:pointer;padding:4px 4px;} /*padding: 1px 2px;font-size: 9px;line-height: 1.0;border-radius: 3px;margin:0 2px 2px 0;*/
    #GM_setting .btn-xxs .glyphicon{}
    #GM_setting .btn-xxs span.glyphicon {font-size:11px; opacity: 0.1;}
    #GM_setting .btn-xxs.active span.glyphicon {opacity: 0.9;}
    #GM_setting .btn-xxs.disable {opacity: 0.3;cursor:not-allowed;}
    `);
        };
        var createlayout_ = function (elem) {
            //NOMO_DEBUG("createlayout_");
            $inputs = {};

            var $elem = $(elem);
            $g_elem = $elem;
            if ($elem.find("#GM_setting_container").length !== 0) {
                $elem.empty();
            }
            var $container = $("<div id='GM_setting_container'></div>");
            var $setting_head = $( /*html*/ `
    <div id='GM_setting_head'>
    <div style='height:25px;display:inline-block;white-space:nowrap'>Settings</div>
    <div style='display:flex;height:25px;float:right;'>
        <a href='${(GM.info.script.homepage)}' target='_blank' style='font-size:12px;font-weight:normal;align-self:flex-end;'>${(GM.info.script.name)} v${(GM.info.script.version)} (${(GM.info.script.homepage)})</a>
    </div>
    </div>`);
            var $ul = $("<ul id='GM_setting'></ul>");
            var $prev = undefined;
            $elem.append($container);
            $container.append($setting_head).append($ul);
            for (var key in settings_full) {
                var category = settings_full[key].category;
                var depth = settings_full[key].depth;
                var type = settings_full[key].type;
                var title = settings_full[key].title;
                var desc = settings_full[key].desc;
                var category_name = settings_full[key].category_name;

                var $inputContainer = $("<div class='GM_setting_input_container form-group'></div>");
                var isTextarea = (type === "tag" || type === "textarea");
                var $input;

                if (type === "radio") {
                    var radioObj = settings_full[key].radio;
                    $input = $("<div GM_setting_type='radio'></div>");
                    for (var radiokey in radioObj) {
                        var $label = $("<label class='radio-inline'>" + radioObj[radiokey].title + "</label>");
                        var $temp_input = $("<input name='GM_setting_" + key + "' class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' onfocus='this.blur()' />").attr({
                            "value": radioObj[radiokey].value,
                            "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                            "GM_setting_type": type,
                            "GM_setting_key": key,
                            "GM_setting_category": (category === undefined ? "default" : category),
                        });
                        $temp_input.prependTo($label);
                        $input.append($label);
                    }
                } else {
                    $input = $("<" + (isTextarea ? "textarea " : "input ") + "class='form-control' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' " + (type === "checkbox" ? "onfocus='this.blur()'" : "") + (isTextarea ? "></textarea>" : " />")).attr({
                        "type": (type === "set" ? type === "text" : (type === "tag" ? "textarea" : type)),
                        "GM_setting_type": type,
                        "GM_setting_key": key,
                        "GM_setting_category": (category === undefined ? "default" : category),
                    });
                }

                var $category;
                if (category_name !== undefined) {
                    $category = $("<div class='GM_setting_category_name'>" + category_name + "</div>");
                } else {
                    $category = $("<div class='GM_setting_category_blank'></div>");
                }

                var $head = $("<div class='GM_setting_list_head'></div>");
                var $title = $("<span class='GM_setting_title'>" + title + "</span>");
                var $desc = $("<span class='GM_setting_desc'>" + desc + "</span>");
                var $li = $("<li GM_setting_key='" + key + "' GM_setting_depth='" + depth + "' class='" + (settings_full[key].under_dev ? "GM_setting_under_dev " : "") + (category_name !== undefined && $prev !== undefined && category !== $prev.category ? "GM_setting_category " : "") + "GM_setting_depth" + depth + "'></li>");
                $ul.append($li);
                $head.append($title).append($desc);

                if (type === "checkbox") {
                    var $label_container = $(`
                    <label class="btn btn-default btn-xxs"><span class="glyphicon glyphicon-ok"></span></label>
                    `);
                    $label_container.prepend($input).appendTo($inputContainer);

                    $input.on("change", function () {
                        if ($(this).is(":checked")) {
                            $(this).closest("label").addClass("active");
                        } else {
                            $(this).closest("label").removeClass("active");
                        }

                        if ($(this).is(":disabled")) {
                            $(this).closest("label").addClass("disable").prop("disabled", true);
                        } else {
                            $(this).closest("label").removeClass("disable").prop("disabled", false);
                        }
                    });
                } else {
                    $inputContainer.append($input);
                }

                $li.append($category).append($head).append($inputContainer);
                $inputs[key] = $input;

                if (settings_full[key].append !== undefined) {
                    $inputContainer.append(settings_full[key].append);
                }

                // 디버그 설정 숨기기
                // if( (!nomo_global.DEBUG && settings_full[key].disable) || (settings_full[key].under_dev) ){    // if( (!nomo_global.DEBUG && settings_full[key].disable) || (!ADD_config.under_dev && settings_full[key].under_dev) ){
                //     NOMO_DEBUG("숨김", key);
                //     $li.css("display","none");
                // }

                $prev = settings_full[key];
            }

            // 설정 on-off 이벤트
            $elem.find("input[type='checkbox']").on("click", function () {
                usageCheck_($elem);
            });

            // 자동 저장 이벤트
            var timeoutId;
            $elem.find("input, textarea").on("input", function () { // "input[type='text']"  input propertychange
                NOMO_DEBUG("GM_setting - text change");

                var $this = $(this);
                var val = getInputValue_($this);
                var this_key = $this.attr("GM_setting_key");
                var validation = validation_(this_key, val);
                $this.closest("div").find(".invalid_text").remove();
                if (validation.valid) {
                    $this.closest("div").removeClass("invalid");
                } else {
                    NOMO_DEBUG("validation", validation);
                    $this.closest("div").addClass("invalid");
                    $this.after("<div class='invalid_text'>" + validation.message + "</div>");
                }

                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    // 저장 시도
                    // 정상적으로 값이 체크 된 경우
                    var g_validation = true;
                    $.each($inputs, function (ekey, evalue) {
                        var temp = validation_(ekey, getInputValue_(evalue));
                        if (!temp.valid) {
                            g_validation = false;
                            return false;
                        }
                    });
                    if (g_validation) {
                        read_();
                        save_();
                        message_("Auto Saved! " + (new Date()).toLocaleTimeString(), $elem);
                    }
                }, 1000);
            });

            write_();
            usageCheck_($elem);

            // 리셋 버튼 추가
            $ul.append( /*html*/ `<li class="GM_setting_category GM_setting_depth1">
                <div class="GM_setting_category_name">Reset</div>
                <div class="GM_setting_list_head">
                    <span class="GM_setting_title">
                        <span class="GM_setting_reset btn btn-primary" style="margin-left:0;">Reset Settings</span>
                        <!--<span class="GM_setting_reset_all btn btn-primary">전체 초기화(새로고침 필요)</span>-->
                    </span>
                    <span class="GM_setting_desc"></span>
                </div>
                <div class="GM_setting_input_container form-group">
                </div>
            </li>`);
            $ul.find(".GM_setting_reset").on("click", async function () {
                var conf = confirm("Do you really want to reset the settings?");
                if (conf) {
                    await GM_setting.reset();
                    GM_setting.createlayout($g_elem);
                    message_("Reset settings complete! " + (new Date()).toLocaleTimeString(), $g_elem);
                }
            });
            $ul.find(".GM_setting_reset_all").on("click", async function () {
                var conf = confirm("Do you really want to reset the script?");
                if (conf) {
                    var listValues = await GM.listValues();
                    for (var key = 0; key < listValues.length; key++) {
                        var key_str = listValues[key];
                        await GM.deleteValue(key_str);
                    }
                    await GM_setting.reset();
                    GM_setting.createlayout($g_elem);
                    message_("Reset script complete! " + (new Date()).toLocaleTimeString(), $g_elem);
                }
            });
        };
        var message_ = function (msg, $elem) {
            if ($elem === undefined) {
                return;
            }
            var prefix = "GM_setting_autosaved";
            $elem.find("." + prefix).animate({
                bottom: "+=40px"
            }, {
                duration: 300,
                queue: false
            }); // cleqrQueue().dequeue().finish().stop("true","true")
            // @keyframes glow {to {text-shadow: 0 0 10px white;box-shadow: 0 0 10px #5cb85c;}}
            $("<div style='animation: glow .5s 10 alternate; position:fixed; left:10px; bottom:20px; z-index:10000000;' class='" + prefix + " btn btn-success'>" + msg + "</div>")
                .appendTo($elem)
                .fadeIn("fast")
                .animate({
                    opacity: 1
                }, 6000, function () {
                    $(this).fadeOut("fast").delay(600).remove();
                })
                .animate({
                    left: "+=30px"
                }, {
                    duration: 300,
                    queue: false
                });
        };
        var read_ = async function () {
            NOMO_DEBUG("read_");
            for (var key in $inputs) {
                var $input = $inputs[key];
                var val = getInputValue_($input);

                if (settings_full[key].type === "tag") {
                    val = val.split(","); // val = val.replace(/\s/g,"").split(",");
                    if (val.length === 1 && val[0] === "") {
                        val = [];
                    }
                    $.each(val, function (index, value) {
                        val[index] = value.replace(/^\s*|\s*$/g, "");
                    });
                }

                // 이전 설정과 변경된 값 키 체크
                if (settings[key] !== val && changed_key.indexOf(key) === -1) {
                    changed_key.push(key);
                }
                settings[key] = val;
            }
        };
        var write_ = async function () {
            NOMO_DEBUG("write_");
            for (var key in $inputs) {
                var $input = $inputs[key];
                writeInputValue_($input, settings[key]);
            }
        };
        var getInputValue_ = function ($input) {
            var val;
            switch ($input.attr("GM_setting_type")) {
                case "checkbox":
                    val = $input.prop("checked");
                    break;
                case "set": // 현재 text 와 동일
                    val = $input.val();
                    break;
                case "text":
                    val = $input.val();
                    break;
                case "tag": // 현재 textarea 와 동일
                    val = $input.val();
                    break;
                case "textarea":
                    val = $input.val();
                    break;
                case "radio":
                    val = $input.find("input:checked").val();
                    break;
                default:
                    //NOMO_DEBUG($input);
                    val = undefined;
                    break;
            }
            return val;
        };
        var writeInputValue_ = function ($input, val) {
            switch ($input.attr("GM_setting_type")) {
                case "checkbox":
                    $input.prop("checked", val).trigger("change");
                    break;
                case "set": // 현재 text 와 동일
                    $input.val(val);
                    break;
                case "text":
                    $input.val(val);
                    break;
                case "tag": // 현재 textarea 와 동일
                    $input.val(val);
                    $input.height("auto");
                    $input.height($input.prop("scrollHeight") + "px");
                    break;
                case "textarea":
                    $input.val(val);
                    $input.height("auto");
                    $input.height($input.prop("scrollHeight") + "px");
                    break;
                case "radio":
                    $input.find("input[value=" + val + "]").prop("checked", true);
                    break;
                default:
                    break;
            }
        };
        var usageCheck_ = async function ($elem) {
            // 일단 다 켠다.
            var $lis = $elem.find("li");
            $lis.removeClass("GM_setting_item_disable");
            $lis.find("input, textarea").prop("disabled", false);
            $lis.find("input[type='checkbox']").trigger("change");

            var enable = [true];
            for (var i = 0; i < $lis.length; i++) {
                var $curr = $($lis[i]);
                var curr_depth = $curr.attr("GM_setting_depth");
                var curr_key = $curr.attr("GM_setting_key");

                if (i !== 0) {
                    var $prev = $($lis[i - 1]);
                    var prev_depth = $prev.attr("GM_setting_depth");
                    if (prev_depth < curr_depth) {
                        var $prev_checkbox = $prev.find("input[type='checkbox']");
                        // 이전 요소가 체크박스이고, 켜져있으면 현재 요소도 켠다.
                        if ($prev_checkbox.length !== 0 && $prev_checkbox.is(":checked")) {
                            enable[prev_depth] = true;
                        } else {
                            enable[prev_depth] = false;
                        }

                        // 이전 요소가 체크박스가 아니면 그냥 켠다.
                        // if($prev_checkbox.length !== 0){
                        //     enable[prev_depth] = true;
                        // }
                    }
                }

                for (var e = 0; e < curr_depth; e++) {
                    if (settings_full[curr_key].disable || !enable[e]) {
                        $curr.addClass("GM_setting_item_disable");
                        $curr.find("input, textarea").prop("disabled", true);
                        $curr.find("input[type='checkbox']").trigger("change");
                        break;
                    }
                }
            }
        };
        var validation_ = function (key, val) {
            var val_array;
            var duplicate;
            var sorted_array;
            var regex_array_string = /^[A-Za-z0-9 _,]*$/;
            //var regex_number = /^[0-9]*$/;
            var valid = true;
            var message = "";

            // 숫자의 경우
            if (settings_full[key].valid === "number") {
                valid = $.isNumeric(val);
                if (val === "") {
                    message += "반드시 값이 입력되어야 합니다.";
                } else if (!valid) {
                    message += "숫자만 입력 가능합니다.";
                } else {
                    if (settings_full[key].min_value !== undefined && settings_full[key].min_value > val) {
                        valid = false;
                        message += "입력 값은 " + settings_full[key].min_value + "이상의 숫자이어야 합니다.";
                    } else if (settings_full[key].max_value !== undefined && settings_full[key].max_value < val) {
                        valid = false;
                        message += "입력 값은 " + settings_full[key].max_value + "이하의 숫자이어야 합니다.";
                    }
                }
            }
            // array_string - ID 태그
            else if (val !== "" && settings_full[key].valid === "array_string") {
                val_array = $.map(val.split(","), $.trim);
                var match = val.match(regex_array_string);
                //NOMO_DEBUG(match);
                if (match === null || match.length === 0) {
                    valid = false;
                    message += "영문, 숫자, 콤마(,), 언더바(_) 만 입력 가능합니다.";
                } else if ($.inArray("", val_array) !== -1) {
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    NOMO_DEBUG(val_array, $.inArray("", val_array));
                } else if ((new Set(val_array)).size !== val_array.length) {
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var i = 0; i < val_array.length - 1; i++) {
                        if (sorted_array[i + 1] == sorted_array[i] && $.inArray(sorted_array[i], duplicate) === -1) {
                            duplicate.push(sorted_array[i]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                } else {
                    for (var j = 0; j < val_array.length; j++) {
                        //NOMO_DEBUG(val_array, val_array[j].indexOf(" "));
                        if (val_array[j].indexOf(" ") !== -1) {
                            valid = false;
                            message += "문자열 내 공백이 존재하는 항목이 있습니다: " + val_array[j];
                            break;
                        }
                    }
                }
            }
            // array_word - 금지단어
            else if (val !== "" && settings_full[key].valid === "array_word") {
                val_array = $.map(val.split(","), $.trim);
                if ($.inArray("", val_array) !== -1) {
                    valid = false;
                    message += "공백 값 등 값이 존재하지 않는 항목이 존재합니다.";
                    NOMO_DEBUG(val_array, $.inArray("", val_array));
                } else if ((new Set(val_array)).size !== val_array.length) {
                    valid = false;
                    duplicate = [];
                    sorted_array = val_array.sort();
                    for (var k = 0; k < val_array.length - 1; k++) {
                        if (sorted_array[k + 1] == sorted_array[k] && $.inArray(sorted_array[k], duplicate) === -1) {
                            duplicate.push(sorted_array[k]);
                        }
                    }
                    message += "중복된 값이 존재합니다: " + duplicate.join(",");
                }
            }

            var return_obj = {
                valid: valid,
                message: message
            };
            return return_obj;
        };
        var hasSameKey_ = function (a, b) {
            var aKeys = Object.keys(a).sort();
            var bKeys = Object.keys(b).sort();
            return JSON.stringify(aKeys) === JSON.stringify(bKeys);
        };

        /////////////////////////////////////////////////
        // public interface
        return {
            init: async function (name) {
                name_ = name;
                NOMO_DEBUG("GM_setting - init");
                await init_();
                await event_();
                addStyle_();
            },
            load: async function () {
                NOMO_DEBUG("GM_setting - load");
                await load_();
                //return settings;
            },
            save: async function () {
                NOMO_DEBUG("GM_setting - save");
                await save_();
            },
            save_overwrite: async function () {
                // old_value: obj,       ekey:키, evalue:값(old 설정값)
                var old_value = settings;
                var new_value = global[name_];
                $.each(old_value, function (ekey, _evalue) {
                    if (settings_full[ekey].change !== undefined && old_value[ekey] !== new_value[ekey]) {
                        settings_full[ekey].change(new_value[ekey]);
                    }
                });
                settings = global[name_];
                NOMO_DEBUG("GM_setting - save_overwrite");
                await save_();
            },
            reset: async function () {
                await GM.setValue(name_, settings_init);
                await load_();
            },
            createlayout: function (elem) {
                createlayout_(elem);
            },
            getType: function (key) {
                if (settings_full[key] !== undefined) {
                    return settings_full[key].type;
                } else {
                    return undefined;
                }
            },
            message: function (msg, $elem) {
                message_(msg, $elem);
            }
        };
    })(jQuery, window, document);

    ////////////////////////////////////////////////////////////////////////////////////
    // Initialize
    ////////////////////////////////////////////////////////////////////////////////////
    window.GM_setting = GM_setting;
    await GM_setting.init("GM_SETTINGS");

    var first_url = document.location.href.toLowerCase();
    var is_player = (first_url.indexOf("player.twitch.tv") !== -1 ? true : false);
    var date_n = Number(new Date());

    GM.addStyle(`
        #nomo_settings {
            color: #000;
            overflow-y: scroll;
        }
        #GM_setting_head {
            color: #000;
        }
        #GM_setting .btn{
            background-color: #6441a4;
            border-color: #6441a4;
            color: #fff;
        }
        #GM_setting .btn:hover{
            background-color: #7d5bbe;
            border-color: #7d5bbe;
            color: #fff;
        }
        #GM_setting .bth:active{        
            background-color: #6441a4;
            border-color: #7d5bbe;
            box-shadow: 0 0 6px 0 #7d5bbe;
            color: #fff;
        }
        #GM_setting .btn:focus{
            background-color: #7d5bbe;
            border-color: #9a7fcc;
            box-shadow: 0 0 6px 0 #7d5bbe;
            color: #fff;
        }
        #GM_setting .GM_setting_desc{
            font-size:13px;
        }
        #GM_setting .GM_setting_category_name, #GM_setting .GM_setting_title{
            font-size:14px;
        }

        body.pl-menu-hide div.pl-menu,
        body.pl-menu-hide .pl-settings-icon,
        body.pl-menu-hide button[data-a-target='player-settings-button'],
        body.pl-menu-hide div[data-a-target='player-settings-menu'],
        body.pl-menu-hide div.settings-menu-button-component{
            display:none;
            opacity:0;
        }

        #GM_setting .GM_setting_depth1 .GM_setting_list_head{
            width:500px;
        }
        #GM_setting .GM_setting_depth2 .GM_setting_list_head{
            width:470px;
        }
    `);

    // 화면 이동 시 화질 저하 무력화
    try {
        if (GM_SETTINGS.disable_visibilitychange) {
            // 1. document object 덮어쓰기
            Object.defineProperty(document, 'hidden', {
                value: false,
                writable: false
            });
            Object.defineProperty(document, 'visibilityState', {
                value: 'visible',
                writable: false
            });
            Object.defineProperty(document, 'webkitVisibilityState', {
                value: 'visible',
                writable: false
            });
            document.dispatchEvent(new Event('visibilitychange'));
            document.hasFocus = function () {
                return true;
            };

            // 2. window addEventListener 덮어쓰기
            unsafeWindow["_addEventListener_" + date_n] = unsafeWindow.addEventListener;
            unsafeWindow.addEventListener = function (a, b, c) {
                if (a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange") {
                    NOMO_DEBUG("player.twitch.tv window 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if (c == undefined)
                    c = false;
                this["_addEventListener_" + date_n](a, b, c);
            };

            // 3. document addEventListener 덮어쓰기
            unsafeWindow.document["_addEventListener_" + date_n] = unsafeWindow.document.addEventListener;
            unsafeWindow.document.addEventListener = function (a, b, c) {
                if (a === "visibilitychange" || a === "blur" || a === "webkitvisibilitychange") {
                    NOMO_DEBUG("player.twitch.tv document 의 visibilitychange 이벤트 무력화", a, b, c);
                    return;
                }

                if (c == undefined)
                    c = false;
                this["_addEventListener_" + date_n](a, b, c);
            };
        }
    } catch (e) {
        console.log("disable_visibilitychange error", e);
    }

    // 시작 시 항상 최고 화질로 시작
    try {
        var setting_elem_selector = "button[data-a-target='player-settings-button']";
        var quality_elem_selector = "button[data-a-target='player-settings-menu-item-quality']";
        var max_quality_elem_selector = "input[data-a-target='tw-radio']";//".tw-block.tw-radio__label";//"div[data-a-target='player-settings-submenu-quality-option']";
        var menu_elem_selector = "div[data-a-target='player-settings-menu']";
        if(GM_SETTINGS.max_quality_menu_trigger_legacy){
            setting_elem_selector = ".pl-settings-icon";
            quality_elem_selector = ".qa-quality-button";
            max_quality_elem_selector = ".pl-quality-option-button";
            menu_elem_selector = ".pl-menu";
        }

        if (GM_SETTINGS.max_quality_start) {
            var use_qob = true;
            var SETTIMEOUT_PL_MENU = undefined;
            // const MEUN_TRIGGER_DELAY = 500;
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

            if (GM_SETTINGS.max_quality_localstorage) {
                localStorage.setItem('video-quality', '{"default":"chunked"}');
                localStorage.setItem('s-qs-ts', "" + Number(new Date()));
            }

            // Video Player 가 감지되거나, src 값이 바뀌면 화질 설정
            new MutationObserver(function (mutations) {
                mutations.some(function (mutation) {
                    if (mutation.target.nodeName.toLowerCase() === "video" && mutation.type === 'attributes' && mutation.attributeName === 'src') {
                        // 이전 mutation 시간과의 시간 비교
                        var curr_qu_time = Number(new Date());
                        var mutation_duration = curr_qu_time - prev_qu_time;
                        prev_qu_time = curr_qu_time;
                        NOMO_DEBUG("mutation delay: ", mutation_duration/1000, " s");

                        NOMO_DEBUG('Old src: ', mutation.oldValue, 'New src: ', mutation.target.src, mutation);
                        if (mutation.target.src !== undefined &&
                            mutation.target.src !== null &&
                            mutation.target.src !== "" &&
                            mutation.target.src.indexOf("clips") === -1 &&
                            (!GM_SETTINGS.max_quality_target_blob || (GM_SETTINGS.max_quality_target_blob && mutation.target.src.indexOf("blob") !== -1))
                        ) {

                            try {
                                NOMO_DEBUG("video_quality_max");
                                // localstorage
                                if (GM_SETTINGS.max_quality_localstorage) {
                                    localStorage.setItem('video-quality', '{"default":"chunked"}');
                                    localStorage.setItem('s-qs-ts', "" + Number(new Date()));
                                }

                                // click event
                                if (GM_SETTINGS.max_quality_menu_trigger) {
                                    // 스쿼드 스트리밍일 경우 현재 지원하지 않음
                                    if(/https?:\/\/(?:www\.)?twitch\.tv\/[a-zA-Z0-9-_]+\/squad$/.test(document.location.href)){
                                        NOMO_DEBUG("스쿼드 스트리밍은 현재 지원하지 않음");
                                        return;
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
                                        $(document).arrive(setting_elem_selector, {
                                            onlyOnce: true,
                                            existing: true
                                        }, function () {
                                            NOMO_DEBUG("ARRIVE FIRED 1");
                                            video_quality_unbind();
                                            use_qob = true;
                                            $(this).click();

                                            PL_MENU_SHOW_DELAY();
                                            // 화질 버튼 클릭
                                            $(document).arrive(quality_elem_selector, {
                                                onlyOnce: true,
                                                existing: true
                                            }, function () {
                                                NOMO_DEBUG("ARRIVE FIRED 2");
                                                video_quality_unbind();
                                                $(this).click();

                                                PL_MENU_SHOW_DELAY();
                                                // source 버튼 클릭
                                                $(document).arrive(max_quality_elem_selector, {
                                                    onlyOnce: true,
                                                    existing: true
                                                }, function () {
                                                    NOMO_DEBUG("ARRIVE FIRED 3");
                                                    video_quality_unbind();
                                                    var $qb = $(max_quality_elem_selector);
                                                    if (use_qob && $qb.length >= 2) {
                                                        use_qob = false;
                                                        NOMO_DEBUG("qb", $qb);
                                                        $(max_quality_elem_selector)[1].click();
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
                                                        if($icon_spin.length !== 0){
                                                            NOMO_DEBUG("강제 화질 변경 감지");
                                                            var $pause_play_button = $(".qa-pause-play-button");
                                                            if($pause_play_button.length !== 0){
                                                                $(".qa-pause-play-button").click();
                                                                setTimeout(function(){
                                                                    $(".qa-pause-play-button").click();
                                                                },50);
                                                            }
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

                        }
                        return true;
                    }

                    return false;
                });
            }).observe(document.body, {
                attributes: true,
                attributeFilter: ['src'],
                attributeOldValue: true,
                characterData: false,
                characterDataOldValue: false,
                childList: false,
                subtree: true
            });

            // player.twitch.tv 의 경우 TWITCH API 사용하여 제어
            if (is_player && GM_SETTINGS.max_quality_iframe_twitch) {
                //$(document).ready(function () {
                $(document).arrive("div.player-video", {
                    onlyOnce: true,
                    existing: true
                }, function () {
                    NOMO_DEBUG("EMBEDED_PLAYER", unsafeWindow.player);

                    // 1초 간격으로 player 활성 상태 확인
                    var is_playing_counter = 0;
                    var is_playing = false;
                    var si = setInterval(function () {
                        if (unsafeWindow.player !== undefined) {
                            is_playing = unsafeWindow.player.isPlaying();
                        }
                        NOMO_DEBUG("현재 상태:", is_playing);
                        if (is_playing) {
                            clearInterval(si);

                            // 화질 설정
                            setTimeout(function () {
                                var highest_quality = unsafeWindow.player.getQualities()[1];
                                NOMO_DEBUG("highest_quality", unsafeWindow.player.getQualities());
                                unsafeWindow.player.setQuality(highest_quality.group);
                                NOMO_DEBUG("최고 화질 설정", highest_quality);
                            }, 2000);
                        } else {
                            is_playing_counter = is_playing_counter + 1;
                            NOMO_DEBUG("1초 후 재시도 합니다. 현재 시도 수:", is_playing_counter);

                            if (is_playing_counter > 10) {
                                NOMO_DEBUG("10회 시도에 실패하였습니다");
                                clearInterval(si);
                            }
                        }
                    }, 1000);
                });
                //});
            }
        }
    } catch (e) {
        console.log("max_quality_start error", e);
    }

    // #2000 등의 에러 처리
    try {
        if (GM_SETTINGS.twitch_error_control) {
            $(document).arrive(".pl-error", function (elem) {
                var $elem = $(elem);
                var errorText = $elem.text();
                NOMO_DEBUG("pl_error 생성됨", errorText);
                if (errorText.indexOf("#")) {
                    $elem.html(errorText + "<br />Refresh after 1s");
                    setTimeout(function () {
                        // player.twitch.tv 의 경우
                        if (is_player && unsafeWindow.player !== undefined) {
                            unsafeWindow.player.pause();
                            unsafeWindow.player.play();
                        }
                        // twitch.tv 의 경우
                        else {
                            var $play_button = $(".qa-pause-play-button");
                            if ($play_button.find("#icon_pause").length >= 1) {
                                // 현재 재생 중임
                                NOMO_DEBUG("현재 재생 중");
                                $play_button.click();
                                $play_button.click();
                            } else {
                                // 현재 정지 중임
                                NOMO_DEBUG("현재 정지 중");
                                $play_button.click();
                                $play_button.click();
                                $play_button.click();
                            }
                        }
                    }, 1000);
                    // $("button.player-button").trigger("click");
                }
            });
        }
    } catch (e) {
        console.log("twitch_error_control error", e);
    }

    // 설정 메뉴 추가 및 관리
    var GM_Setting_Bootstrap = 'GM_Setting_Bootstrap';
    if (typeof GM_registerMenuCommand === "function") {
        GM_registerMenuCommand("Open Settings Menu", function () {
            $("#nomo_settings_container").remove();

            var $container = $( /*html*/ `
            <div id="nomo_settings_container" style="display:none;cursor:pointer;position:absolute;top:0;left:0;width:100%;height:100%;z-index:200000;background:rgba(0,0,0,0.9);">
                <div id="nomo_settings" style="cursor:default;font-size:12px;max-width:800px;max-height:90%;margin:20px auto;background:#fff;padding:10px 20px;border-radius:5px;"></div>
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
        });
    }
})();
