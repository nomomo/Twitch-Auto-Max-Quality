// ==UserScript==
// @name        Twitch-Mobile-Web-Source-Quality
// @namespace   Twitch-Mobile-Web-Source-Quality
// @version     0.0.1
// @author      Nomo
// @description Set source video quality on m.twitch.tv
// @icon        https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/images/logo.png
// @supportURL  https://github.com/nomomo/Twitch-Auto-Max-Quality/issues
// @homepageURL https://github.com/nomomo/Twitch-Auto-Max-Quality/
// @downloadURL https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Mobile-Web-Source-Quality.user.js
// @updateURL   https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Mobile-Web-Source-Quality.user.js
// @include     *://m.twitch.tv/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// ==/UserScript==
/*jshint multistr: true */
/* global GM_getValue, GM_setValue, GM_registerMenuCommand, GM_setClipboard, unsafeWindow, GM_addStyle, TWITCH_SERVER_INFO_SET_VAL, TWITCH_SERVER_INFO_FIXER */
if (window.TWITCH_MOBILE_WEB_SOURCE_QUALITY === undefined) {
    (async () => {
        var DEBUG = false;
        unsafeWindow.TWITCH_MOBILE_WEB_SOURCE_QUALITY = true;
        console.log("[TMWSQ]   RUNNING Twitch-Mobile-Web-Source-Quality", document.location.href);

        var NOMO_DEBUG = function ( /**/ ) {
            if (DEBUG) {
                var args = arguments,
                    args_length = args.length,
                    args_copy = args;
                for (var i = args_length; i > 0; i--) {
                    args[i] = args_copy[i - 1];
                }
                args[0] = "[TMWSQ]  ";
                args.length = args_length + 1;
                console.log.apply(console, args);
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////
        // Worker
        ////////////////////////////////////////////////////////////////////////////////////
        var realWorker = unsafeWindow.Worker;
        unsafeWindow.Worker = function (input) {
            var newInput = String(input);

            // 19-09-18 wasmworker version: 2.14.0
            var myBlob = "importScripts('https://cvp.twitch.tv/2.14.0/wasmworker.min.js')"; // ""

            $.ajax({
                    url: newInput,
                    type: "GET",
                    async: false,
                    timeout: 2000,
                })
                .done(function (response) {
                    myBlob = response;
                    NOMO_DEBUG("ajax response", response);
                })
                .fail(function (error) {
                    if(error.responseText !== undefined && error.responseText.indexOf("importScripts") !== -1){
                        myBlob = error.responseText;
                    }
                    else{
                        myBlob = "importScripts('https://cvp.twitch.tv/2.14.0/wasmworker.min.js')";
                        NOMO_DEBUG("Request failed", error.status, error);
                    }
                })
                .always(function (com) {
                    NOMO_DEBUG("Complete", com);
                });

            // rewrite blob
            var workerBlob = new Blob(
                [ /*javascript*/ `
                    const DEBUG_WORKER = ${DEBUG};
                    var NOMO_DEBUG = function ( /**/ ) {
                        if (DEBUG_WORKER) {
                            var args = arguments,
                                args_length = args.length,
                                args_copy = args;
                            for (var i = args_length; i > 0; i--) {
                                args[i] = args_copy[i - 1];
                            }
                            args[0] = "[TSI]  ";
                            args.length = args_length + 1;
                            console.log.apply(console, args);
                        }
                    };

                    // Worker fetch
                    const originalFetch = self.fetch;
                    self.fetch = async function(input, init){
                        if(input.toLowerCase().indexOf(".m3u8") !== -1 && input.toLowerCase().indexOf('usher.ttvnw.net/api/channel/hls') !== -1){
                            var m3u8_fetch = await originalFetch.apply(this, arguments);
                            var m3u8_text = await m3u8_fetch.text();
                            // NOMO_DEBUG("\\n", input, "\\n", (new Date()), "\\n", m3u8_text);

                            // return with blob
                            var regexMasterPlaylist = /(https:\\/\\/.+\\.m3u8)/gi;
                            var masterplaylistmatch = m3u8_text.match(regexMasterPlaylist);
                            // BANDWIDTH=8440172,RESOLUTION=1920x1080,CODECS="avc1.64002A,mp4a.40.2",VIDEO="chunked",FRAME-RATE=60.000

                            var regexBandWidth = /(BANDWIDTH=[0-9]+)/gi;
                            var bandwidthmatch = m3u8_text.match(regexBandWidth);

                            var regexCodecs = /(CODECS=\\".+\\")/gi;
                            var codecsmatch = m3u8_text.match(regexCodecs);

                            NOMO_DEBUG(masterplaylistmatch);
                            NOMO_DEBUG(bandwidthmatch);
                            NOMO_DEBUG(codecsmatch);

                            var firstm3u8 = masterplaylistmatch[0];
                            m3u8_text = m3u8_text.replace(regexMasterPlaylist,firstm3u8);
                            m3u8_text = m3u8_text.replace(regexBandWidth, bandwidthmatch[0]);
                            m3u8_text = m3u8_text.replace(regexCodecs, codecsmatch[0]);
                            var m3u8_blob = new Blob([m3u8_text], {
                                type: 'text/plain'
                            });
                            var m3u8_blob_url = URL.createObjectURL(m3u8_blob);
                            var new_arg = arguments;
                            new_arg[0] = m3u8_blob_url;

                            // REVOKE after 10s
                            setTimeout(function(){URL.revokeObjectURL(m3u8_blob_url)},10000);
                            return originalFetch.apply(this, new_arg);
                        }

                        return originalFetch.apply(this, arguments);
                    };

                    ${myBlob};
                `], {
                    type: 'text/javascript'
                }
            );
            // rewrite blob end

            var workerBlobUrl = URL.createObjectURL(workerBlob);
            var my_worker = new realWorker(workerBlobUrl);


            ////////////////////////////////////////////////////////////////////////////////////
            // Modified Worker
            ////////////////////////////////////////////////////////////////////////////////////
            NOMO_DEBUG("my_worker", my_worker);
            // return worker to original function
            return my_worker;
        };
    })();
}
