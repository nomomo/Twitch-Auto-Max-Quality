// ==UserScript==
// @name        Twitch-Adblock-oct2020
// @namespace   Twitch-Adblock-oct2020
// @version     0.0.3
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

    /// twitch-videoad.js
    const origFetch = unsafeWindow.fetch;
    unsafeWindow.fetch = (url, init, ...args) => {
        if (typeof url === "string") {
            if (url.includes("/access_token")) {
                url = url.replace("player_type=site", "player_type=facebook");
            } else if (
                url.includes("/gql") &&
                init &&
                typeof init.body === "string" &&
                init.body.includes("PlaybackAccessToken")
            ) {
                const newBody = JSON.parse(init.body);
                newBody.variables.playerType = "facebook";
                init.body = JSON.stringify(newBody);
            }
        }
        return origFetch(url, init, ...args);
    };
})();