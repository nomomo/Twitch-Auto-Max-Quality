// ==UserScript==
// @name        Twitch-Adblock-oct2020
// @namespace   Twitch-Adblock-oct2020
// @version     0.0.1
// @author      Nomo
// @description Twitch adblock on twitch.tv
// @supportURL  https://github.com/nomomo/Twitch-Auto-Max-Quality/issues
// @homepage https://github.com/nomomo/Twitch-Auto-Max-Quality/
// @downloadURL https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Adblock-oct2020.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Adblock-oct2020.user.js
// @include     *://*.twitch.tv/*
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @grant       unsafeWindow
// ==/UserScript==
/* eslint-disable no-undef */
"use strict";
(async () => {
    // reference: https://gist.github.com/brihawk/df6fa2036c1e8e19cbf45fc0d1ed14fa

    var realFetch = unsafeWindow.fetch;
    unsafeWindow.fetch = function(input, init) {
        if ( arguments.length >= 2 && typeof input === 'string' && input.includes('/access_token') ) {
            var url = new URL(arguments[0]);
            url.searchParams.set("player_type", "frontpage");
            arguments[0] = url.href;
        }
        return realFetch.apply(this, arguments);
    };
})();