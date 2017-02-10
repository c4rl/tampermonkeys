// ==UserScript==
// @name         Go to PR files
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pressing "g f" will go to PR files list.
// @author       carl.wiedemann@card.com
// @match        https://github.com/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// ==/UserScript==

(function (window, Mousetrap) {
    'use strict';
    Mousetrap.bind('f', function () {
        var href = window.location.href;
        var re = /https:\/\/github\.com\/(\w+)\/(\w+)\/pull\/(\d+)/;
        var matches = href.match(re);
        var co = matches[1];
        var repo = matches[2];
        var pr = matches[3];
        var base_dest = 'https://github.com/' + co + '/' + repo + '/pull/' + pr;
        // We are on files, go to base.
        if (href.indexOf('files') === -1) {
            window.location.replace(base_dest + '/files');
        } else {
            window.location.replace(base_dest);
        }
    });
})(window, Mousetrap);
